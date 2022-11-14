import { Dispatch, useEffect, useState } from "react";
import isEqual from "lodash/isEqual"

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
        const old = JSON.parse(window.localStorage.getItem('config'))
        if (!isEqual(config, old)) {
            window.localStorage.setItem("config", JSON.stringify(config))
            window.dispatchEvent(new Event("storage"));
        }
    }, [config])

    return [config, _setConfig]
}