import { RxCollection } from 'rxdb';
import {
    // pullQueryBuilderFromRxSchema,
    // pushQueryBuilderFromRxSchema,
    // pullStreamBuilderFromRxSchema,
    replicateGraphQL
} from 'rxdb/plugins/replication-graphql';

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
          role
          metadata
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
          role
          metadata
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
    }).filter(row => row.role != 'example')

    const query = `
    mutation PushProjects($updates: [project_insert_input!]!) {
        documents: insert_project(objects: $updates, on_conflict: {constraint: projects_pkey, update_columns: [data, deleted, description, hashReference, isPublic, name, role, metadata]}) {
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


export async function replicate(endpoint: string, coll: RxCollection) {
    console.log("activating replication...")
    // log all collection events for debugging
    // this.db.projects.$.pipe(filter(ev => !ev.isLocal)).subscribe(ev => {
    //     console.log('collection.$ emitted:');
    //     console.dir(ev);
    // });


    const replicationState = replicateGraphQL({
        collection: coll,
        // urls to the GraphQL endpoints
        url: {
            http: endpoint
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
        autoStart: false,
    });

    replicationState.error$.subscribe(err => {
        console.error('replication error:');
        console.dir(err);
    });

    // setInterval(() => replicationState.reSync(), 10 * 1000);

    return replicationState
}