import { getSW } from "@utils/sw"
import { useEffect, useState } from "react"

export function useServiceWoker() {
    const [sw, setSW] = useState(getSW())

    const changeHandler = (event) => {
        const e = event.data
        if (e.type == 'activated') {
            // console.log('activated')
            setSW(getSW())
        }
    }

    useEffect(() => {
        navigator.serviceWorker?.addEventListener('message', changeHandler)
        return () => {
            navigator.serviceWorker?.removeEventListener('message', changeHandler)
        }
    }, [])

    return sw
}

export function useMessage() {
    const sw = useServiceWoker()
    const [message, setMessage] = useState<{ type: string, payload: Record<string, any> }>(undefined)

    const changeHandler = (event) => {
        const e = event.data
        setMessage(e)
    }

    useEffect(() => {
        if (sw) {
            navigator.serviceWorker.addEventListener('message', changeHandler)
        }
        return () => {
            navigator.serviceWorker.removeEventListener('message', changeHandler)
        }
    }, [sw])

    return message
}