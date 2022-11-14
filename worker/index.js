'use strict'


self.addEventListener('message', async event => {
    // console.log(event)
    function getPathFromUrl(url) {
        return url.split(/[?#]/)[0];
    }

    if (event.data && event.data.action === 'CACHE_NEW_ROUTE') {
        caches.open('others').then(cache =>
            cache.match(event.source.url, {
                ignoreSearch: true
            }).then(res => {
                if (res === undefined) {
                    return cache.add(getPathFromUrl(event.source.url))
                }
            })
        )
    }
})