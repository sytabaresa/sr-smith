import { ReactNode, useEffect } from 'react';
import '@styles/index.css'

import '@db/rxdb/plugins'
import { useRouter } from '@modules/router';
import { PageContextProvider } from './usePageContext';
import { PageContext } from './types';
import { initializeSW } from '@modules/pwa/dev';
import { messageSW } from 'workbox-window';
import { getSW } from '@utils/sw';
import UpdateSw from '@components/atoms/updateSW';
import { useTranslation } from '@modules/i18n';
import { useServiceWoker } from '@hooks/useServiceWorker';
import { CurrentBreakpoint } from '@components/atoms/screen';
import { useAtomValue } from 'jotai';
import { loadingBarAtom, onlineAtom } from '@core/atoms/common';

// robot3 debuging mode
if (process.env.NODE_ENV == 'development') {
  // require('robot3/debug')
  // import('robot3/logging')
  import('@fsm/utils')
}

export function App({ children, pageContext }: { children: ReactNode; pageContext: PageContext }) {
  const { TranslationWrapper, t } = useTranslation()
  const sw = useServiceWoker()
  const isOnline = useAtomValue(onlineAtom)

  useEffect(() => {
    // vh variable for many screen properties
    let update = () => {
      // We execute the same script as before
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    if (typeof window != 'undefined') {
      window.addEventListener('resize', update);
      window.workbox = { messageSW }
    }
    update()

    //register SW
    // service worker lifecycle handlers
    const _async = async () => {
      // await initFirebase() //await
      if (import.meta.env.MODE === 'development' && typeof navigator != 'undefined') {
        await initializeSW()
      }

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

    if (typeof window !== 'undefined' && 'serviceWorker' in navigator &&
      window.workbox !== undefined &&
      sw &&
      isOnline) {
      // skip index route, because it's already cached under `start-url` caching object
      if (getSW() && pathname !== '/') {
        messageSW(getSW(), { action: 'CACHE_NEW_ROUTE' })
      }
    }
  }, [isOnline, pathname, sw])


  useEffect(() => {
    if (sw) {
      const work = async () => {
        // SW version:
        const swVersion = await messageSW(getSW(), { type: 'GET_VERSION' })
        console.log('Service Worker version:', swVersion);

        // set sync/replaction
        // await messageSW(sw, { type: 'SET_REPLICATION' })
      }
      work()
    }
  }, [sw])

  return (
    <PageContextProvider pageContext={pageContext}>
      <TranslationWrapper>
        <LoadingComponent />
        {children}
        {import.meta.env.MODE === 'production' &&
          typeof window != 'undefined' &&
          <UpdateSw autoUpdate />
        }
        <CurrentBreakpoint />
      </TranslationWrapper>
    </PageContextProvider>
  )
}

const LoadingComponent = () => {
  const loading = useAtomValue(loadingBarAtom)
  // console.log(loading)

  return (loading && <div className="fixed h-[0.4rem] w-full z-50">
    <progress id="loading-progress3" className="absolute progress progress-accent progress-multi"></progress>
    <progress id="loading-progress2" className="absolute progress progress-secondary progress-multi progress-multi1"></progress>
    <progress id="loading-progress1" className="absolute progress progress-primary progress-multi progress-multi2"></progress>
  </div>)

}