// import renderToString from 'preact-render-to-string'
import ReactDOMServer from "react-dom/server";

import { App } from '@/renderer/app'
import document from './document'
import config from './config'

export { render }
// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ['pageProps', 'documentProps']

async function render(pageContext) {
  const { Page, pageProps } = pageContext
  const pageHtml = ReactDOMServer.renderToString(
    <App pageContext={pageContext}>
      <Page {...pageProps} />
    </App>
    // {},
    // { pretty: true }
  )

  // console.log('a', pageHtml)
  
  // See https://vite-plugin-ssr.com/head
  const { documentProps } = pageContext
  const title = (documentProps && documentProps.title) || config.title
  const desc = (documentProps && documentProps.description) || config.desc

  const documentHtml = document(title, desc, pageHtml)

  // console.log('b', documentHtml)

  return {
    documentHtml,
    pageContext: {
      // We can add cdsome `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
    }
  }
}