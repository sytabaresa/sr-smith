import { createMachine, state, transition, reduce, invoke, guard, action, immediate, SendFunction, Service } from 'robot3';
import { SmithProject } from '@localtypes/smith';
import { EditorContextType } from './codeEditorFSM';
import { DataProvider } from '@hooks/useDataProvider';
import { wait } from '@utils/time';
// import { Timestamp } from 'firebase/firestore';

export interface SavingContextType {
    id: string;
    projectData: SmithProject;
    // loadHandler: (ctx: SavingContextType, ev: any) => void;
    code?: string;
    saveCounter?: number;
    editorService: [{ context: EditorContextType }, SendFunction, Service<any>]
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
        transition('done', 'doc', reduce(saveData), action(sendCode)),
        transition('error', 'noDoc', action((ctx, ev: any) => console.log(ev.error))),
    ),
    noDoc: state(
        transition('LOGOUT', 'anon', action(logout)),
    ),
    doc: state(
        transition('LOGOUT', 'anon', action(logout)),
        transition('SAVE', 'tmpSaving', reduce(saveCode)),
    ),
    tmpSaving: state(
        immediate('saving', guard(checkFirstSave)),
        immediate('doc'),
    ),
    saving: invoke(cancelableTimeout,
        transition('SAVE', 'tmpSaving', reduce(saveCode)),
        transition('done', 'doc', action(saveDocument)),
        transition('error', 'doc'),
    ),
}, (ctx: SavingContextType) => ({
    ...ctx,
    saveCounter: 0,
}) as SavingContextType)

function saveData(ctx: SavingContextType, ev: any) {
    return { ...ctx, projectData: ev.data }
}

function saveCode(ctx: SavingContextType, ev: any) {
    return { ...ctx, code: ev.value, saveCounter: ctx.saveCounter + 1 }
}

function saveId(ctx: SavingContextType, ev: any) {
    return { ...ctx, id: ev.value }
}
function checkId(ctx: SavingContextType, ev: any) {
    return !!ctx.id
}
function sendCode(ctx: SavingContextType, ev) {
    const [current, send] = ctx.editorService
    send({ type: 'CODE', value: ctx.projectData.data });
    send('PARSING')
}

function logout(ctx: SavingContextType, ev) {
    const [current, send] = ctx.editorService
    send({ type: 'CODE', value: '' });
    send('PARSING')
}

function checkFirstSave(ctx: SavingContextType, ev) {
    return ctx.saveCounter > 1
}

async function getProjectData(ctx: SavingContextType) {
    console.log('loading data', ctx.id)
    await wait(50) //minimal time for the other machines (code editor fsm)

    try {
        const { getOne } = await DataProvider

        const projectData: SmithProject = await getOne({
            resource: 'projects',
            id: ctx.id,
        })

        // console.log(projectData)
        if (projectData) {
            return projectData
        } else
            return Promise.reject('document not exists')
    } catch (err) {
        console.log("document loading error", err)
        return Promise.reject(err)
    }
};

async function saveDocument(ctx: SavingContextType, ev: { value: string }) {
    console.log('saving data...')
    const { update } = await DataProvider
    await update({
        resource: 'projects',
        id: ctx.id,
        variables: {
            data: ctx.code,
            // updatedAt: new Date()
        } as SmithProject
    })
    console.log('saving done.')
};