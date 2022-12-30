export function getSW() {
    if (typeof navigator != 'undefined' && 'serviceWorker' in navigator) {
        return navigator.serviceWorker.controller
    }
}
