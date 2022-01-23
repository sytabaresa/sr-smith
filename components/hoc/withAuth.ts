import { useRouter } from 'next/router'
import { UrlObject } from 'url'
import WithAuthRedirect from '../organisms/withAuthRedirect'

/**
 * Require the user to be authenticated in order to render the component.
 * If the user isn't authenticated, forward to the given URL.
 */

const WithAuth = (WrappedComponent, location?: UrlObject | string) => {

  // return (props: any) => {
  //   const router = useRouter()

    if (!location) {
      location = { pathname: '/login',  } //query: { redirect: router.pathname }
    }

    return WithAuthRedirect({
      WrappedComponent,
      location,
      expectedAuth: true,
    })
  // }
}

export default WithAuth
