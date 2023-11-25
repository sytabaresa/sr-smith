import { drawServiceAtom } from "@core/atoms/smith"
import { useTranslation } from "@modules/i18n"
import { deepCurrent } from "@utils/atoms"
import { useAtom } from "jotai"
import { useEffect, useState } from "react"

interface CircleRadiusFormProps {
    showModal: (state: boolean) => void;
    modalState: boolean;
}

const CircleRadiusForm = (props: CircleRadiusFormProps) => {
    const { showModal, modalState } = props
    const [radius, setRadius] = useState("")
    const { t } = useTranslation()
    const [current, send] = useAtom(drawServiceAtom)

    const onClickCircleCenterRadiusCancel = () => send('CANCEL')
    const onClickCircleCenterRadiusValue = (v: string) => {
        try {
            const n = parseFloat(v)
            if (Number.isNaN(n))
                throw ''
            n > 0 && send({ type: "RADIUS", value: n })
        } catch (err) {
            v != '' && send({ type: "RADIUS", value: v })
        }
    }

    const deep = deepCurrent(current.service)
    useEffect(() => {
        // console.log("showModal", deep)
        showModal(deep == "draw.drawCircle")
    }, [deep])

    return <form>
        <h3 className="font-bold text-lg mb-2">
            {t.tools.circle_radius.form_title()}
        </h3>
        <div className="join w-full">
            <input
                type="text"
                placeholder={t.tools.circle_radius.placeholder()}
                className="input w-full input-bordered font-mono join-item"
                onChange={(ev: any) => setRadius(ev.target.value)}
            />
            {/* <div className="tooltip " data-tip={t.tools.circle_radius.help()}>
                <button className="btn normal-case join-item">?</button>
            </div> */}
        </div>
        <div className="modal-action flex items-center">
            <a href="#" className="text-gray-500" onClick={onClickCircleCenterRadiusCancel}>{t.common.cancel()}</a>
            <a href="#" className="btn" onClick={() => onClickCircleCenterRadiusValue(radius)} >
                {t.canvas.create()}
            </a>
        </div>
    </form>
}

export default CircleRadiusForm