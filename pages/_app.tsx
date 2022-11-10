import { appWithTranslation } from 'next-i18next';
import { useEffect } from 'react';
import UserProvider from '../providers/userContext'
import 'tailwindcss/tailwind.css'
import "jsxgraph/distrib/jsxgraph.css"
import '../components/atoms/reCircle'
import '../components/atoms/imCircle'
import '../components/atoms/smithPoint'
import './main.css';
import JXG from 'jsxgraph';

function MyApp({ Component, pageProps }) {


  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (localStorage.theme === 'dark'
      // || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

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

    return () => { }
  },
    //eslint-disable-next-line
    []);

  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}

export default appWithTranslation(MyApp)