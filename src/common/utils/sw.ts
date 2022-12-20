import { useState } from "react"
import { Workbox } from "workbox-window"


export function useWb() {
    const [wb, setWb] = useState<Workbox>()
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
        window.addEventListener('workbox', (e) => {
            // console.log('w', window.workbox)
            setWb(window.workbox)
        })
    }
    return wb
}


export function getSW() {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox !== undefined) {
        return window.workbox
    }
}
