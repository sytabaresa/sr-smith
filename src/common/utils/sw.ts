

export function getSW() {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox !== undefined) {
        return window.workbox
    }
}
