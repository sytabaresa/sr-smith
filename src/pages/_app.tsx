import { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css'
import '../common/styles/main.css';
import '../common/styles/animations.css';
import '../common/styles/jsxgraph.css';

import { useRouter } from 'next/router';
import UserProvider from '../common/components/organisms/userContext'
import { useTheme, setTheme, getTheme } from '../common/hooks/useTheme';
import { initializeServiceWorker } from '../modules/pwa/lifecycle';

function App({ Component, pageProps }) {
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
    initializeServiceWorker()
    
    return () => { }
  }, []);

  const router = useRouter()
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox !== undefined && isOnline) {
      // skip index route, because it's already cached under `start-url` caching object
      if (router.route !== '/') {
        const wb = window.workbox
        wb.active.then(worker => {
          wb.messageSW({ action: 'CACHE_NEW_ROUTE' })
        })
      }
    }
  }, [isOnline, router.route])



  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}

export default App