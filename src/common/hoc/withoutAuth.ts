import { ReactComponent } from 'react-hotkeys'
import { Url } from 'url'
import WithAuthRedirect from '@components/organisms/withAuthRedirect'

/**
 * Require the user to be unauthenticated in order to render the component.
 * If the user is authenticated, forward to the given URL.
 */


const WithoutAuth = (WrappedComponent, location = '/login') => {
  return WithAuthRedirect({
    WrappedComponent,
    location,
    expectedAuth: false,
  })
}

export default WithoutAuth
