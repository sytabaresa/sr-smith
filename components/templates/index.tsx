import React, { HTMLAttributes, ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import Footer from '../organisms/footer'

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title', className }: Props) => {
  const router = useRouter()
  const { t } = useTranslation('common');

  return (
    <div className={`flex flex-col ${className}`}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <nav>
          <Link href="/">
            {t('home')}
          </Link>{' '}
          |{' '}
          <Link href="/main-menu">
            {t('smith')}
          </Link>{' '}
          {/* |{' '}
          <Link href="/users">
            {t('users')}
          </Link>{' '} */}
          |{' '}
          <Link
            href='/'
            locale={router.locale === 'en' ? 'es' : 'en'}
          >
            <button>
              {t('change-locale')}
            </button>
          </Link>
        </nav>
      </header>
      {children}
      <Footer />
    </div >
  )

}
export default Layout
