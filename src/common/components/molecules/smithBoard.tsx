import { useEffect } from "react";
import { useScreen } from "@hooks/useScreen";
import { useAtom, useSetAtom } from "jotai";
import { boardAtom, boardConfigAtom, editorServiceAtom, drawServiceAtom, savingServiceAtom } from "@core/atoms/smith";
import { themeAtom } from "@core/atoms/common";
import { useRouter } from "@modules/router";
import { useHotkeys } from "react-hotkeys-hook";
import { useTranslation } from "@modules/i18n";
import { RESET } from "jotai/utils";
import { useUser } from "@hooks/useAuthProvider";

export interface SmithBoardProps { };

const SmithBoard = (props: SmithBoardProps) => {
    const [theme] = useAtom(themeAtom)
    const screen = useScreen()
    const { isAuthenticated, loading } = useUser()
    const { useParams } = useRouter()
    const params = useParams();
    const { t } = useTranslation()
    const recreate = useSetAtom(boardAtom)
    const [options, setOptions] = useAtom(boardConfigAtom)
    // const setLoading = useSetAtom(loadingAtom)

    //machines
    const sendMenu = useSetAtom(drawServiceAtom)
    const sendEditor = useSetAtom(editorServiceAtom)
    const sendSave = useSetAtom(savingServiceAtom)

    // hotkeys and keystrokes
    const hotkeysOptions = {
        enableOnContentEditable: true
    }

    useHotkeys('esc', () => sendMenu("EXIT"), hotkeysOptions)
    useHotkeys('delete', () => sendMenu("DELETE"), hotkeysOptions)
    useHotkeys('ctrl+enter', () => sendEditor('PARSE'), hotkeysOptions)

    // console.log(params.id[0])
    // TODO: params.id

    useEffect(() => {
        sendSave(RESET)
        sendEditor(RESET)
    }, [])

    useEffect(() => {
        if (!loading) {
            sendSave({ type: 'LOAD', value: params?.id?.[0] as string })
        }
    }, [loading])

    // useEffect(() => {
    //     if (isAuthenticated) {
    //         sendSave({ type: 'LOAD', value: params?.id?.[0] as string })
    //     }
    // }, [isAuthenticated]);

    useEffect(() => {
        setOptions({ ...options, theme, translations: t.canvas, screen })
        recreate()
        // console.log(theme)
        sendEditor('PARSE')
    }, [theme, t, screen])

    return <div
        id={options.name}
        className="jxgbox full-screen-div w-full"
        aria-label="canvas"
    // style={{ width: '500px', height: '500px' }}
    >
        <img src="/images/smith-chart-dark.svg" alt="smith-board-img" srcset="" className="hidden" loading={'lazy'} />
    </div>

}

export default SmithBoard;