import { HTMLAttributes, lazy, Suspense, useContext } from "react";
import { useTranslation } from "@modules/i18n";

import prism from 'prismjs/components/prism-core.js';
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-solarizedlight.css";
import { SmithContext } from "@providers/smithContext";
const { highlight, languages } = prism;
// import Editor from "react-simple-code-editor"
const Editor = lazy(() => import("react-simple-code-editor"))

export interface CodeEditor extends HTMLAttributes<HTMLDivElement> {
    // code: string;
};

const CodeEditor = ({ className, ...rest }: CodeEditor) => {
    const { t } = useTranslation()
    // const { user, isAuthenticated, loadingUser } = useUser()

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
        <div className={`border border-primary bg-base-100 p-2 flex flex-col ${className}`} {...rest}>
            <div className="overflow-y-auto scrollbar-thin !scrollbar-w-[4px] scrollbar-track-base-100 scrollbar-thumb-base-content flex-1 flex mb-1">
                {/* //TODO: why only when we unfocus the textarea,  parseExecute updates the code variable (hook stale) */}
                {typeof window != 'undefined' &&
                    <Suspense fallback={<textarea className="w-full h-full flex-1"></textarea>}>
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
                    </Suspense>}
            </div>

            <div className={`alert alert-error transition-opacity duration-200 
            ${current.name == 'error' ? "opacity-100" : "opacity-0 py-0"}`}>
                {errorMsg.toString()}
            </div>
            <button onClick={parseExecute} className="btn btn-outline">
                {t.canvas.run()}
            </button>
        </div >
    );
}

export default CodeEditor;