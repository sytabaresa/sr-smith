import { HTMLAttributes, Suspense, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useTranslation } from "@modules/i18n";

import prism from 'prismjs/components/prism-core.js';
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-solarizedlight.css";
import { SmithContext } from "@providers/smithContext";
const { highlight, languages, tokenize } = prism;
// Import the Slate editor factory.
import { createEditor, Text } from 'slate'

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'
import { withHistory } from 'slate-history'
// import { JSXElement, useJSXElement } from "./editor/withElements";
import { deserializeCode, serializeCode } from './editor/serializers'
// Borrow Leaf renderer from the Rich Text example.
// In a real project you would get this via `withRichText(editor)` or similar.
export const Leaf = ({ attributes, children, leaf }) => {
    return <span
        {...attributes}
        {...(leaf.type && { className: `token ${leaf.type}` })}
    >{children}</span>
}

export interface CodeEditor extends HTMLAttributes<HTMLDivElement> {
    // code: string;
};


const Element = props => {
    const { attributes, children, element } = props
    switch (element.type) {
        case 'paragraph':
            return <p {...attributes}>{children}</p>
        default:
            return <span {...attributes}>{children}</span>
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


    // const { withElement, getToken, selectorData, Popup, onKeyDown } = useJSXElement()
    const [current, send] = editorService
    const { code, errorMsg } = current.context

    // console.log(code)
    // console.log(current.name)
    const editor = useMemo(
        () => (withReact(withHistory(createEditor()))),
        []
    )
    const initialValue = useMemo(() => deserializeCode(code), [code])
    // console.log(initialValue)
    useEffect(() => {
        editor.children = deserializeCode(code)
    }, [code])


    const decorate = useCallback(([node, path]) => {
        const ranges = []

        if (!Text.isText(node)) {
            return ranges
        }

        const getLength = token => {
            if (typeof token === 'string') {
                return token.length
            } else if (typeof token.content === 'string') {
                return token.content.length
            } else {
                return token.content.reduce((l, t) => l + getLength(t), 0)
            }
        }

        const tokens = tokenize(node.text, languages.js)
        let start = 0

        for (const token of tokens) {
            const length = getLength(token)
            const end = start + length

            if (typeof token !== 'string') {
                ranges.push({
                    type: token.type,
                    anchor: { path, offset: start },
                    focus: { path, offset: end },
                })
            }

            start = end
        }

        return ranges
    }, [])


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
                            onChange={value => {
                                const isAstChange = editor.operations.some(
                                    op => 'set_selection' !== op.type
                                )
                                if (isAstChange) {
                                    // Serialize the value and save the string value to Local Storage.
                                    const code = serializeCode(value)
                                    setActualCode(code)
                                }
                            }}
                        >
                            <Editable
                                renderElement={renderElement}
                                renderLeaf={renderLeaf}
                                decorate={decorate}
                                onKeyDown={(event) => {
                                    // onKeyDown(event, editor)
                                }}
                            // placeholder="Enter some text..."
                            />
                            {/* <Popup editor={editor} data={selectorData} /> */}
                        </Slate>
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
