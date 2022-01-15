import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Footer from '../organisms/footer'

type Props = {
  children?: ReactNode
  title?: string
}

const AppLayout = ({ children, title = 'This is the default title' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav>
      </nav>
    </header>
    {children}
    <Footer className="absolute bottom-0 left-0 ml-1 mb-1"/>
  </div>
)

export default AppLayout
