import { useTranslation } from '@hooks/i18n'
import { useRegisterSW } from 'virtual:pwa-register/react'
import { messageSW } from 'workbox-window';

const UPDATE_SW_INTERVAL = 5 * 60 * 1000

export interface UpdateSwProps {
    autoUpdate: boolean;
}
function UpdateSw({ autoUpdate }: UpdateSwProps) {
    const {
        offlineReady: [offlineReady, setOfflineReady],
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegisteredSW(swUrl, r) {
            // eslint-disable-next-line prefer-template
            const _update = async () => {
                if (!(!r.installing && navigator))
                    return

                if (('connection' in navigator) && !navigator.onLine)
                    return

                const resp = await fetch(swUrl, {
                    cache: 'no-store',
                    headers: {
                        'cache': 'no-store',
                        'cache-control': 'no-cache',
                    },
                })

                if (resp?.status === 200)
                    await r.update()

                if (r.waiting && navigator) {
                    await messageSW(r.waiting, { type: 'SKIP_WAITING' })
                    console.log('new SW Registered', await messageSW(r.active, { type: 'GET_VERSION' }))
                }
            }

            if (autoUpdate) {
                _update()
                r && setTimeout(_update, 10000)
                r && setInterval(_update, UPDATE_SW_INTERVAL)
            }
            const out = async () => {
                console.log('SW Registered', await messageSW(r.active, { type: 'GET_VERSION' }))
            }
            out()
        },
        onRegisterError(error) {
            console.log('SW registration error', error)
        },
    })

    const { t } = useTranslation()

    const close = () => {
        setOfflineReady(false)
        setNeedRefresh(false)
    }

    return <>
        {(!autoUpdate && (offlineReady || needRefresh)) &&
            <div className="toast toast-start">
                <div className="alert">
                    <div>
                        {offlineReady
                            ? <span>{t('App ready to work offline')}</span>
                            : <span>{t('New content available, click on reload button to update')}.</span>
                        }
                    </div>
                    <div class="flex-none">

                        {needRefresh && <button className="btn btn-info" onClick={() => updateServiceWorker(true)}>{t('Reload')}</button>}
                        <button className="btn btn-info btn-ghost" onClick={() => close()}>{t('Close')}</button>
                    </div>
                </div>
            </div>
        }
    </>
}

export default UpdateSw