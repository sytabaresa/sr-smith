import { useLanguageQuery } from 'next-export-i18n'
import Router, { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { ReactComponent } from 'react-hotkeys'
import { UrlObject } from 'url'
import { useUser } from './userContext'
import AuthLoading from '../atoms/authLoading'

/**
 * Support client-side conditional redirecting based on the user's
 * authenticated state.
 *
 * @param WrappedComponent The component that this functionality
 * will be added to.
 * @param LoadingComponent The component that will be rendered while
 * the auth state is loading.
 * @param expectedAuth Whether the user should be authenticated for
 * the component to be rendered.
 * @param location The location to redirect to.
 */
interface WithAuthRedirectProps {
  WrappedComponent: ReactComponent
  LoadingComponent?: ReactComponent
  expectedAuth: boolean
  location: UrlObject | string
}

const WithAuthRedirect = ({
  WrappedComponent,
  LoadingComponent = AuthLoading as unknown as ReactComponent,
  expectedAuth,
  location,
}: WithAuthRedirectProps) => {
  
  const WithAuthRedirectWrapper = (props) => {
    const router = useRouter()
    const[query] = useLanguageQuery()
    const { loadingUser, user, isAuthenticated } = useUser()

    if (loadingUser) {
      return <LoadingComponent {...props} />
    }

    if (typeof window !== 'undefined' && expectedAuth !== isAuthenticated) {
      Router.push(typeof location === 'string' ?
        location :
        { query: { redirect: router.pathname }, ...location, ...query }
      )
      return <></>
    }

    return <WrappedComponent {...props} />
  }

  return WithAuthRedirectWrapper
}

export default WithAuthRedirect
