import { useEffect, useState } from 'react';
import '@styles/index.css'
import '@styles/main.css';
import '@styles/animations.css';
import '@styles/jsxgraph.css';

import UserProvider from '@components/organisms/userContext'
import { setTheme, getTheme } from '@hooks/useTheme';
// import { initFirebase } from '@pwa/init';
import SmithProject from '@pages/smith';
import LoginPage from '@pages/login'
import SavedPage from '@pages/saved'
import Fallback from '@pages/_offline';
import { useRouter } from '@modules/router';

export function App() {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    // set theme as soon as posible
    if (typeof window !== 'undefined') {
      setTheme(getTheme())
    }

    // vh variable for many screen properties
    let update = () => {
      // We execute the same script as before
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    window.addEventListener('resize', update);
    update()

    //robot3 debuging mode
    if (process.env.NODE_ENV == 'development') {
      // require('robot3/debug')
      require('robot3/logging')
    }

    // offline/online mode
    if (typeof window !== 'undefined' && 'ononline' in window && 'onoffline' in window) {
      setIsOnline(window.navigator.onLine)
      if (!window.ononline) {
        window.addEventListener('online', () => {
          setIsOnline(true)
        })
      }
      if (!window.onoffline) {
        window.addEventListener('offline', () => {
          setIsOnline(false)
        })
      }
    }

    //register SW
    // service worker lifecycle handlers
    const _async = async () => {
      // await initFirebase() //await

    }
    _async()

    // const res = () =>
    //   document.querySelector("meta[name=viewport]").setAttribute("content", "height=" + screen.height * 0.9 + "px, width=device-width, initial-scale=1.0")
    // // fix bug with soft keyboard
    // if (typeof window != 'undefined')
    //   window.addEventListener('resize', res);
    // setTimeout(res, 300);

    return () => { }
  }, []);

  const { RouterWrapper, RouterComponent, useLocation } = useRouter()
  const { pathname } = useLocation()

  useEffect(() => {
    // const router: RouterProps & { lastPath?: string } = useRouter();
    // lastPath = location

    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox !== undefined && isOnline) {
      // skip index route, because it's already cached under `start-url` caching object
      if (pathname !== '/') {
        const wb = window.workbox
        wb.active.then(worker => {
          wb.messageSW({ action: 'CACHE_NEW_ROUTE' })
        })
      }
    }
  }, [isOnline, pathname])


  return (
    <UserProvider>
      <RouterWrapper>
        <RouterComponent path='/'>
          <SmithProject />
        </RouterComponent>
        <RouterComponent path='/login'>
          <LoginPage />
        </RouterComponent>
        <RouterComponent path='/saved'>
          <SavedPage />
        </RouterComponent>
        <RouterComponent>
          <Fallback />
        </RouterComponent>
      </RouterWrapper>
    </UserProvider>
  )
}