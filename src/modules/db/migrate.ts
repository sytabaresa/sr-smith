import { collection, doc, getDocs, query, serverTimestamp, updateDoc } from "firebase/firestore";
import { RxCollection } from "rxdb";

const env = import.meta.env

export function syncFirestore(rxdb, fdb) {
    const fcol = collection(fdb, 'projects');

    const replicationState = rxdb.projects.syncFirestore({
        firestore: {
            projectId: env.VITE_FIREBASE_PROJECT_ID,
            database: fdb,
            collection: fcol
        },
        pull: {},
        push: {},
        /**
         * Either do a live or a one-time replication
         * [default=true]
         */
        live: false,
        /**
         * (optional) likely you should just use the default.
         *
         * In firestore it is not possible to read out
         * the internally used write timestamp of a document.
         * Even if we could read it out, it is not indexed which
         * is required for fetch 'changes-since-x'.
         * So instead we have to rely on a custom user defined field
         * that contains the server time which is set by firestore via serverTimestamp()
         * IMPORTANT: The serverTimestampField MUST NOT be part of the collections RxJsonSchema!
         * [default='serverTimestamp']
         */
        serverTimestampField: 'serverTimestamp'
    });
}

export async function addDeleteFieldFirestore(db) {

    const allDocsResult = await getDocs(query(collection(db, 'projects')));
    allDocsResult.forEach(docu => {
        const docId = docu.id;
        console.log(docId);
        const ref = doc(db, `projects/${docId}`)
        updateDoc(ref, {
            _deleted: false,
            serverTimestamp: serverTimestamp()
        })
    });

}