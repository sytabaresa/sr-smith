import { useContext, useEffect, useState } from "react";
import { SmithContext } from "@providers/smithContext";
import { useTheme } from "@hooks/useTheme";
import { useScreen } from "@utils/screen";

export interface ISmithBoardProps { };

const SmithBoard: React.FC<ISmithBoardProps> = (props) => {
    const { ui, editorService } = useContext(SmithContext)
    const [theme] = useTheme()
    const screenSize = useScreen()
    const BOX_NAME = 'smith-box'
    const [current, send] = editorService

    useEffect(() => {
        send({ type: 'INIT', value: { name: BOX_NAME, theme, screenSize } })
    }, []);

    useEffect(() => {
        // console.log(theme)
        send({ type: "THEME", value: theme })
        send('PARSING')
    }, [theme])

    return (
        <div
            id={BOX_NAME}
            className="jxgbox full-screen-div w-full"
        // style={{ width: '500px', height: '500px' }}
        >

        </div>
    );
}

export default SmithBoard;