import { HTMLAttributes, ReactNode, Suspense, useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "@modules/i18n";

import prism from 'prismjs/components/prism-core.js';
// import "prismjs/components/prism-clike";
// import "prismjs/components/prism-javascript";
import '@modules/editor/jessieCode'
import "prismjs/themes/prism-solarizedlight.min.css";

const { languages, tokenize } = prism;

// Import the Slate editor factory.
import { createEditor, Text, Element, Node, Descendant, Editor } from 'slate'

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'
import { withHistory } from 'slate-history'
import { deserializeCode, serializeCode } from '@modules/editor/serializers'
import { normalizeTokens } from "@modules/editor/normalizeTokens";

// plugins
import { AutolinkerLeaf, autolinker } from "@modules/editor/autolinker";
import { ColorInlineLeaf, colorInline } from "@modules/editor/colorInline";
import { SearcherPopup } from "@modules/editor/searcher";
import { useAtom, useSetAtom } from "jotai"
import { editorServiceAtom } from "@core/atoms/smith";
import { changeAtom, changeCodeAtom, keyAtom, keyDownAtom, keyUpAtom } from "@modules/editor/atoms";
import { RESET } from "jotai/utils";

export interface CodeEditor extends HTMLAttributes<HTMLDivElement> {
    // code: string;
    toolbar?: (editor: Editor) => ReactNode
};

const LeafRender = (props) => {
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

const CodeEditor = ({ className, toolbar, ...rest }: CodeEditor) => {
    const { t } = useTranslation()

    // machines
    const [current, send] = useAtom(editorServiceAtom)
    const { code, errorMsg } = current.context
    // console.log(code)
    // console.log(current.name)

    const editor = useMemo(() => withReact(withHistory(createEditor())), [])
    const initialValue = useMemo(() => deserializeCode(code), [])
    // console.log(initialValue)
    // console.log(current.name)

    const testRender = ['parsing', 'initializing'].includes(current.name)
    if (testRender)
        editor.children = deserializeCode(code) as Descendant[]

    useEffect(() => {
        send('INIT')

        // return () => {
        //     send(RESET)
        // }
    }, [])

    const decorate = useCallback(([blockNode, blockPath]) => {

        if (!Element.isElement(blockNode) || blockNode.type != 'paragraph') {
            return []
        }
        // console.log(blockNode, blockPath)

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
    const parseExecute = () => send('PARSE')
    const setActualCode = (code) => send({ type: "CODE", value: code })

    // key events
    const setKeyDownEvent = useSetAtom(keyDownAtom)
    const setKeyUpEvent = useSetAtom(keyUpAtom)
    const setKeyEvent = useSetAtom(keyAtom)

    const setChangeCode = useSetAtom(changeCodeAtom)
    const setChange = useSetAtom(changeAtom)

    return (
        <div className={`border border-secondary bg-base-100 p-2 flex flex-col relative ${className || ''}`} {...rest}>
            <div className="absolute top-0 right-0 mt-2 mr-6 flex z-10 opacity-50">
                {toolbar(editor)}
            </div>
            <div className="overflow-y-auto scrollbar-thin !scrollbar-w-[4px] scrollbar-track-base-100 scrollbar-thumb-base-content flex-1 mb-1">
                {typeof window != 'undefined' &&
                    <Slate
                        // <Suspense fallback={<textarea className="w-full h-full flex-1"></textarea>}>
                        editor={editor}
                        value={initialValue}
                        onChange={(value) => {
                            setChange(editor.operations)
                            const isAstChange = editor.operations.some(
                                op => 'set_selection' !== op.type
                            )
                            if (isAstChange) {
                                setChangeCode(value)
                                // Serialize the value and save the string value to Local Storage.
                                const code = serializeCode(value)
                                setActualCode(code)
                            }
                        }}
                    >
                        <SearcherPopup editor={editor} />
                        <Editable
                            renderElement={ElementRender}
                            renderLeaf={LeafRender}
                            decorate={decorate}
                            className="font-mono h-full"
                            spellCheck={false}
                            autoCorrect={false}
                            placeholder={t.canvas.placeholder()}
                            aria-label={t.common.code()}
                            onKeyDown={(event) => {
                                event.stopPropagation()
                                setKeyEvent(event)
                                setKeyDownEvent(event)
                            }}
                            onKeyUp={(event) => {
                                setKeyEvent(event)
                                setKeyUpEvent(event)
                            }}
                        />
                    </Slate>
                    // </Suspense>
                }
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
