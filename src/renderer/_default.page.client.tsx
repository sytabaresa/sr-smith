// import { hydrate, render as render_ } from 'preact'
import { Root, createRoot, hydrateRoot } from 'react-dom/client';
import { App as PageShell } from '@/renderer/app'

export const clientRouting = true
export const hydrationCanBeAborted = true
export { render }
export { onHydrationEnd }
export { onPageTransitionStart }
export { onPageTransitionEnd }

import config from './config'
import { initializeSW } from './sw'
import { ROOT_APP } from './constants';

let root: Root
async function render(pageContext) {
    const { Page, pageProps } = pageContext
    const page = (
        <PageShell pageContext={pageContext}>
            <Page {...pageProps} />
        </PageShell>
    )
    const container = document.getElementById(ROOT_APP);
    if (pageContext.isHydration) {
        root = hydrateRoot(container, page)
    } else {
        if (!root) {
            root = createRoot(container); // createRoot(container!) if you use TypeScript
        }
        root.render(page)
    }
    document.title = getPageTitle(pageContext)
}

function getPageTitle(pageContext) {
    const title =
        // For static titles (defined in the `export { documentProps }` of the page's `.page.js`)
        (pageContext.exports.documentProps || {}).title ||
        // For dynamic tiles (defined in the `export addContextProps()` of the page's `.page.server.js`)
        (pageContext.documentProps || {}).title || config.title
    return title
}

function onHydrationEnd() {
    console.log('Hydration finished; page is now interactive.')
}
function onPageTransitionStart() {
    console.log('Page transition start')
    document.querySelector('body')!.classList.add('page-is-transitioning')
}
function onPageTransitionEnd() {
    console.log('Page transition end')
    document.querySelector('body')!.classList.remove('page-is-transitioning')
}