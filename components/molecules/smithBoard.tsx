import { useContext, useEffect } from "react";
import { SmithContext } from "../../providers/smithContext";
import { initBoard } from "../utils/board";
import { useScreen } from "../utils/screen";

export interface ISmithBoardProps { };

const SmithBoard: React.FC<ISmithBoardProps> = (props) => {
    const { setBoard, boxName } = useContext(SmithContext)

    const screenSize = useScreen()

    useEffect(() => {
        const brd = initBoard(boxName, {}, screenSize)
        setBoard(brd)

        return () => { }
    },
        //eslint-disable-next-line
        []);

    return (
        <div
            id={boxName}
            className="jxgbox h-full w-full"
        // style={{ width: '500px', height: '500px' }}
        >

        </div>
    );
}

export default SmithBoard;