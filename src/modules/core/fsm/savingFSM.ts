import { createMachine, state, transition, reduce, invoke, guard, action, immediate } from 'robot3';
import { SmithProject } from '@localtypes/smith';
import { _codeAtom, codeAtom, editorServiceAtom } from '@core/atoms/smith';
import { JotaiContext } from '@utils/atoms';
import { _dataRxdbProviderAtom, dataQLProviderAtom } from '@core/atoms/db';
import { DataProvider } from '@hooks/useDataProviderSW';
import { authAtom } from '@core/atoms/auth';
import { RESET } from 'jotai/utils';
// import { Timestamp } from 'firebase/firestore';

export interface SavingContextType<T = any, A = any, B = any> extends JotaiContext<T, A, B> {
    id: string;
    // loadHandler: (ctx: SavingContextType, ev: any) => void;
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

const checkAuth = (ctx, ev) => {
    const { isAuthenticated } = ctx.getter(authAtom)
    return isAuthenticated
}

export default createMachine('anon', {
    anon: state(
        transition('LOAD', 'testDoc', reduce(saveId), action(resetCode)),
    ),
    testDoc: state(
        immediate('testAuth', guard(checkId)),
        immediate('noDoc'),
    ),
    testAuth: state(
        immediate('checkDoc', guard(checkAuth)),
        immediate('checkRead')
    ),
    checkDoc: invoke(getProjectData,
        transition('done', 'doc', action(sendCodeEditor)),
        transition('error', 'checkRead', action((ctx, ev: any) => console.log('checkDoc error: ', ev.error))),
    ),
    checkRead: invoke(getPublicDoc,
        transition('done', 'readOnly', action(sendCodeEditor)),
        transition('error', 'noDoc')
    ),
    readOnly: state(
        transition('LOGOUT', 'anon', action(logout)),
    ),
    noDoc: state(
        transition('LOGOUT', 'anon', action(logout)),
    ),
    doc: state(
        transition('LOGOUT', 'anon', action(logout)),
        transition('SAVE', 'tmpSaving'),
    ),
    tmpSaving: state(
        immediate('saveWait', guard(checkFirstSave)),
        immediate('doc'),
    ),
    saveWait: invoke(cancelableTimeout,
        transition('SAVE', 'tmpSaving'),
        transition('done', 'saving'),
        transition('error', 'doc'),
    ),
    saving: invoke(saveDocument,
        transition('done', 'doc'),
        transition('error', 'failSave')
    ),
    failSave: state(
        transition('LOGOUT', 'anon', action(logout)),
        transition('SAVE', 'tmpSaving'),
    )
}, (ctx: SavingContextType) => ({
    ...ctx,
    saveCounter: 0,
}) as SavingContextType)

function resetCode(ctx: SavingContextType, ev) {
    const send = ctx.setter(editorServiceAtom)
    send({ type: 'CODE', value: RESET });
}

function saveId(ctx: SavingContextType, ev: any) {
    return { ...ctx, id: ev.value }
}
function checkId(ctx: SavingContextType, ev: any) {
    return !!ctx.id
}
function sendCodeEditor(ctx: SavingContextType, ev: { data: SmithProject }) {
    const send = ctx.setter(editorServiceAtom)
    // console.log('send')
    send({ type: 'CODE', value: ev.data.data });
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
        const { getOne } = await ctx.getter(_dataRxdbProviderAtom) as DataProvider
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

async function getPublicDoc(ctx, SavingContextType) {
    console.log('loading data (read only)', ctx.id)

    try {
        const { getOne }: DataProvider = await ctx.getter(dataQLProviderAtom)
        const projectData: SmithProject = await getOne({
            resource: 'project',
            id: ctx.id,
            meta: {
                fields: [
                    'data',
                    'description',
                    'id',
                    'deleted',
                    'updatedAt',
                    'createdAt',
                    'name',
                    'isPublic',
                ]
            }
        })

        // console.log(projectData)
        if (projectData) {
            return projectData.data
        } else
            return Promise.reject('document not exists')
    } catch (err) {
        console.log("document loading error", err)
        return Promise.reject(err)
    }
}

async function saveDocument(ctx: SavingContextType, ev: { value: string }) {
    console.log('saving data...')
    const { update } = await ctx.getter(_dataRxdbProviderAtom) as DataProvider
    const code = ctx.getter(codeAtom) as string

    await update({
        resource: 'projects',
        id: ctx.id,
        variables: {
            data: code,
            // updatedAt: new Date()
        } as SmithProject
    })
    console.log('saving done.')
};