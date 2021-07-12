import { TextareaHTMLAttributes, useContext, useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { HotKeys, configure } from "react-hotkeys";
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

const exampleCode =
    `// test smith chart
point(0, 0) << name: 'O', fixed: true >>;
Z1 = point(.5, .5) <<name: 'Z1', color: 'green', size: 5>>;
L = line(Z1, O);
reflect = transform(PI, O) << type: 'rotate' >>;
Y1 = point(Z1, reflect) << name: 'Y1' >>;
circle(Y1, .3);`

configure({
    /**
     * The level of logging of its own behaviour React HotKeys should perform.
     */
    // logLevel: 'verbose',
    ignoreTags: [],
    // ignoreEventsCondition: (event) => { return false; }
    stopEventPropagationAfterIgnoring: false,
    stopEventPropagationAfterHandling: false,

})


export interface IJCTextProps extends TextareaHTMLAttributes<HTMLElement> {
};

const JCText: React.FC<IJCTextProps> = ({ className, style }) => {
    const { t } = useTranslation('smith')
    const { board, setBoard, boxName } = useContext(SmithContext)
    // console.log(board)

    const [current, send] = useMachine(machine, {
        errorMsg: '',
        code: exampleCode
    });
    const { code, errorMsg } = current.context
    console.log(code)
    // console.log(current.name)

    const parseExecute = () => {
        console.log(code)
        send('PARSING')
        // console.log(board)
        if (board) {
            setBoard(board => {
                let brd
                try {
                    JXG.JSXGraph.freeBoard(board);
                    brd = initBoard(boxName)
                    brd.jc.parse(code);
                    send('PARSED')
                    return brd
                } catch (err) {
                    console.log(err)
                    send({ type: 'ERROR', value: err })
                    return brd
                }
            })
        }
    }

    const keyMap = {
        RUN_CODE: "alt+down",
        // LOG: "up",
    };
    const handlers = {
        RUN_CODE: parseExecute,
        LOG: event => console.log("Move up hotkey called!")
    };

    return (
        <div className={"border border-black bg-white dark:bg-gray-800 rounded-xl p-2 flex flex-col " + className} style={style}>
            <div className="overflow-y-auto custom-scrollbar flex-1 mb-1">
                {/* //TODO: why only when we unfocus the textarea,  parseExecute updates the code variable (hook stale) */}
                <HotKeys keyMap={keyMap} handlers={handlers}> 
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
                </HotKeys>
            </div>

            <div className={`bg-red-300 p-1 rounded-md transition-opacity duration-200 
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