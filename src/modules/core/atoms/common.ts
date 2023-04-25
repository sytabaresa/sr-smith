import { atomWithStorage } from 'jotai/utils'
import { atom } from 'jotai'
import { Locales } from '@modules/i18n/i18n-types'
import { atomWithSomeMap } from '@utils/atoms'

export const projectDataAtom = atom({

})

const _themeAtom = atomWithStorage<string>('theme', 'light')
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

export const loadingAtom = atomWithSomeMap({})