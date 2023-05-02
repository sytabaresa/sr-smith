import { UrlObject } from 'url'
import WithAuthRedirect from '@hoc/withAuthRedirect'

/**
 * Require the user to be authenticated in order to render the component.
 * If the user isn't authenticated, forward to the given URL.
 */

const WithAuth = (WrappedComponent, location?: string) => {

  // return (props: any) => {
  //   const router = useRouter()

  if (!location) {
    location = '/login'
  }

  return WithAuthRedirect({
    WrappedComponent,
    location,
    expectedAuth: true,
  })
  // }
}

export default WithAuth
