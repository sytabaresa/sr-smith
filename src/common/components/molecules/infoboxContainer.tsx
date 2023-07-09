import { useEffect } from "react"
import { createPortal } from "react-dom"
import { useAtomValue } from "jotai"
import { Infobox } from "@components/atoms/infobox"
import { infoboxAtom } from "@core/atoms/smith"

const InfoboxContainer = (props) => {
    const data = useAtomValue(infoboxAtom)

    if (typeof window == 'undefined') {
        return <></>
    }

    const infobox = document?.querySelector('.JXGinfobox')
    // console.log(board, infobox)

    useEffect(() => {
        return () => {
            // eslint-disable-next-line no-unmodified-loop-condition
            while (infobox && infobox.firstChild) {
                infobox.removeChild(infobox.firstChild);
            }
        }
    }, [])

    if (!infobox) {
        return <></>
    }

    return createPortal(<Infobox {...data} /> as any, infobox)
}

export default InfoboxContainer