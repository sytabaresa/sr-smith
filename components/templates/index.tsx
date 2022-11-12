import React, { HTMLAttributes, ReactNode } from 'react'
import Head from 'next/head'
import { useTranslation } from "next-export-i18n";
import { useRouter } from 'next/router'
import Footer from '../organisms/footer'
import { LangMenu } from '../atoms/langMenu';
import { ArrowLeftIcon } from '@heroicons/react/outline';
import { ThemeSwitcher } from '../molecules/themeSwitcher';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title', className }: Props) => {
  const router = useRouter()
  const { t } = useTranslation();

  return (
    <div className={`flex flex-col ${className}`}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header className='z-10'>
        <nav className="navbar">
          <button className="btn btn-ghost flex" onClick={() => router.back()}>
            <ArrowLeftIcon className='h-4 w-4 mr-2' />{t('back')}
          </button>
          <LangMenu className='mx-2' />
          <ThemeSwitcher className='' />
        </nav>
      </header>
      {children}
      <Footer className='mb-2 z-10' />
    </div >
  )

}
export default Layout
