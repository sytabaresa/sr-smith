import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import Footer from '../organisms/footer'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => {
  const router = useRouter()
  const { t } = useTranslation('common');

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <nav>
          <Link href="/">
            <a>{t('home')}</a>
          </Link>{' '}
        |{' '}
          <Link href="/smith">
            <a>{t('smith')}</a>
          </Link>{' '}
        |{' '}
          <Link href="/users">
            <a>{t('users')}</a>
          </Link>{' '}
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
    </div>
  )

}
export default Layout
