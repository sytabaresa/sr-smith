import { useLanguageQuery } from '@utils/i18n'
import { useLocation } from "wouter"
import { ReactNode, useEffect } from 'react'
import { ReactComponent } from 'react-hotkeys'
import { UrlObject } from 'url'
import { useUser } from './userContext'
import AuthLoading from '../atoms/authLoading'
import { qStr } from '../../utils/common'

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
    const [_location, navigate] = useLocation();
    const [query] = useLanguageQuery()
    const { loadingUser, user, isAuthenticated } = useUser()

    useEffect(() => {
      if (typeof window !== 'undefined' && !loadingUser && expectedAuth !== isAuthenticated) {
        navigate(location + qStr({ redirect: _location, ...query }))
      }
    }, [isAuthenticated, loadingUser])

    return <div>
      {loadingUser && <progress className="progress h-1 fixed w-full progress-warning"></progress>}
      <WrappedComponent {...props} />
    </div>
  }

  return WithAuthRedirectWrapper
}

export default WithAuthRedirect
