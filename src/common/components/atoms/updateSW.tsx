import { useTranslation } from '@modules/i18n'
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
                }
            }

            if (autoUpdate) {
                _update()
                r && setTimeout(_update, 10000)
                r && setInterval(_update, UPDATE_SW_INTERVAL)
            }
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
                            ? <span>{t.offline.app_ready()}</span>
                            : <span>{t.offline.new_content()}.</span>
                        }
                    </div>
                    <div class="flex-none">

                        {needRefresh && <button className="btn btn-info" onClick={() => updateServiceWorker(true)}>{t.offline.reload()}</button>}
                        <button className="btn btn-info btn-ghost" onClick={() => close()}>{t.offline.close()}</button>
                    </div>
                </div>
            </div>
        }
    </>
}

export default UpdateSw