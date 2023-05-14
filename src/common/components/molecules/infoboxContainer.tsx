import { Infobox } from "@components/atoms/infobox"
import { boardAtom, infoboxAtom } from "@core/atoms/smith"
import { useAtomValue } from "jotai"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

const InfoboxContainer = (props) => {
    const [root, setRoot] = useState<Element>(typeof window != 'undefined' ? document.body : null)
    const data = useAtomValue(infoboxAtom)
    const board = useAtomValue(boardAtom)
    if (typeof window == 'undefined')
        return null

    useEffect(() => {
        setTimeout(() => {
            setRoot(document.getElementsByClassName('JXGinfobox')[0])
        }, 500) //delay
    }, [board])

    // console.log(root)
    return createPortal(<Infobox {...data} /> as any, root)
}


export default InfoboxContainer