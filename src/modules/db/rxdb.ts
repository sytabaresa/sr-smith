import { addRxPlugin, createRxDatabase, RxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/dexie';
import { DataProvider, list, oneData, selectMany, selectOne } from './db';
import { RxDBUpdatePlugin } from 'rxdb/plugins/update';
import { RxDBReplicationGraphQLPlugin } from 'rxdb/plugins/replication-graphql';
import uuid from 'uuid-random';

// import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
// addRxPlugin(RxDBDevModePlugin);
// also create your RxDatabase and RxCollection.

addRxPlugin(RxDBUpdatePlugin);
addRxPlugin(RxDBReplicationGraphQLPlugin);

const env = import.meta.env


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
            type: 'string'
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

    coll.projects.preInsert(function(plainData){
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
    if (!checkpoint) {
        checkpoint = {
        };
    }
    // console.log(checkpoint)
    const query = `query PullProject($updatedAt: timestamptz, $id: uuid, $limit: Int!) {
        documents: project(where: {updatedAt: {_gte: $updatedAt}, id: {_eq: $id}}, limit: $limit) {
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
            ...((checkpoint.updatedAt) && { updatedAt: checkpoint.updated_at }),
            ...((checkpoint.id) && { id: checkpoint.id }),
            limit,
        }
    };
};

const pushQueryBuilder = rows => {
    // console.log(rows)
    const outRows = rows.map(r => {
        const { id, ...rest } = r.newDocumentState
        return {
            where: { id: { _eq: id } },
            _set: rest,
        }
    })

    const query = `
    mutation PushProjects($updates: [project_updates!]!, ) {
        update_project_many(updates: $updates  ) {
          affected_rows
          returning {
           id 
          }
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

    constructor() {
    }

    async init() {
        const { db, coll } = await initDB()
        this.db = db
    }

    async replicate() {
        const replicationState = this.db.projects.syncGraphQL({
            // urls to the GraphQL endpoints
            url: {
                http: env.VITE_API_URL
            },
            pull: {
                queryBuilder: pullQueryBuilder, // the queryBuilder from above
                modifier: doc => {
                    // console.log(doc)
                    return doc
                }, // (optional) modifies all pulled documents before they are handled by RxDB
                dataPath: 'data', // (optional) specifies the object path to access the document(s). Otherwise, the first result of the response data is used.
                /**
                 * Amount of documents that the remote will send in one request.
                 * If the response contains less then [batchSize] documents,
                 * RxDB will assume there are no more changes on the backend
                 * that are not replicated.
                 * This value is the same as the limit in the pullHuman() schema.
                 * [default=100]
                 */
                // batchSize: 50
            },
            push: {
                queryBuilder: pushQueryBuilder, // the queryBuilder from above
                /**
                 * batchSize (optional)
                 * Amount of document that will be pushed to the server in a single request.
                 */
                batchSize: 5,
                /**
                 * modifier (optional)
                 * Modifies all pushed documents before they are send to the GraphQL endpoint.
                 * Returning null will skip the document.
                 */
                modifier: doc => doc
            },
            // headers which will be used in http requests against the server.
            headers: {
                // Authorization: 'Bearer abcde...'
                'x-hasura-admin-secret': env.VITE_API_SECRET
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
    }

    async create({ resource, variables, metaData }: oneData) {
        const doc = await this.db[resource].insert(variables)
        return doc.toJSON()
    }
    async createMany({ resource, variables, metaData }: oneData) {
        const docs = await this.db[resource].bulkInsert(variables.data)
        return docs.success.map(d => d.toJSON())
    }
    async deleteOne({ resource, id, variables, metaData }: selectOne) {
        const doc = await this.db[resource].findOne({ selector: { id } }).exec()
        return await doc.remove()
    }
    async deleteMany({ resource, ids, variables, metaData }: selectMany) {
        throw new Error("not implemented");
        return
    }
    async getList({ resource, pagination, hasPagination, sort, filters, metaData }: list) {
        const docs = await this.db[resource].find({ selector: filters }).exec()
        return docs.map(d => d.toJSON())
    }
    async getMany({ resource, ids, metaData }: selectMany) {
        const docs = await this.db[resource].findByIds(ids)
        return docs.values() as unknown as Record<string, any>[]
    }
    async getOne({ resource, id, metaData }: selectOne) {
        const doc = await this.db[resource].findOne({ selector: { id } }).exec()
        return doc?.toJSON()
    }
    async update({ resource, id, variables, metaData }) {
        const doc = await this.db[resource].findOne({ selector: { id } }).exec()
        return doc.update({ $set: variables })
    }
    async updateMany({ resource, ids, variables, metaData }: selectMany) {
        throw new Error("not implemented");
    }
}