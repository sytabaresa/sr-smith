import { createMachine, state, transition, reduce, invoke, guard, action, immediate, SendFunction, Service } from 'robot3';
import { SmithProject } from '@localtypes/smith';
import { wait } from '@utils/time';
import { editorServiceAtom } from '../atoms/smith';
import { JotaiContext } from '@utils/atoms';
import { _dataRxdbProvider } from '@core/atoms/providers';
import { RxDBWrapper } from '@db/rxdb';
// import { Timestamp } from 'firebase/firestore';

export interface SavingContextType extends JotaiContext {
    id: string;
    projectData: SmithProject;
    // loadHandler: (ctx: SavingContextType, ev: any) => void;
    code?: string;
    saveCounter?: number;
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
        transition('LOAD', 'testDoc', reduce(saveId)),
    ),
    testDoc: state(
        immediate('checkDoc', guard(checkId)),
        immediate('noDoc'),
    ),
    checkDoc: invoke(getProjectData,
        transition('done', 'doc', reduce(saveData), action(sendCode)),
        transition('error', 'noDoc', action((ctx, ev: any) => console.log('checkDoc error: ', ev.error))),
    ),
    checkRead: invoke(getReadDoc,
        transition('done', 'readOnly'),
        transition('error', 'noDoc')
    ),
    readOnly: state(

    ),
    noDoc: state(
        transition('LOGOUT', 'anon', action(logout)),
    ),
    doc: state(
        transition('LOGOUT', 'anon', action(logout)),
        transition('SAVE', 'tmpSaving', reduce(saveCode)),
    ),
    tmpSaving: state(
        immediate('saveWait', guard(checkFirstSave)),
        immediate('doc'),
    ),
    saveWait: invoke(cancelableTimeout,
        transition('SAVE', 'tmpSaving', reduce(saveCode)),
        transition('done', 'saving'),
        transition('error', 'doc'),
    ),
    saving: invoke(saveDocument,
        transition('done', 'doc'),
        transition('error', 'failSave')
    ),
    failSave: state(
        transition('LOGOUT', 'anon', action(logout)),
        transition('SAVE', 'tmpSaving', reduce(saveCode)),
    )
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
    const send = ctx.setter(editorServiceAtom)
    // console.log('send')
    send({ type: 'CODE', value: ctx.projectData.data });
    send('PARSE')
}

function logout(ctx: SavingContextType, ev) {
    const send = ctx.setter(editorServiceAtom)
    send({ type: 'CODE', value: '' });
    send('PARSE')
}

function checkFirstSave(ctx: SavingContextType, ev) {
    return ctx.saveCounter > 1
}

async function getProjectData(ctx: SavingContextType) {
    console.log('loading data', ctx.id)

    try {
        const { getOne }: RxDBWrapper = await ctx.getter(_dataRxdbProvider)
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

async function getReadDoc(ctx, SavingContextType) {

}

async function saveDocument(ctx: SavingContextType, ev: { value: string }) {
    console.log('saving data...')
    const { update }: RxDBWrapper = await ctx.getter(_dataRxdbProvider)

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