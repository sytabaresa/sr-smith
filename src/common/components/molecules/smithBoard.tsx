import { useEffect } from "react";
import { useScreen } from "@utils/screen";
import { useAtom, useSetAtom } from "jotai";
import { boardAtom, boardConfigAtom, editorServiceAtom, menuServiceAtom, savingServiceAtom } from "@core/atoms/smith";
import { themeAtom } from "@core/atoms/common";
import { useRouter } from "@modules/router";
import { useUser } from "@components/organisms/userContext";
import { useHotkeys } from "react-hotkeys-hook";

export interface ISmithBoardProps { };

const SmithBoard: React.FC<ISmithBoardProps> = (props) => {
    const [theme] = useAtom(themeAtom)
    const screen = useScreen()
    const { isAuthenticated } = useUser()
    const { useParams } = useRouter()
    const params = useParams();

    const recreate = useSetAtom(boardAtom)
    const [options, setOptions] = useAtom(boardConfigAtom)

    //machines
    const sendMenu = useSetAtom(menuServiceAtom)
    const [currentEditor, sendEditor] = useAtom(editorServiceAtom)
    const sendSave = useSetAtom(savingServiceAtom)

    // hotkeys and keystrokes
    useHotkeys('esc', () => sendMenu("EXIT"))
    useHotkeys('delete', () => sendMenu("DELETE"))
    useHotkeys('ctrl+enter', () => sendEditor('PARSE'))

    // console.log(params.id[0])
    // TODO: params.id

    useEffect(() => {
        if (currentEditor.context.code != '')
            sendSave({ type: 'SAVE', value: currentEditor.context.code })
    }, [currentEditor.context.code]);

    useEffect(() => {
        if (isAuthenticated) {
            sendSave({ type: 'LOAD', value: params?.id?.[0] as string })
        }
    }, [isAuthenticated]);

    useEffect(() => {
        // console.log(screenSize)
        setOptions({ ...options, screen })
        recreate()
    }, [screen])

    useEffect(() => {
        setOptions({ ...options, theme })
        recreate()
        // console.log(theme)
        sendEditor('PARSE')
    }, [theme])

    return <>
        <div
            id={options.name}
            className="jxgbox full-screen-div w-full"
        // style={{ width: '500px', height: '500px' }}
        >
            <img src="/images/smith-chart.svg" alt="smith-board" srcset="" className="hidden" loading={'lazy'} />
        </div>
    </>
}

export default SmithBoard;