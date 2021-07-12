import { appWithTranslation } from 'next-i18next';
import { useEffect } from 'react';
import 'tailwindcss/tailwind.css'
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

    return () => { }
  },
    //eslint-disable-next-line
    []);

  return <Component {...pageProps} />
}

export default appWithTranslation(MyApp)