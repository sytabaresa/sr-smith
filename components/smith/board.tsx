import JXG from "jsxgraph/distrib/jsxgraphcore"
import "jsxgraph/distrib/jsxgraph.css"
import { useEffect } from "react";

export interface ISmithBoardProps { };

const SmithBoard: React.FC<ISmithBoardProps> = (props) => {
    const boxName = 'smith-box'

    useEffect(() => {

        const board = JXG.JSXGraph.initBoard(boxName, { boundingbox: [-10, 10, 10, -10], axis: true });
        return () => { }
    },
        //eslint-disable-next-line
        []);

    return (
        <div
            id={boxName}
            className="jxgbox m-3"
            style={{ width: '500px', height: '500px' }}
        >

        </div>
    );
}

export default SmithBoard;