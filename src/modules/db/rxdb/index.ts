import { RxDatabase, createRxDatabase } from "rxdb";
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { projectSchema } from "./schema";
import uuid from 'uuid-random';
import { oneData, selectMany, selectOne } from "@db/db";

export async function initDB() {
    const db = await createRxDatabase({
        name: 'sr-smith-db',
        storage: getRxStorageDexie()
    });

    const coll = await db.addCollections({
        projects: {
            schema: projectSchema
        },
    });

    coll.projects.preInsert(function (plainData) {
        // set age to 50 before saving
        plainData.id = uuid();
    }, false);

    return { db, coll }
}

const dataProvider =
    (
        rxdb: RxDatabase
    ) => {

        const _create = ({ resource, variables, metaData }: oneData) => {
            const doc = rxdb[resource].insert(variables)
            return doc
        }
        const _createMany = ({ resource, variables, metaData }: oneData) => {
            const docs = rxdb[resource].bulkInsert(variables.data)
            return docs
        }
        const _getList = ({ resource, pagination, hasPagination, sort, filters, metaData }: list) => {
            const docs = rxdb[resource]?.find({ selector: filters })
            return docs
        }
        const _getMany = ({ resource, ids, metaData }: selectMany) => {
            const docs = rxdb[resource]?.findByIds(ids)
            return docs
        }
        const _getOne = ({ resource, id, metaData }: selectOne) => {
            const doc = rxdb[resource]?.findOne({ selector: { id } })
            return doc
        }

        return {
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
            update: async ({ resource, id, variables, metaData }: selectMany & { id: string }) => {
                const doc = await rxdb[resource]?.findOne({ selector: { id } })?.exec()
                return doc?.update({ $set: variables })
            },
            updateMany: async ({ resource, ids, variables, metaData }: selectMany) => {
                throw new Error("not implemented");
            },
            deleteOne: async ({ resource, id, variables, metaData }: selectOne) => {
                const doc = await rxdb[resource]?.findOne({ selector: { id } })?.exec()
                return await doc?.remove()
            },
            deleteMany: async ({ resource, ids, variables, metaData }: selectMany) => {
                throw new Error("not implemented");
            }
        }
    }


export default dataProvider