import { TextareaHTMLAttributes, useContext, useEffect } from "react";
import { useTranslation } from "next-export-i18n";
import { HotKeys, configure } from "react-hotkeys";
import Editor from "react-simple-code-editor";
import JXG from "jsxgraph/distrib/jsxgraphcore"
import { highlight, languages } from "prismjs/components/prism-core";

import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-solarizedlight.css";
import { SmithContext } from "../../providers/smithContext";
import { useUser } from "../../providers/userContext";

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
    const { t } = useTranslation()
    const { user, isAuthenticated, loadingUser } = useUser()

    const {
        editorService,
    } = useContext(SmithContext)
    // console.log('inner', contextCode)


    const [current, send] = editorService
    const { code, errorMsg } = current.context

    // console.log(code)
    // console.log(current.name)

    const parseExecute = () => send('PARSING')
    const setActualCode = (code) => send({ type: "CODE", value: code })

    const keyMap = {
        RUN_CODE: "alt+down",
    };
    const handlers = {
        RUN_CODE: parseExecute,
    };

    return (
        <HotKeys keyMap={keyMap} handlers={handlers}>
            <div className={"border border-primary bg-base-100 card p-2 flex flex-col " + className} style={style}>
                <div className="overflow-y-auto custom-scrollbar flex-1 flex mb-1">
                    {/* //TODO: why only when we unfocus the textarea,  parseExecute updates the code variable (hook stale) */}
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
                        className="flex-1"
                    />
                </div>

                <div className={`alert alert-error transition-opacity duration-200 
            ${current.name == 'error' ? "opacity-100" : "opacity-0 py-0"}`}>
                    {errorMsg.toString()}
                </div>
                <button
                    // preset="outline"
                    onClick={parseExecute}
                    className="btn btn-outline btn-primary"
                >
                    {t('run')}
                </button>
            </div>
        </HotKeys>
    );
}

export default JCText;