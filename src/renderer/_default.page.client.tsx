export { render }
export const clientRouting = true

import { App } from '@/renderer/app'
// import { hydrate, render as render_ } from 'preact'
import { createRoot, hydrateRoot } from 'react-dom/client';

import config from './config'
import { initializeSW } from './sw'

async function render(pageContext) {
    const { Page, pageProps } = pageContext
    const page = (
        <App pageContext={pageContext}>
            {/* // <PageShell pageContext={pageContext}> */}
            <Page {...pageProps} />
            {/* // </PageShell> */}
        </App>
    )
    const container = document.getElementById("app");
    // if (pageContext.isHydration) {
        // hydrateRoot(container, page)
    // } else {
        const root = createRoot(container); // createRoot(container!) if you use TypeScript
        root.render(page)
    // }
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