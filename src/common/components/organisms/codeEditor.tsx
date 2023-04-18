import { HTMLAttributes, Suspense, createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { useTranslation } from "@modules/i18n";

import prism from 'prismjs/components/prism-core.js';
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";

import '@modules/editor/jessieCode'
import "prismjs/themes/prism-solarizedlight.css";
import { SmithContext } from "@providers/smithContext";
const { languages, tokenize } = prism;

// Import the Slate editor factory.
import { createEditor, Text, Element, Node, Descendant } from 'slate'

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'
import { withHistory } from 'slate-history'
import { deserializeCode, serializeCode } from '@modules/editor/serializers'
import { CustomElement } from "@modules/editor/types";
import { normalizeTokens } from "@modules/editor/normalizeTokens";
import { KeysContext, useKeyContext } from "@modules/editor/keysContext";

// plugins
import { AutolinkerLeaf, autolinker } from "@modules/editor/autolinker";
import { ColorInlineLeaf, colorInline } from "@modules/editor/colorInline";
import { SearcherPopup, useSearcher } from "@modules/editor/searcher";


export interface CodeEditor extends HTMLAttributes<HTMLDivElement> {
    // code: string;
};

const Leaf = (props) => {
    let { attributes, children, leaf } = props
    const { text, type = {}, content, ...rest } = leaf
    const classes = Object.keys(type)

    if (classes.includes('color')) {
        children = <ColorInlineLeaf {...props} classes={classes}>{children}</ColorInlineLeaf>
    }

    if (/-link$/.test(classes as unknown as string)) {
        children = <AutolinkerLeaf {...props} classes={classes}>{children}</AutolinkerLeaf>
    }

    // console.log(classes)
    return <span
        {...attributes}
        className={'token ' + classes.join(' ')}
    >{children}</span>
}

const ElementRender = props => {
    const { attributes, children, element } = props
    // console.log(props)
    switch (element.type) {
        case 'paragraph':
            return <p {...attributes}>{children}</p>
        case 'code-line':
            return <div {...attributes}>{children}</div>

        default:
            return <span {...attributes}>{children}</span>
    }
}

const CodeEditor = ({ className, ...rest }: CodeEditor) => {
    const { t } = useTranslation()

    const renderLeaf = useCallback(props => <Leaf {...props} />, [])
    const renderElement = useCallback(props => <ElementRender {...props} />, [])

    // const {user, isAuthenticated, loadingUser} = useUser()


    // Add the initial value.
    const {
        editorService,
    } = useContext(SmithContext)
    // console.log('inner', contextCode)

    const searchElement = useSearcher()
    const { onKeyDown, onChange } = searchElement
    const [current, send] = editorService
    const { code, errorMsg } = current.context

    // console.log(code)
    // console.log(current.name)
    const editor = useMemo(
        () => withReact(withHistory(createEditor())),
        []
    )
    const initialValue = useMemo(() => deserializeCode(code), [])
    // console.log(initialValue)
    // useEffect(() => {
        // console.log(current.name)
        if (current.name == 'parsing')
            editor.children = deserializeCode(code) as Descendant[]
    // }, [current.name])


    const decorate = useCallback(([blockNode, blockPath]) => {

        if (!Element.isElement(blockNode) || blockNode.type != 'paragraph') {
            return []
        }
        console.log(blockNode, blockPath)

        const text = blockNode.children.map(line => Node.string(line)).join('\n')
        // console.log(text)

        const getLength = token => {
            if (typeof token === 'string') {
                return token.length
            } else if (typeof token.content === 'string') {
                return token.content.length
            } else {
                return token.content.reduce((l, t) => l + getLength(t), 0)
            }
        }

        const grammar = colorInline(autolinker(languages.jc))
        // console.log(grammar)
        const _tokens = tokenize(text, grammar)
        // console.log(_tokens)
        const lineTokens = normalizeTokens(_tokens)
        // console.log(lineTokens)

        const ranges = []
        for (const [index, tokens] of lineTokens.entries()) {

            let start = 0
            for (const token of tokens) {
                const length = getLength(token)
                const end = start + length

                if (!length) {
                    continue
                }
                // console.log(token)
                // const type = [...extraType, ...(token.alias ? [token.alias] : []), token.type]
                const path = [...blockPath, index, 0]
                ranges.push({
                    anchor: { path, offset: start },
                    focus: { path, offset: end },
                    token: true,
                    type: Object.fromEntries(token.types.map(type => [type, true])),
                    content: token.content
                })

                start = end
            }
        }

        // console.log(ranges)
        return ranges
    }, [])

  

    // FSM actions
    const parseExecute = () => send('PARSING')
    const setActualCode = (code) => send({ type: "CODE", value: code })

    const keyValues = useKeyContext()
    const { setEvent, setEventDown, setEventUp } = keyValues

    return (
        <div className={`border border-primary bg-base-100 p-2 flex flex-col ${className}`} {...rest}>
            <div className="overflow-y-auto scrollbar-thin !scrollbar-w-[4px] scrollbar-track-base-100 scrollbar-thumb-base-content flex-1 mb-1">
                {/* //TODO: why only when we unfocus the textarea,  parseExecute updates the code variable (hook stale) */}
                {typeof window != 'undefined' &&
                    <Suspense fallback={<textarea className="w-full h-full flex-1"></textarea>}>
                        <KeysContext.Provider value={keyValues}>
                            <Slate
                                editor={editor}
                                value={initialValue}
                                onChange={value => {
                                    const isAstChange = editor.operations.some(
                                        op => 'set_selection' !== op.type
                                    )
                                    if (isAstChange) {
                                        onChange(editor)
                                        // Serialize the value and save the string value to Local Storage.
                                        const code = serializeCode(value)
                                        setActualCode(code)
                                    }
                                }}
                            >
                                <SearcherPopup editor={editor} {...searchElement} />
                                {useMemo(() => <Editable
                                    renderElement={renderElement}
                                    renderLeaf={renderLeaf}
                                    decorate={decorate}
                                    className="font-mono"
                                    spellCheck={false}
                                    autoCorrect={false}
                                    placeholder={t.canvas.placeholder()}
                                    onKeyDown={(event) => {
                                        onKeyDown(event, editor)
                                        setEventDown(event)
                                        setEvent(event)
                                    }}
                                    onKeyUp={(event) => {
                                        setEventUp(event)
                                        setEvent(event)
                                    }}
                                />, [current.name == 'parsing'])}
                            </Slate>
                        </KeysContext.Provider>
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
