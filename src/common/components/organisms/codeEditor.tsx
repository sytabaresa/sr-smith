import { HTMLAttributes, TextareaHTMLAttributes, useContext, useEffect } from "react";
import { useTranslation } from "next-export-i18n";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";

import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-solarizedlight.css";
import { SmithContext } from "../../../common/providers/smithContext";
import { useUser } from "./userContext";

export interface CodeEditor extends HTMLAttributes<HTMLDivElement> {
    // code: string;
};

const CodeEditor = ({ className, ...rest }: CodeEditor) => {
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

    return (
        <div className={`border border-primary bg-base-100 card p-2 flex flex-col ${className}`} {...rest}>
            <div className="overflow-y-auto scrollbar-thin !scrollbar-w-[4px] scrollbar-track-base-100 scrollbar-thumb-base-content flex-1 flex mb-1">
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
            <button onClick={parseExecute} className="btn btn-outline">
                {t('run')}
            </button>
        </div >
    );
}

export default CodeEditor;