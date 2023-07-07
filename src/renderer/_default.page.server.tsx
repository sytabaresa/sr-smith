// import renderToString from 'preact-render-to-string'
// import { renderToReadableStream as renderToStream } from "react-dom/server";
import { renderToStream } from 'react-streaming/server'
import { App as PageShell } from '@/renderer/app'
import document from './document'
import config from './config'

export { render }
export { passToClient }

// See https://vite-plugin-ssr.com/data-fetching
const passToClient = ['pageProps', 'documentProps', 'someAsyncProps']

async function render(pageContext) {
  const { Page, pageProps } = pageContext

  const pageHtmlStream = await renderToStream(
    <PageShell pageContext={pageContext}>
      <Page {...pageProps} />
    </PageShell>, {
    // disable: true
  })

  // console.log('a', pageHtml)

  // See https://vite-plugin-ssr.com/head
  const { documentProps } = pageContext
  const title = (documentProps && documentProps.title) || config.title
  const desc = (documentProps && documentProps.description) || config.desc

  const documentHtml = document(title, desc, pageHtmlStream)

  // console.log('b', documentHtml)

  const pageContextPromise = async () => {
    // I'm called after the stream has ended
    return {
      // initialData,
    }
  }
  return {
    documentHtml,
    pageContext: pageContextPromise
    // pageContext: {
    // We can add cdsome `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
    // }
  }
}