import { useTranslation } from '@hooks/i18n'
import { useRegisterSW } from 'virtual:pwa-register/react'

function ReloadPrompt() {
    const {
        offlineReady: [offlineReady, setOfflineReady],
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegistered(r) {
            // eslint-disable-next-line prefer-template
            console.log('SW Registered: ' + r)
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

    return (
        <>
            {(offlineReady || needRefresh) &&
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
    )
}

export default ReloadPrompt