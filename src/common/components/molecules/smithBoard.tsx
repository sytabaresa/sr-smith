import { useContext, useEffect, useState } from "react";
import { SmithContext } from "@providers/smithContext";
import { useScreen } from "@utils/screen";
import { useTheme } from "@hooks/useTheme";

export interface ISmithBoardProps { };

const SmithBoard: React.FC<ISmithBoardProps> = (props) => {
    const { ui, editorService } = useContext(SmithContext)
    const [theme] = useTheme()
    const screenSize = useScreen()
    const BOX_NAME = 'smith-box'
    const [current, send] = editorService

    useEffect(() => {
        // console.log(screenSize)
        send({ type: 'CONFIG', value: { name: BOX_NAME, theme, screenSize } })
    }, [screenSize])

    useEffect(() => {
        // console.log(theme)
        send({ type: "CONFIG", value: { theme } })
        send('PARSING')
    }, [theme])

    return <>
        <div
            id={BOX_NAME}
            className="jxgbox full-screen-div w-full"
        // style={{ width: '500px', height: '500px' }}
        >
            <img src="/images/smith-chart.svg" alt="smith-board" srcset="" className="hidden" loading={'lazy'} />
        </div>
    </>
}

export default SmithBoard;