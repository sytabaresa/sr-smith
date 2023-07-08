import { FirebaseApp } from "firebase/app";
import {
    addDoc, collection, deleteDoc, doc, enableIndexedDbPersistence, Firestore,
    getDoc, getDocs, getFirestore, query, updateDoc, where
} from "firebase/firestore";
import { DataProvider, list, oneData, selectMany, selectOne } from "../db";

export async function initDB(app: FirebaseApp) {
    const db = getFirestore(app)
    // await enableOffline(db)
    return db
}

function enableOffline(db: Firestore) {

    return enableIndexedDbPersistence(db, { forceOwnership: true })
        .catch((err) => {
            if (err.code == 'failed-precondition') {
                // Multiple tabs open, persistence can only be enabled
                // in one tab at a a time.
                // ...
            } else if (err.code == 'unimplemented') {
                // The current browser does not support all of the
                // features required to enable persistence
                // ...
            }
        })

}

export class FirebaseWrapper implements DataProvider {
    db: Firestore

    constructor(db: Firestore) {
        this.db = db
    }

    async create({ resource, variables, meta }: oneData) {
        const doc = await addDoc(collection(this.db, resource), variables)
        return { id: doc.id }
    }
    async createMany({ resource, variables, meta }: oneData) {
        throw new Error("not implemented");
        return []
    }
    async deleteOne({ resource, id, variables, meta }: selectOne) {
        return await deleteDoc(doc(this.db, `${resource}/${id}`));
    }
    async deleteMany({ resource, ids, variables, meta }: selectMany) {
        throw new Error("not implemented");
        return
    }
    async getList({ resource, pagination, hasPagination, sort, filters, meta }: list) {

        const q = query(collection(this.db, resource), ...(filters?.map(f => where(f.v1, f.op as any, f.v2)) || []));

        const querySnapshot = await getDocs(q);
        let data = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            data.push({ id: doc.id, ...doc.data() })
        });
        return data
    }
    async getMany({ resource, ids, meta }: selectMany) {
        const q = query(collection(this.db, resource), where('id', 'in', ids));

        const querySnapshot = await getDocs(q);
        let data = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            data.push(doc.data())
        });
        return data
    }
    async getOne({ resource, id, meta }: selectOne) {
        const docRef = doc(this.db, `${resource}/${id}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data()
        }
    }
    async update({ resource, id, variables, meta }) {
        const docRef = doc(this.db, `${resource}/${id}`);
        return await updateDoc(docRef, variables)
    }
    async updateMany({ resource, ids, variables, meta }: selectMany) {
        throw new Error("not implemented");
    }
}