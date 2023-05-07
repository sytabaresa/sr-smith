import { savingServiceAtom } from "@core/atoms/smith"
import { BookOpenIcon, UploadIcon, XCircleIcon } from "@heroicons/react/outline"
import { useTranslation } from "@modules/i18n"
import { useAtomValue } from "jotai"

const ToolbarControls = ({ editor }) => {
    const currentSave = useAtomValue(savingServiceAtom)
    const { t } = useTranslation();

    return <>
        {['saveWait', 'saving'].includes(currentSave.name) && <span className="badge badge-info animate-pulse"><UploadIcon className="w-4 mr-1" />{t.canvas.uploading()}...</span>}
        {['readOnly'].includes(currentSave.name) && <span className="badge"><BookOpenIcon className="w-4 mr-1" />{t.canvas.read_only()}</span>}
        {currentSave.name == 'failSave' && <span className="badge badge-error"><XCircleIcon className="w-4 mr-1" />{t.canvas.fail()}</span>}
    </>
}


export default ToolbarControls