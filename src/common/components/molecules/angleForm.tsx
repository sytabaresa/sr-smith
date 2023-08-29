import { drawServiceAtom } from "@core/atoms/smith"
import { useTranslation } from "@modules/i18n"
import { deepCurrent } from "@utils/atoms"
import { useAtom } from "jotai"
import { useEffect, useState } from "react"

interface AngleFormProps {
    showModal: (state: boolean) => void;
    modalState: boolean;
}

const AngleForm = (props: AngleFormProps) => {
    const { showModal, modalState } = props
    const [angle, setAngle] = useState("")
    const { t } = useTranslation()
    const [current, send] = useAtom(drawServiceAtom)

    const onClicAngleCancel = () => send('CANCEL')
    const onClickAngleValue = (v: string) => {
        try {
            const n = parseFloat(v)
            if (Number.isNaN(n))
                throw ''
            send({ type: "ANGLE", value: n })
        } catch (err) {
            v != '' && send({ type: "ANGLE", value: v })
        }
    }

    const deep = deepCurrent(current.service)
    useEffect(() => {
        // console.log("showModal", deep)
        showModal(deep == "draw.drawAngle")
    }, [deep])

    return <form>
        <h3 className="font-bold text-lg mb-2">
            {t.tools.angle.form_title()}
        </h3>
        <div className="join w-full">
            <input
                type="text"
                placeholder={t.tools.angle.placeholder()}
                className="input w-full input-bordered font-mono join-item"
                onChange={(ev: any) => setAngle(ev.target.value)}
            />
            <div className="tooltip " data-tip={t.tools.angle.help()}>
                <button className="btn normal-case join-item">?</button>
            </div>
        </div>
        <div className="modal-action flex items-center">
            <a href="#" className="text-gray-500" onClick={onClicAngleCancel}>{t.common.cancel()}</a>
            <a href="#" className="btn" onClick={() => onClickAngleValue(angle)} >
                {t.canvas.create()}
            </a>
        </div>
    </form>
}

export default AngleForm