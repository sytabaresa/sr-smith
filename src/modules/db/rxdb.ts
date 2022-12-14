import { addRxPlugin, createRxDatabase, RxDatabase } from 'rxdb';
import { RxDBReplicationFirestorePlugin } from 'rxdb/plugins/replication-firestore';
import { getRxStorageDexie } from 'rxdb/plugins/dexie';
import { DataProvider, list, oneData, selectMany, selectOne } from './db';
addRxPlugin(RxDBReplicationFirestorePlugin);
// also create your RxDatabase and RxCollection.

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
        code: {
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
    required: ['firstName', 'lastName', 'passportId'],
    indexes: ['age']
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
    return db
}


export class RxDBWrapper implements DataProvider {
    db: RxDatabase

    constructor(db: RxDatabase) {
        this.db = db
    }

    async create({ resource, variables, metaData }: oneData) {
        const doc = await this.db[resource].insert(variables)
        return { id: doc.id }
    }
    async createMany({ resource, variables, metaData }: oneData) {
        throw new Error("not implemented");
        return []
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
        return docs
    }
    async getMany({ resource, ids, metaData }: selectMany) {
        const docs = await this.db[resource].findByIds(ids)
        return docs.values() as unknown as Record<string, any>[]
    }
    async getOne({ resource, id, metaData }: selectOne) {
        const doc = await this.db[resource].findOne({ selector: { id } }).exec()
        return doc
    }
    async update({ resource, id, variables, metaData }) {
        const doc = await this.db[resource].findOne({ selector: { id } }).exec()
        return doc.update({ $set: variables })
    }
    async updateMany({ resource, ids, variables, metaData }: selectMany) {
        throw new Error("not implemented");
    }
}