import { HTMLAttributes, ReactNode, useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "@modules/i18n";

import prism from 'prismjs/components/prism-core.js';
import '@modules/editor/jessieCode'
import "prismjs/themes/prism-solarizedlight.min.css";
const { languages, tokenize } = prism;

// Import the Slate editor factory.
import { Element, Node, Descendant, Editor, setSelection } from 'slate'

// Import the Slate components and React plugin.
import { Slate, Editable, useSlateStatic } from 'slate-react'
import { HistoryEditor } from 'slate-history'
import { deserializeCode, serializeCode } from '@modules/editor/serializers'
import { normalizeTokens } from "@modules/editor/normalizeTokens";

// plugins
import { AutolinkerLeaf } from "@components/molecules/editor/autolinker";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai"
import { editorServiceAtom, savingServiceAtom } from "@core/atoms/smith";
import { changeAtom, changeCodeAtom, editorAtom, keyAtom, keyDownAtom, keyUpAtom, selectionAtom } from "@modules/editor/atoms";
import { colorInline } from "@modules/editor/plugins/colorinline";
import { autolinker } from "@modules/editor/plugins/autolinker";
import { ColorInlineLeaf } from "@components/molecules/editor/colorInline";
import { SearcherPopup } from "@components/molecules/editor/searcher";

export interface CodeEditor extends HTMLAttributes<HTMLDivElement> {
    // code: string;
    toolbar?: (editor: Editor) => ReactNode
    footer?: (editor: Editor) => ReactNode
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
    const editor = useSlateStatic() //TODO: implement line number

    // console.log(props)
    switch (element.type) {
        case 'paragraph':
            return <div className={`border-base-300 border-t first:border-t-0 relative ${element.error ? 'border-error border-r-4' : ''}`} {...attributes}>
                {children}
            </div>
        case 'code-line':
            return <div className={`relative`} {...attributes}>
                {children}
            </div>
        default:
            const Tag = editor.isInline(element) ? 'span' : 'div'
            return <Tag {...attributes}>{
                children}
            </Tag>
    }
}


const decorate = ([blockNode, blockPath]) => {

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
}

const updateEditor = (state) => ['parsing', 'initializing'].includes(state)
const updateAtom = atom(0)
let timer = null // not concurrent
const CodeEditor = ({ className, toolbar, footer, ...rest }: CodeEditor) => {
    const { t } = useTranslation()

    // machines
    const send = useSetAtom(editorServiceAtom)

    const editor = useAtomValue(editorAtom)
    // const initialValue = useMemo(() => deserializeCode(``), [])
    const initialValue: Descendant[] = [{
        type: 'paragraph',
        children: [{
            type: 'code-line',
            children: [{ text: '' }]
        }]
    }]

    // console.log(initialValue)

    useEffect(() => {
        send('INIT')

        // return () => {
        //     send(RESET)
        // }
    }, [])

    // for update on parsing
    useAtomValue(updateAtom)
    // useAtom(useMemo(() => atom((get) => get(editorServiceAtom).context.counter), []))

    // FSM actions
    const setActualCode = useCallback((code) => send({ type: "CODE", value: code }), [])

    // key events
    const setKeyDownEvent = useSetAtom(keyDownAtom)
    const setKeyUpEvent = useSetAtom(keyUpAtom)
    const setKeyEvent = useSetAtom(keyAtom)

    const setChangeCode = useSetAtom(changeCodeAtom)
    const setSelection = useSetAtom(selectionAtom)
    const setChange = useSetAtom(changeAtom)

    const changeClipboardContent = useCallback((event) => {
        const sel = serializeCode(Editor.fragment(editor, editor.selection))
        event.clipboardData.setData('text/plain', sel)
        event.preventDefault()
    }, [])

    return (
        <div className={`border border-neutral bg-base-100 p-2 flex flex-col relative ${className || ''}`} {...rest}>
            <div className="absolute top-0 right-0 mt-2 mr-6 flex z-10 opacity-50">
                {toolbar?.(editor)}
            </div>
            <div className="overflow-y-auto scrollbar-thin !scrollbar-w-[4px] scrollbar-track-base-100 scrollbar-thumb-base-content flex-1 mb-1">
                {typeof window != 'undefined' &&
                    <Slate
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

                                clearTimeout(timer)
                                timer = setTimeout(() => {
                                    const code = serializeCode(value)
                                    setActualCode(code)
                                    //     editor.children = deserializeCode(code) as Descendant[]
                                    //     setU(u + 1)
                                }, 1000)
                            } else {
                                setSelection({})
                            }
                        }}
                    >
                        {<>
                            <EditorUpdater editor={editor} />
                            <SearcherPopup editor={editor} />
                            <Editable
                                renderElement={ElementRender}
                                renderLeaf={LeafRender}
                                decorate={decorate}
                                disableDefaultStyles
                                className='outline-none whitespace-pre-wrap break-words min-h-full font-mono'
                                placeholder={t.canvas.placeholder()}
                                aria-label={t.common.code()}
                                onKeyDown={(event) => {
                                    event.stopPropagation()
                                    setKeyEvent(event)
                                    setKeyDownEvent(event)
                                    if (event.ctrlKey && event.key == 'z') {
                                        HistoryEditor.undo(editor)
                                    }
                                    if (event.ctrlKey && event.key == 'y') {
                                        HistoryEditor.redo(editor)
                                    }
                                }}
                                onKeyUp={(event) => {
                                    setKeyEvent(event)
                                    setKeyUpEvent(event)
                                }}
                                onCopy={changeClipboardContent}
                                spellcheck={false}
                                autocorrect={false}
                                autocapitalize={false}
                                autoComplete="false"
                            // spellCheck={false}
                            // autoCorrect={false}
                            // autoCapitalize={false}
                            />
                        </> as any}
                    </Slate>
                }
            </div>
            {footer?.(editor)}
        </div >
    );
}

const EditorUpdater = ({ editor }) => {
    const current = useAtomValue(editorServiceAtom)
    const sendSave = useSetAtom(savingServiceAtom)
    const [u, setU] = useAtom(updateAtom)
    const { code } = current.context

    useEffect(() => {
        if (updateEditor(current.name) && code != '') {
            // console.log(current.name, code)
            editor.children = deserializeCode(code) as Descendant[]
            setU(u + 1)
        }
    }, [current.name])

    useEffect(() => {
        if (code != '')
            sendSave({ type: 'SAVE', value: code })
    }, [code]);

    return <></>
}

export default CodeEditor;
