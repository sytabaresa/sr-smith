import { Dispatch, useEffect, useState } from "react";

export function setConfig<T>(key: string, value: T) {
    if (typeof window != "undefined") {
        window.localStorage.setItem(key, JSON.stringify(value))
        window.dispatchEvent(new CustomEvent("storage", { detail: { key } })); //This is the important part
    }
}

export function getConfig<T>(key: string, defaultValue: T): T {
    if (typeof window != "undefined") {
        return JSON.parse(window.localStorage.getItem(key)) as T ?? defaultValue
    } else
        return defaultValue
}

export function setInitial<T>(key: string, defaultValue: T) {
    if (typeof window != "undefined") {
        if (!window.localStorage.getItem(key) && defaultValue != undefined) {
            window.localStorage.setItem(key, JSON.stringify(defaultValue))
            window.dispatchEvent(new CustomEvent("storage", { detail: { key } })); //This is the important part
        }
    }
}

export function useConfig<T>(key: string, defaultValue: T = null): [T, Dispatch<React.SetStateAction<T>>] {
    const [_config, _setConfig] = useState<T>(() => {
        setInitial(key, defaultValue)
        return getConfig(key, defaultValue)
    })

    useEffect(() => {

        function checkConfig(e) {
            if (e.detail.key == key) {
                const dat = getConfig(key, defaultValue)
                _setConfig(dat)
            }
        }

        window.addEventListener('storage', checkConfig)

        return () => {
            window.removeEventListener('storage', checkConfig)
        }
    }, [])

    useEffect(() => {
        const old = getConfig(key, defaultValue)
        if (JSON.stringify(old) != JSON.stringify(_config)) {
            setConfig(key, _config)
        }
    }, [_config])

    return [_config, _setConfig]
}