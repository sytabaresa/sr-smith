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
        const n = parseFloat(v)
        n > 0 && send({ type: "RADIUS", value: n })
    }

    const deep = deepCurrent(current.service)
    // console.log(deep)
    useEffect(() => {
        showModal(deep == "draw.drawCircle")
    }, [deep])

    return <form>
        <h3 className="font-bold text-lg mb-2">
            Circunferencia: centro y radio
        </h3>
        <input
            type="text"
            placeholder="Elija el Radio"
            className="input input-bordered w-full max-w-xs"
            onChange={(ev: any) => setRadius(ev.target.value)}
        />
        <div className="modal-action flex items-center">
            <a href="#" className="text-gray-500" onClick={onClickCircleCenterRadiusCancel}>Cancelar</a>
            <a href="#" className="btn" onClick={() => onClickCircleCenterRadiusValue(radius)} >
                {t.canvas.create()}
            </a>
        </div>
    </form>
}

export default CircleRadiusForm