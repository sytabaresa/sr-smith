import React, { HTMLAttributes, ReactNode } from 'react'
import { useTranslation } from "@modules/i18n";
import Footer from '@components/organisms/footer'
import { LangMenu } from '@components/atoms/langMenu';
import { ThemeSwitcher } from '@components/atoms/themeSwitcher';
import Navbar from '@components/organisms/navbar';
import { useUser } from "@hooks/useAuthProvider";
import { UserImage } from '@components/molecules/userImage';
import { LogoutIcon } from '@heroicons/react/outline';
import DrawerMenuItem from '@components/molecules/drawerMenuItem';
import { useLogout } from '@hooks/useLogout';
import { cn } from '@utils/styles';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  title?: string
  reloadOnline?: boolean
  navbar?: boolean
  navbarComponent?: React.ReactNode
  footer?: boolean
  footerComponent?: React.ReactNode
  drawer?: boolean
  drawerMenu?: React.ReactNode
  header?: React.ReactNode
  showComplement?: boolean
}

const Layout = (props: Props) => {
  const { user } = useUser()
  const logout = useLogout()
  const { t } = useTranslation();

  const {
    children,
    title = 'This is the default title',
    className,
    reloadOnline = true,
    footer = true,
    footerComponent,
    navbarComponent,
    showComplement,
    navbar = true,
    drawer = true,
    drawerMenu = <>
      <DrawerMenuItem icon={<LogoutIcon className="w-8 h-8" />} label={t.common.logout()} onClick={logout} />
    </>,
    header,
    ...rest
  } = props

  // if (reloadOnline) {
  //   reloadOnOnline()
  // }

  return (
    <div id="root-container" className={cn('flex flex-col relative overflow-hidden full-screen-div', className)} {...rest}>
      {/* <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head> */}
      {header}
      <div className="drawer drawer-end h-full relative">
        <input id="my-drawer" type="checkbox" className="drawer-toggle hidden" />
        <div className="relative drawer-content flex flex-col flex-1 overflow-hidden">
          <header className='z-10'>
            {navbar && (navbarComponent || <Navbar showComplement={showComplement} />)}
          </header>
          <div className="flex flex-col flex-grow overflow-hidden">
            <div className='flex flex-col overflow-y-auto h-full scrollbar-thin scrollbar-track-base-100 scrollbar-thumb-base-content flex-grow'>
              <div className="flex flex-grow">
                {children}
              </div>
              {footer && (footerComponent || <Footer className='my-2 ml-2 z-10' />)}
            </div>
          </div>
        </div>
        {drawer &&
          <div className="drawer-side overflow-x-hidden z-50">
            <label htmlFor="my-drawer" className="drawer-overlay"></label>
            <div className="p-4 overflow-y-auto overflow-x-hidden scrollbar-thin !scrollbar-w-[4px] 
            scrollbar-track-base-100 scrollbar-thumb-base-content w-60 h-full
             bg-base-100 text-base-content flex flex-col items-start relative">
              {user && <div className="flex flex-col items-center mb-4 w-full">
                <UserImage className="mb-2" imageClasses="w-24 h-24" />
                <div className="w-44 text-center">
                  <h1 className="font-bold break-words text-sm uppercase">{user?.email}</h1>
                  {/* <h2 className="break-normal">{user?.displayName}</h2> */}
                </div>
              </div>}
              <div className="flex-1">
                {drawerMenu}
              </div>
              <div className="flex w-full">
                <LangMenu className="dropdown-top ml-4 flex-grow" />
                <ThemeSwitcher />
              </div>
              <img className="absolute bottom-0 left-[-15rem] max-w-none w-[40rem] opacity-20 -z-10" src="/images/logo.png"></img>
            </div>
          </div>}
      </div>
    </div >
  )

}
export default Layout
