import { atomWithStorage } from 'jotai/utils'
import { atom } from 'jotai'
import { Locales } from '@modules/i18n/i18n-types'
import { atomWithSomeMap } from '@utils/atoms'

const _themeAtom = atomWithStorage<string>('theme', typeof Storage !== "undefined" ? JSON.parse(localStorage.getItem("theme") || '"dark"') : 'dark')
export const themeAtom = atom(
    (get) => {
        const theme = get(_themeAtom)
        if (typeof window != 'undefined')
            document.documentElement.setAttribute("data-theme", theme);
        return theme
    },
    (get, set, value: string) => {
        set(_themeAtom, value)
        document.documentElement.setAttribute("data-theme", value);
    }
)

export const appDataAtom = atom({})

export const langAtom = atomWithStorage<Locales>('lang', 'en')

export const loadingBarAtom = atomWithSomeMap({})

const _onlineAtom = atom(false)
export const onlineAtom = atom(
    (get) => get(_onlineAtom),
    (get, set) => {
        // offline/online mode
        if (typeof window !== 'undefined' && 'ononline' in window && 'onoffline' in window) {
            set(_onlineAtom, window.navigator.onLine)
            if (!window.ononline) {
                window.addEventListener('online', () => {
                    set(_onlineAtom, true)
                })
            }
            if (!window.onoffline) {
                window.addEventListener('offline', () => {
                    set(_onlineAtom, false)
                })
            }
        }
    }
)

onlineAtom.onMount = (commit) => { commit() }