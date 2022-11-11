import { doc, getDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { createMachine, state, transition, reduce, invoke, guard, action, immediate } from 'robot3';
import { db } from "../../firebase/clientApp"
import { SmithProject } from '../../interfaces';
import { wait } from '../utils/time';

export interface ContextType {
    id: string;
    projectData: SmithProject;
    loadHandler: (ctx: ContextType, ev: any) => void;
    code?: string;
}

// cancelable timeout
let timer = null // not concurrent
const cancelableTimeout = (ctx, ev) => {
    return new Promise(resolve => {
        clearTimeout(timer)
        timer = setTimeout(resolve, 3000)
    });
}

export default createMachine('anon', {
    anon: state(
        transition('LOAD', 'test', reduce(saveId)),
    ),
    test: state(
        immediate('checkDoc', guard(checkId)),
        immediate('noDoc'),
    ),
    checkDoc: invoke(getProjectData,
        transition('done', 'doc', reduce(saveData), action((ctx: ContextType, ev) => ctx.loadHandler(ctx, ev))),
        transition('error', 'noDoc'),
    ),
    noDoc: state(
        transition('LOGOUT', 'anon'),
    ),
    doc: state(
        transition('LOGOUT', 'anon'),
        transition('SAVE', 'tmpSaving', reduce(saveCode)),
    ),
    tmpSaving: state(
        immediate('saving'),
    ),
    saving: invoke(cancelableTimeout,
        transition('SAVE', 'tmpSaving', reduce(saveCode)),
        transition('done', 'doc', action(updateDocument)),
        transition('error', 'doc'),
    ),
}, (ctx: ContextType) => ({
    ...ctx
}))

function saveData(ctx: ContextType, ev: any) {
    return { ...ctx, projectData: ev.data }
}

function saveCode(ctx: ContextType, ev: any) {
    return { ...ctx, code: ev.value }
}

function saveId(ctx: ContextType, ev: any) {
    return { ...ctx, id: ev.value }
}
function checkId(ctx: ContextType, ev: any) {
    return !!ctx.id
}

async function getProjectData(ctx: ContextType) {
    console.log('loading data', ctx.id)
    try {
        const docRef = doc(db, `projects/${ctx.id}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const projectData = docSnap.data() as SmithProject;
            // console.log(docData)
            return projectData
        } else
            return Promise.reject('document not exists')
    } catch (err) {
        console.log(err)
        return Promise.reject(err)
    }
};

async function updateDocument(ctx: ContextType, ev: { value: string }) {
    console.log('updating data', ctx.code)
    const docRef = doc(db, `projects/${ctx.id}`);
    await updateDoc(docRef, {
        data: ctx.code,
        updateAt: Timestamp.now()
    } as SmithProject);
};