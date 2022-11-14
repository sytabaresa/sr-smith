import React, { HTMLAttributes, ReactNode } from 'react'
import Head from 'next/head'
import { useTranslation } from "next-export-i18n";
import { useRouter } from 'next/router'
import Footer from '../organisms/footer'
import { LangMenu } from '../atoms/langMenu';
import { ArrowLeftIcon } from '@heroicons/react/outline';
import { ThemeSwitcher } from '../molecules/themeSwitcher';
import { reloadOnOnline } from '../../hooks/useOnline';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  title?: string
  reloadOnline?: boolean
  navbar?: boolean
  navbarComponent?: React.ReactNode
  footer?: boolean
  footerComponent?: React.ReactNode
}

const Layout = (props: Props) => {
  const {
    children,
    title = 'This is the default title',
    className,
    reloadOnline = true,
    footer = true,
    footerComponent,
    navbarComponent,
    navbar = true,
    ...rest
  } = props

  const router = useRouter()
  const { t } = useTranslation();

  if (reloadOnline) {
    reloadOnOnline()
  }

  return (
    <div className={`flex flex-col ${className}`} {...rest}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header className='z-10'>
        {navbar && (navbarComponent || <nav className="navbar">
          <button className="btn btn-ghost flex" onClick={() => router.back()}>
            <ArrowLeftIcon className='h-4 w-4 mr-2' />{t('back')}
          </button>
          <LangMenu className='mx-2' />
          <ThemeSwitcher className='' />
        </nav>)}
      </header>
      {children}
      {footer && (footerComponent || <Footer className='mb-2 z-10' />)}
    </div >
  )

}
export default Layout
