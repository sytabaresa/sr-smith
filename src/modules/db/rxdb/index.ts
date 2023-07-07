import { RxDatabase, createRxDatabase } from "rxdb";
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { projectSchema } from "./schema";
import uuid from 'uuid-random';
import { DataProviderPrivate, list, oneData, selectMany, selectOne } from "@db/db";

export async function initDB() {
    const db = await createRxDatabase({
        name: 'sr-smith-db',
        storage: getRxStorageDexie(),
        ignoreDuplicate: process.env.NODE_ENV == 'development'
    });

    const coll = await db.addCollections({
        projects: {
            schema: projectSchema,
            migrationStrategies: {
                1: (oldDoc) => {
                    oldDoc.metadata = {}
                    oldDoc.role = 'default'
                    return oldDoc
                }
            }
        },
    });

    coll.projects.preInsert(function (plainData) {
        // set age to 50 before saving
        plainData.id = uuid();
    }, false);

    return { db, coll }
}

const dataProvider: (rxdb: RxDatabase) => DataProviderPrivate =
    (rxdb) => {

        const _create = ({ resource, variables, meta }: oneData) => {
            const doc = rxdb[resource].insert(variables)
            return doc
        }
        const _createMany = ({ resource, variables, meta }: oneData) => {
            const docs = rxdb[resource].bulkInsert(variables.data)
            return docs
        }
        const _getList = ({ resource, pagination, hasPagination, sort, filters, meta }: list) => {
            const docs = rxdb[resource]?.find({ selector: filters })
            return docs
        }
        const _getMany = ({ resource, ids, meta }: selectMany) => {
            const docs = rxdb[resource]?.findByIds(ids)
            return docs
        }
        const _getOne = ({ resource, id, meta }: selectOne) => {
            const doc = rxdb[resource]?.findOne({ selector: { id } })
            return doc
        }

        return {
            db: rxdb,
            _getList,
            _getOne,
            create: async (data: oneData) => {
                const doc = await _create(data)
                return doc?.toJSON()
            },
            createMany: async (data: oneData) => {
                const docs = await _createMany(data)
                return docs?.success?.map(d => d.toJSON())
            },
            getList: async (data: list) => {
                const docs = await _getList(data)?.exec()
                return docs?.map(d => d.toJSON())
            },
            getMany: async (data: selectMany) => {
                const docs = await _getMany(data)
                return docs?.values() as unknown as Record<string, any>[]
            },
            getOne: async (data: selectOne) => {
                const doc = await _getOne(data)?.exec()
                return doc?.toJSON()
            },
            update: async ({ resource, id, variables, meta }: selectOne & { id: string }) => {
                const doc = await rxdb[resource]?.findOne({ selector: { id } })?.exec()
                return doc?.update({ $set: variables })
            },
            updateMany: async ({ resource, ids, variables, meta }: selectMany) => {
                throw new Error("not implemented");
            },
            deleteOne: async ({ resource, id, variables, meta }: selectOne) => {
                const doc = await rxdb[resource]?.findOne({ selector: { id } })?.exec()
                return await doc?.remove()
            },
            deleteMany: async ({ resource, ids, variables, meta }: selectMany) => {
                throw new Error("not implemented");
            }
        }
    }


export default dataProvider