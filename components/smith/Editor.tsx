import { TextareaHTMLAttributes, useContext, useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import Editor from "react-simple-code-editor";
import JXG from "jsxgraph/distrib/jsxgraphcore"
import { highlight, languages } from "prismjs/components/prism-core";
import { useMachine } from 'react-robot';

import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-solarizedlight.css";
import { SmithContext } from "./context";
import { initBoard } from "./Board";
import machine from './fsm'

export interface IJCTextProps extends TextareaHTMLAttributes<HTMLElement> {
};

const JCText: React.FC<IJCTextProps> = ({ className, style }) => {
    const { t } = useTranslation('smith')
    const { board, setBoard, boxName } = useContext(SmithContext)
    // console.log(board)

    const [current, send] = useMachine(machine);
    const { code, errorMsg } = current.context
    // console.log(current.name)

    const parseExecute = () => {
        send('PARSING')
        // console.log(board)
        if (board) {
            try {
                JXG.JSXGraph.freeBoard(board);
                const brd = initBoard(boxName)
                setBoard(brd)
                brd.jc.parse(code);
                send('PARSED')
            } catch (err) {
                console.log(err)
                send({ type: 'ERROR', value: err })
            }
        }
    }

    return (
        <div className={"border border-black bg-white dark:bg-gray-800 rounded-xl p-2 flex flex-col " + className} style={style}>
            <div className="overflow-y-auto custom-scrollbar flex-1 mb-1">
                <Editor
                    value={code}
                    onValueChange={(code) => send({ type: "CODE", value: code })}
                    highlight={(code) => highlight(code, languages.js)}
                    padding={10}
                    style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 12,
                        overflow: 'initial',
                    }}
                    id="smith-code"
                    textareaClassName="outline-none"
                />
            </div>
            <div className={`bg-red-300 p-1 rounded rounded-md transition transition-opacity duration-200 
            ${current.name == 'error' ? "opacity-100" : "opacity-0"}`}>
                {errorMsg}
            </div>
            <button
                className="mt-1 px-2 py-1 border border-black rounded-md hover:bg-gray-300 active:bg-black active:text-white"
                onClick={parseExecute}
            >
                {t('run')}
            </button>
        </div>
    );
}

export default JCText;