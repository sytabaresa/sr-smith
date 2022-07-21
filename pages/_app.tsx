import { appWithTranslation } from 'next-i18next';
import { useEffect } from 'react';
import UserProvider from '../providers/userContext'
import 'tailwindcss/tailwind.css'
import "jsxgraph/distrib/jsxgraph.css"
import './main.css';

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

    //robot3 debuging mode
    if(process.env.NODE_ENV == 'development') {
      require('robot3/debug')
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