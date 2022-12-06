import { Dispatch, useEffect, useState } from "react";

export function useConfig(defaultConfig: Record<string, any> = {}): [Record<string, any>, (config: Record<string, any>) => void] {
    const [config, _setConfig] = useState<Record<string, any>>(() => {
        let item
        if (typeof window !== "undefined") {
            item = window.localStorage.getItem('config')
            item = JSON.parse(item)
            if (!item) {
                window.localStorage.setItem('config', JSON.stringify(defaultConfig))
            }
        }
        return item || defaultConfig
    })

    useEffect(() => {
        function checkConfig() {
            const item = JSON.parse(window.localStorage.getItem('config'))

            if (item) {
                _setConfig(item)
            }
        }

        window.addEventListener('storage', checkConfig)

        return () => {
            window.removeEventListener('storage', checkConfig)
        }
    }, [])

    useEffect(() => {
        const oldStr = window.localStorage.getItem('config')
        const old = JSON.parse(oldStr)
        if (oldStr != JSON.stringify(config)) {
            window.localStorage.setItem("config", JSON.stringify(config))
            window.dispatchEvent(new Event("storage"));
        }
    }, [config])

    return [config, _setConfig]
}