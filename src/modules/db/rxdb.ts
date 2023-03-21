import { addRxPlugin, createRxDatabase, RxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { DataProvider, list, oneData, selectMany, selectOne } from './db';
import { RxDBUpdatePlugin } from 'rxdb/plugins/update';
import {
    // pullQueryBuilderFromRxSchema,
    // pushQueryBuilderFromRxSchema,
    // pullStreamBuilderFromRxSchema,
    RxGraphQLReplicationState,
    replicateGraphQL
} from 'rxdb/plugins/replication-graphql';

import uuid from 'uuid-random';

import { Auth } from 'firebase/auth';

const env = import.meta.env

// import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
// addRxPlugin(RxDBDevModePlugin);
// also create your RxDatabase and RxCollection.

addRxPlugin(RxDBUpdatePlugin);

// TODO import these only in non-production build
async function loadDebugRxdb() {
    const { RxDBDevModePlugin } = await import('rxdb/plugins/dev-mode')
    addRxPlugin(RxDBDevModePlugin);
    // const { wrappedValidateAjvStorage } = await import('rxdb/plugins/validate-ajv')

    // const { RxDBUpdatePlugin } = await import('rxdb/plugins/update')
    // addRxPlugin(RxDBUpdatePlugin);

    const { RxDBQueryBuilderPlugin } = await import('rxdb/plugins/query-builder')
    addRxPlugin(RxDBQueryBuilderPlugin);

    const { RxDBLeaderElectionPlugin } = await import('rxdb/plugins/leader-election')
    addRxPlugin(RxDBLeaderElectionPlugin);
}

if (process.env.NODE_ENV == 'development' && typeof window != 'undefined') {
    loadDebugRxdb()
}

const srSmithSchema = {
    title: 'sr-smith schema',
    version: 0,
    primaryKey: 'id',
    type: 'object',
    properties: {
        id: {
            type: 'string',
            maxLength: 100 // <- the primary key must have set maxLength
        },
        name: {
            type: 'string'
        },
        data: {
            type: 'string'
        },
        description: {
            type: 'string'
        },
        isPublic: {
            type: 'boolean'
        },
        userId: {
            type: 'string',
            maxLength: 100
        }
    },
    required: ['name', 'userId', 'isPublic'],
    indexes: ['userId']
}

export async function initDB() {
    const db = await createRxDatabase({
        name: 'sr-smith-db',
        storage: getRxStorageDexie()
    });

    const coll = await db.addCollections({
        projects: {
            schema: srSmithSchema
        },
    });

    coll.projects.preInsert(function (plainData) {
        // set age to 50 before saving
        plainData.id = uuid();
    }, false);

    return { db, coll }
}

const pullQueryBuilder = (checkpoint, limit) => {
    /**
     * The first pull does not have a checkpoint
     * so we fill it up with defaults
     */
    if (!checkpoint || Object.keys(checkpoint).length == 0) {
        checkpoint = {
            updatedAt: (new Date(0)).toISOString()
        };
    }
    // console.log(checkpoint)
    const query = `query PullProject($updatedAt: timestamptz, $id: uuid, $limit: Int!) {
        documents: project(where: {updatedAt: {_gt: $updatedAt}, id: {_eq: $id}, deleted: {_eq: false}}, limit: $limit, order_by: {updatedAt: asc}) {
          data
          description
          id
          deleted
          updatedAt
          createdAt
          name
          isPublic
        }
      }`;
    return {
        query,
        variables: {
            updatedAt: checkpoint.updatedAt,
            limit,
        }
    };
};

const pullStreamQueryBuilder = (checkpoint, limit) => {
    /**
     * The first pull does not have a checkpoint
     * so we fill it up with defaults
     */
    if (!checkpoint) {
        checkpoint = {
            updatedAt: 0,
        };
    }
    // console.log(checkpoint)
    const query = `subscription PullStreamProject($updatedAt: timestamptz, $id: uuid, $limit: Int!) {
        documents: project(where: {updatedAt: {_gt: $updatedAt}, id: {_eq: $id}}, limit: $limit) {
          data
          description
          id
          deleted
          updatedAt
          createdAt
          name
          isPublic
        }
      }`;
    return {
        query,
        variables: {
            ...((checkpoint.updatedAt) && { updatedAt: checkpoint.updatedAt }),
            limit,
        }
    };
};

const pushQueryBuilder = rows => {
    // console.log(rows)
    const outRows = rows.map(r => {
        const row = r.newDocumentState
        return row
    })

    const query = `
    mutation PushProjects($updates: [project_insert_input!]!) {
        documents: insert_project(objects: $updates, on_conflict: {constraint: projects_pkey, update_columns: [data, deleted, description, hashReference, isPublic, name]}) {
          affected_rows
        }
      }           
    `;
    const variables = {
        updates: outRows
    };
    return {
        query,
        variables
    };
};

export class RxDBWrapper implements DataProvider {
    db: RxDatabase
    replication: RxGraphQLReplicationState<any, any>

    constructor() {
        this.getList = this.getList.bind(this)
        this.getOne = this.getOne.bind(this)
        this.getMany = this.getMany.bind(this)
        this.create = this.create.bind(this)
        this.createMany = this.createMany.bind(this)
        this.update = this.update.bind(this)
        this.updateMany = this.updateMany.bind(this)
        this.deleteMany = this.deleteMany.bind(this)
        this.deleteOne = this.deleteOne.bind(this)
    }

    async init() {
        const { db, coll } = await initDB()
        this.db = db
    }

    async waitForDB() {
        while (true) {
            if (this.db) { return };
            await new Promise(resolve => setTimeout(resolve, 100))
        }
    }

    authDB(auth: Auth) {
        auth.onIdTokenChanged(async (user) => {
            if (user) {
                const token = await user.getIdToken()
                this.replication.setHeaders({
                    'Authorization': `Bearer ${token}`
                })
                this.replication.reSync()
            } else {
                this.replication.setHeaders({})
            }
        })
    }

    refresh() {
        this.replication.reSync()
    }

    async replicate() {
        console.log("activating replication...")
        // log all collection events for debugging
        // this.db.projects.$.pipe(filter(ev => !ev.isLocal)).subscribe(ev => {
        //     console.log('collection.$ emitted:');
        //     console.dir(ev);
        // });


        const replicationState = replicateGraphQL({
            collection: this.db.projects,
            // urls to the GraphQL endpoints
            url: {
                http: env.VITE_API_URL
            },
            pull: {
                queryBuilder: pullQueryBuilder, // the queryBuilder from above
                modifier: (doc => {
                    //Wwe have to remove optional non-existend field values
                    // they are set as null by GraphQL but should be undefined
                    Object.entries(doc).forEach(([k, v]) => {
                        if (v === null) {
                            delete doc[k];
                        }
                    });
                    return doc;
                }), // (optional) modifies all pulled documents before they are handled by RxDB
                dataPath: 'data', // (optional) specifies the object path to access the document(s). Otherwise, the first result of the response data is used.
                responseModifier: async function (
                    plainResponse, // the exact response that was returned from the server
                    origin, // either 'handler' if plainResponse came from the pull.handler, or 'stream' if it came from the pull.stream
                    requestCheckpoint // if origin==='handler', the requestCheckpoint contains the checkpoint that was send to the backend
                ) {
                    /**
                     * In this example we aggregate the checkpoint from the documents array
                     * that was returned from the graphql endpoint.
                     */
                    const lastDoc = plainResponse.documents.slice(-1)[0]
                    return {
                        documents: plainResponse.documents,
                        checkpoint: { updatedAt: lastDoc?.updatedAt ? lastDoc.updatedAt : requestCheckpoint }
                    };
                },
                /**
                 * Amount of documents that the remote will send in one request.
                 * If the response contains less then [batchSize] documents,
                 * RxDB will assume there are no more changes on the backend
                 * that are not replicated.
                 * This value is the same as the limit in the pullHuman() schema.
                 * [default=100]
                 */
                batchSize: 100,

            },
            push: {
                queryBuilder: pushQueryBuilder, // the queryBuilder from above
                /**
                 * batchSize (optional)
                 * Amount of document that will be pushed to the server in a single request.
                 */
                batchSize: 100,
                /**
                 * modifier (optional)
                 * Modifies all pushed documents before they are send to the GraphQL endpoint.
                 * Returning null will skip the document.
                 */
                modifier: doc => doc,
                responseModifier: async function (plainResponse) {
                    /**
                     * In this example we aggregate the conflicting documents from a response object
                     */
                    return plainResponse.affected_rows >= 1 ? [] : null;
                },

            },
            // headers which will be used in http requests against the server.
            headers: {
                // Authorization: 'Bearer abcde...'
                // 'x-hasura-admin-secret': env.VITE_API_SECRET
            },

            /**
             * Options that have been inherited from the RxReplication
             */
            deletedField: 'deleted',
            live: true,
            retryTime: 1000 * 5,
            waitForLeadership: true,
            autoStart: true,
        });

        replicationState.error$.subscribe(err => {
            console.error('replication error:');
            console.dir(err);
        });
 
        // setInterval(() => replicationState.reSync(), 10 * 1000);

        this.replication = replicationState
    }

    _create({ resource, variables, metaData }: oneData) {
        const doc = this.db?.[resource].insert(variables)
        return doc
    }
    _createMany({ resource, variables, metaData }: oneData) {
        const docs = this.db?.[resource].bulkInsert(variables.data)
        return docs
    }
    _getList({ resource, pagination, hasPagination, sort, filters, metaData }: list) {
        const docs = this.db?.[resource]?.find({ selector: filters })
        return docs
    }
    _getMany({ resource, ids, metaData }: selectMany) {
        if (!this.db) return []
        const docs = this.db?.[resource]?.findByIds(ids)
        return docs
    }
    _getOne({ resource, id, metaData }: selectOne) {
        if (!this.db) return undefined
        const doc = this.db?.[resource]?.findOne({ selector: { id } })
        return doc
    }

    // final
    async create(data: oneData) {
        await this.waitForDB()
        const doc = await this._create(data)
        return doc?.toJSON()
    }
    async createMany(data: oneData) {
        await this.waitForDB()
        const docs = await this._createMany(data)
        return docs?.success?.map(d => d.toJSON())
    }
    async getList(data: list) {
        await this.waitForDB()
        const docs = await this._getList(data)?.exec()
        return docs?.map(d => d.toJSON())
    }
    async getMany(data: selectMany) {
        await this.waitForDB()
        const docs = await this._getMany(data)
        return docs?.values() as unknown as Record<string, any>[]
    }
    async getOne(data: selectOne) {
        await this.waitForDB()
        const doc = await this._getOne(data)?.exec()
        return doc?.toJSON()
    }
    async update({ resource, id, variables, metaData }: selectMany & { id: string }) {
        await this.waitForDB()
        const doc = await this.db?.[resource]?.findOne({ selector: { id } })?.exec()
        return doc?.update({ $set: variables })
    }
    async updateMany({ resource, ids, variables, metaData }: selectMany) {
        await this.waitForDB()
        throw new Error("not implemented");
    }
    async deleteOne({ resource, id, variables, metaData }: selectOne) {
        await this.waitForDB()
        const doc = await this.db?.[resource]?.findOne({ selector: { id } })?.exec()
        return await doc?.remove()
    }
    async deleteMany({ resource, ids, variables, metaData }: selectMany) {
        await this.waitForDB()
        throw new Error("not implemented");
    }
}