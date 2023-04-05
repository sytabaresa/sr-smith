import { HTMLAttributes, lazy, memo, Suspense, useCallback, useContext, useMemo, useState } from "react";
import { useTranslation } from "@modules/i18n";

import prism from 'prismjs/components/prism-core.js';
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-solarizedlight.css";
import { SmithContext } from "@providers/smithContext";
const { highlight, languages } = prism;
import { data as initialData } from './editor/exampleAST'
// Import the Slate editor factory.
import { createEditor } from 'slate'

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'
import { withHistory } from 'slate-history'
import { deserialize, JSXElement, useJSXElement } from "./editor/withElements";

// import Editor from "react-simple-code-editor"
// const Editor = lazy(() => import("react-simple-code-editor"))


// Borrow Leaf renderer from the Rich Text example.
// In a real project you would get this via `withRichText(editor)` or similar.
export const Leaf = ({ attributes, children, leaf }) => {
    // if (leaf.bold) {
    //     children = <strong>{children} </strong>
    // }

    // if (leaf.code) {
    //     children = <code>{children} </code>
    // }

    // if (leaf.italic) {
    //     children = <em>{children} </em>
    // }

    // if (leaf.underline) {
    //     children = <u>{children} </u>
    // }

    return <span {...attributes} > {children} </span>
}

export interface CodeEditor extends HTMLAttributes<HTMLDivElement> {
    // code: string;
};


const Element = props => {
    const { attributes, children, element } = props
    switch (element.type) {
        case 'node_var':
            return <JSXElement {...props} />
        case 'node_op_assign':
            return <p {...attributes}> {children}</p>
        case 'node_params':
            return <span {...attributes}> ({children}) </span>
        default:
            return <span {...attributes}> {children} </span>
    }
}


const CodeEditor = ({ className, ...rest }: CodeEditor) => {
    const { t } = useTranslation()

    const renderLeaf = useCallback(props => <Leaf {...props} />, [])
    const renderElement = useCallback(props => <Element {...props} />, [])

    // const {user, isAuthenticated, loadingUser} = useUser()


    // Add the initial value.
    const {
        editorService,
    } = useContext(SmithContext)
    // console.log('inner', contextCode)


    const { withElement, getToken, selectorData, Popup, onKeyDown } = useJSXElement()
    const editor = useMemo(
        () => withElement(withReact(withHistory(createEditor()))),
        []
    )
    const [current, send] = editorService
    const { code, errorMsg } = current.context

    // console.log(code)
    // console.log(current.name)
    const initialValue = useMemo(() => deserialize(initialData), [initialData])
    console.log(initialValue)



    const parseExecute = () => send('PARSING')
    const setActualCode = (code) => send({ type: "CODE", value: code })

    return (
        <div className={`border border-primary bg-base-100 p-2 flex flex-col ${className}`} {...rest}>
            <div className="overflow-y-auto scrollbar-thin !scrollbar-w-[4px] scrollbar-track-base-100 scrollbar-thumb-base-content flex-1 flex mb-1">
                {/* //TODO: why only when we unfocus the textarea,  parseExecute updates the code variable (hook stale) */}
                {typeof window != 'undefined' &&
                    <Suspense fallback={<textarea className="w-full h-full flex-1"></textarea>}>
                        <Slate
                            editor={editor}
                            value={initialValue}
                            onChange={() => {
                                getToken(editor)
                                //TODO: use token
                            }}
                        >
                            <Editable
                                renderElement={renderElement}
                                // renderLeaf={renderLeaf}
                                onKeyDown={(event) => {
                                    onKeyDown(event, editor)
                                }}
                                placeholder="Enter some text..."
                            />
                            <Popup editor={editor} data={selectorData} />
                        </Slate>
                        {/* <Editor
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
                        /> */}
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
