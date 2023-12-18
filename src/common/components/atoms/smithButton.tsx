import { drawServiceAtom } from "@core/atoms/smith"
import { useTranslation } from "@modules/i18n";
import { cn } from "@utils/styles";
import { useAtom } from "jotai"

const SmithButton = () => {
    const [current, send] = useAtom(drawServiceAtom)
    const { t } = useTranslation();

    return <label className="label py-1 cursor-pointer">
        <span className={cn('label-text uppercase text-right w-12 mr-2 font-bold leading-tight',
            current.context.smithMode ? '' : 'opacity-50')}>{t.canvas.smith_mode()}</span>
        <input
            type="checkbox"
            className="toggle"
            checked={current.context.smithMode}
            onChange={() => send({ type: 'SMITH_MODE', value: !current.context.smithMode })}
        />
    </label>
}

export default SmithButton