import { useContext, useEffect, useState } from "react";
import { SmithContext } from "../../providers/smithContext";
import { changeBoardTheme, initBoard } from "../atoms/boards";
import { useTheme } from "../atoms/useTheme";
import { useScreen } from "../utils/screen";

export interface ISmithBoardProps { };

const SmithBoard: React.FC<ISmithBoardProps> = (props) => {
    const { ui, editorService } = useContext(SmithContext)
    const [theme] = useTheme()
    const screenSize = useScreen()
    const BOX_NAME = 'smith-box'

    useEffect(() => {
        ui.newBoard(BOX_NAME, { theme }, screenSize)
        return () => { }
    }, []);

    useEffect(() => {
        // console.log(theme)
        const [current, send] = editorService
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