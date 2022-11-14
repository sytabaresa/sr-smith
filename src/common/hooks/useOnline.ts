
export function reloadOnOnline() {
    if (typeof window !== 'undefined') {
        window.addEventListener('online', () => {
            location.reload()
        })
    }
}