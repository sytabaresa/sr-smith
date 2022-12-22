import { lazy, Suspense } from 'react'

const SmithProject = lazy(() => import('@pages/smith.page'))
const LoginPage = lazy(() => import('@pages/login.page'))
const SavedPage = lazy(() => import('@pages/saved.page'))
const Event = lazy(() => import('@pages/event.page'))
const Fallback = lazy(() => import('@pages/_offline.page'))


export function Route() {

    return (
        <Suspense fallback={<progress className="progress h-1 fixed w-full progress-warning"></progress>}>
            <RouterWrapper>
                <RouterComponent path='/'>
                    <SmithProject />
                </RouterComponent>
                <RouterComponent path='/login'>
                    <LoginPage />
                </RouterComponent>
                <RouterComponent path='/saved'>
                    <SavedPage />
                </RouterComponent>
                <RouterComponent path='/event'>
                    <Event />
                </RouterComponent>
                <RouterComponent>
                    <Fallback />
                </RouterComponent>
            </RouterWrapper>
        </Suspense>
    )
}