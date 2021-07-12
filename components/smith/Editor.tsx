import { TextareaHTMLAttributes, useContext, useEffect, useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-coy.css"; //Example style, you can use another
import { SmithContext } from "./context";
import { initBoard } from "./Board";

import JXG from "jsxgraph/distrib/jsxgraphcore"
import { useTranslation } from "next-i18next";


const exampleCode =
    `// test smith chart
point(0, 0) << name: 'O' >>;
Z1 = point(.5, .5) << name: 'Z1', color: 'green' >>;
L = line(Z1, O);
reflect = transform(PI, O) << type: 'rotate' >>;
Y1 = point(Z1, reflect) << name: 'Y1' >>;
circle(Y1, .3);
`
export interface IJCTextProps extends TextareaHTMLAttributes<HTMLElement> {
};

const JCText: React.FC<IJCTextProps> = ({ className }) => {
    const { t } = useTranslation('smith')
    const { board, setBoard, boxName } = useContext(SmithContext)
    // console.log(board)

    const [code, setCode] = useState(exampleCode);

    const parseExecute = () => {
        // console.log(board)
        if (board) {
            JXG.JSXGraph.freeBoard(board);
            const brd = initBoard(boxName)
            brd.jc.parse(code);
            setBoard(brd)
        }
    }

    return (
        <div className={"border border-black bg-white dark:bg-gray-800 rounded-xl p-2 " + className}>
            <Editor
                value={code}
                onValueChange={(code) => setCode(code)}
                highlight={(code) => highlight(code, languages.js)}
                padding={10}
                style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 12,
                }}
                id="code"
                textareaClassName="resize-y outline-none"
            // cols={110}
            // rows={31}
            />
            <button
                className="px-2 py-1 border border-black rounded-md"
                onClick={parseExecute}
            >
                {t('run')}
            </button>
        </div>
    );
}

export default JCText;