import { useEffect } from "react";
import { useScreen } from "@utils/screen";
import { useAtom, useSetAtom } from "jotai";
import { boardAtom, boardConfigAtom, editorServiceAtom, menuServiceAtom, savingServiceAtom } from "@core/atoms/smith";
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
    const { isAuthenticated } = useUser()
    const { useParams } = useRouter()
    const params = useParams();
    const { t } = useTranslation()
    const recreate = useSetAtom(boardAtom)
    const [options, setOptions] = useAtom(boardConfigAtom)
    // const setLoading = useSetAtom(loadingAtom)

    //machines
    const sendMenu = useSetAtom(menuServiceAtom)
    const [currentEditor, sendEditor] = useAtom(editorServiceAtom)
    const [currentSave, sendSave] = useAtom(savingServiceAtom)

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
        sendSave({ type: 'LOAD', value: params?.id?.[0] as string })
    }, [])

    useEffect(() => {
        if (currentEditor.context.code != '')
            sendSave({ type: 'SAVE', value: currentEditor.context.code })
    }, [currentEditor.context.code]);

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
        <img src="/images/smith-chart.svg" alt="smith-board" srcset="" className="hidden" loading={'lazy'} />
    </div>

}

export default SmithBoard;