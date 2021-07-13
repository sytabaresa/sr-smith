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
import Button from '../button'

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
    // code: string;
};

const JCText: React.FC<IJCTextProps> = ({ className, style }) => {
    const { t } = useTranslation('smith')
    const { board, setBoard, boxName, code: contextCode, setCode } = useContext(SmithContext)
    // console.log(board)

    const [current, send] = useMachine(machine, {
        code: contextCode,
        errorMsg: '',
    });
    const { code, errorMsg } = current.context

    // console.log(code)
    // console.log(current.name)

    const parseExecute = () => {
        // console.log(code)
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
    const setActualCode = (code) => {
        send({ type: "CODE", value: code })
        setCode(code) //TODO: update instantly? or with memo
    }

    const keyMap = {
        RUN_CODE: "alt+down",
    };
    const handlers = {
        RUN_CODE: parseExecute,
    };

    return (
        <div className={"border border-principal bg-white dark:bg-gray-800 rounded-xl p-2 flex flex-col " + className} style={style}>
            <div className="overflow-y-auto custom-scrollbar flex-1 mb-1">
                {/* //TODO: why only when we unfocus the textarea,  parseExecute updates the code variable (hook stale) */}
                <HotKeys keyMap={keyMap} handlers={handlers}>
                    <Editor
                        value={code}
                        onValueChange={setActualCode}
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
            <Button
                preset="outline"
                onClick={parseExecute}
            >
                {t('run')}
            </Button>
        </div>
    );
}

export default JCText;