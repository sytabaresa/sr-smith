import { useContext, useEffect } from "react";
import { SmithContext } from "../../providers/smithContext";
import { initBoard } from "../atoms/boards";
import { useScreen } from "../utils/screen";

export interface ISmithBoardProps { };

const SmithBoard: React.FC<ISmithBoardProps> = (props) => {
    const { ui } = useContext(SmithContext)

    const screenSize = useScreen()

    const BOX_NAME = 'smith-box'
    useEffect(() => {
        ui.newBoard(BOX_NAME, {}, screenSize)
        return () => { }
    },
        //eslint-disable-next-line
        []);

    return (
        <div
            id={BOX_NAME}
            className="jxgbox h-full w-full"
        // style={{ width: '500px', height: '500px' }}
        >

        </div>
    );
}

export default SmithBoard;