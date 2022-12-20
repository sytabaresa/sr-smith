import React, { HTMLAttributes, ReactNode } from 'react'
import { useTranslation } from "@utils/i18n";
import Footer from '@components/organisms/footer'
import { LangMenu } from '@components/atoms/langMenu';
import { ThemeSwitcher } from '@components/molecules/themeSwitcher';
import Navbar from '@components/organisms/navbar';
import { useUser } from '@components/organisms/userContext';
import { UserImage } from '@components/molecules/userImage';
import { LogoutIcon } from '@heroicons/react/outline';
import DrawerMenuItem from '@components/molecules/drawerMenuItem';
import { useLogout } from '@hooks/useLogout';

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
      <DrawerMenuItem icon={<LogoutIcon className="w-8 h-8" />} label={t("Logout")} onClick={logout} />
    </>,
    header,
    ...rest
  } = props

  // if (reloadOnline) {
  //   reloadOnOnline()
  // }

  return (
    <div className={`flex flex-col relative overflow-hidden full-screen-div ${className}`} {...rest}>
      {/* <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head> */}
      {header}
      <div className="drawer drawer-end h-full relative">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="relative drawer-content flex flex-col flex-1 overflow-hidden">
          <header className='z-10'>
            {navbar && (navbarComponent || <Navbar showComplement={showComplement} />)}
          </header>
          <div className="flex flex-col flex-grow overflow-hidden">
            <div className='flex-grow overflow-hidden'>
              {children}
            </div>
          </div>
          {footer && (footerComponent || <Footer className='mb-2 z-10' />)}
        </div>
        {drawer &&
          <div className="drawer-side overflow-x-hidden">
            <label htmlFor="my-drawer" className="drawer-overlay"></label>
            <div className="p-4 overflow-y-auto scrollbar-thin !scrollbar-w-[4px] 
            scrollbar-track-base-100 scrollbar-thumb-base-content w-60 bg-base-100 text-base-content flex flex-col items-start">
              {user && <div className="flex flex-col items-center mb-4 w-full">
                <UserImage className="mb-2" imageClasses="w-24 h-24" />
                <div className="w-44 text-center">
                  <h1 className="font-bold break-words text-sm">{user?.email}</h1>
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
            </div>
          </div>}
      </div>
    </div >
  )

}
export default Layout
