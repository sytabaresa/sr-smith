import { useLanguageQuery } from '@modules/i18n'
import { FC, useEffect } from 'react'
import { useUser } from "@hooks/useAuthProvider";
import AuthLoading from '@components/atoms/authLoading'
import { useRouter } from '@modules/router'
import { useSetAtom } from 'jotai'
import { loadingBarAtom } from '@core/atoms/common'

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
  WrappedComponent: FC
  LoadingComponent?: FC
  expectedAuth: boolean
  location: string
}

const WithAuthRedirect = ({
  WrappedComponent,
  LoadingComponent = AuthLoading as FC,
  expectedAuth,
  location,
}: WithAuthRedirectProps) => {

  const WithAuthRedirectWrapper = (props) => {
    const { useHistory, useLocation } = useRouter()
    const { push } = useHistory();
    const { pathname } = useLocation()
    const [query] = useLanguageQuery()
    const { loading, user, isAuthenticated } = useUser()
    const setLoadingBar = useSetAtom(loadingBarAtom)
    // console.log(loading, user, isAuthenticated)

    useEffect(() => {
      if (typeof window !== 'undefined' && !loading && expectedAuth !== isAuthenticated) {
        // console.log(location, pathname, query)
        push(location, { redirect: pathname, ...query })
      }
    }, [isAuthenticated, loading])

    //only on change
    useEffect(() => {
      setLoadingBar({ auth: loading })
    }, [loading])

    return <div>
      <WrappedComponent {...props} />
    </div>
  }

  return WithAuthRedirectWrapper
}

export default WithAuthRedirect
