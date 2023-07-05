import { HTMLAttributes, useCallback, useEffect, useState } from "react";
import CodeEditor from "@components/editor/editor";
import { useTranslation } from "@modules/i18n";
import { ChevronDownIcon, ExclamationIcon, ReplyIcon } from "@heroicons/react/outline";
import { useAtomValue, useSetAtom } from "jotai";
import { editorServiceAtom } from "@core/atoms/smith";
import { HistoryEditor } from "slate-history";
import { createPortal } from "react-dom";
import EditorError from "@components/atoms/editorError";
import { selectionAtom } from "@components/editor/common/atoms";

export interface EditorPopupProps extends HTMLAttributes<HTMLDivElement> {

}

const EditorDesktop = (props: EditorPopupProps) => {
    const [isOpen, setOpen] = useState(false);
    const [warning, setWarning] = useState(false);
    const { t } = useTranslation()

    const current = useAtomValue(editorServiceAtom)
    const send = useSetAtom(editorServiceAtom)
    const select = useAtomValue(selectionAtom)

    const parseExecute = useCallback(() => send('PARSE'), [])

    useEffect(() => {
        setTimeout(() => {
            // console.log('focus')
            document.getElementById('code-end').scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        }, 1000)
        setWarning(false)
    }, [select])

    return (
        <div {...props}>
            <div className="indicator">
                <span className={`indicator-item badge badge-error top-[.5rem] right-[.2rem] ${current.name == 'error' ? '' : 'hidden'}`}></span>
                <button
                    // preset="filled"
                    className={`btn btn-outline bg-base-100 ${isOpen ? 'btn-active' : ''}`}
                    onClick={() => setOpen(!isOpen)}
                >
                    {t.canvas.code()}
                </button>
            </div>
            {typeof document != 'undefined' &&
                createPortal(
                    <>
                        <div className={`p-2 bg-transparent lg:hidden z-20 w-full h-[50vh] ${isOpen ? 'absolute bottom-0 left-0' : 'hidden'}`}>
                            <CodeEditor
                                className="h-full"
                                toolbar={editor => <div className="flex items-start">

                                </div> as any}
                                footer={editor => <>
                                    <div className={`mb-2 z-10 ${warning ? '' : 'hidden'}`}>
                                        <EditorError />
                                    </div>
                                    <div className="flex items-center">
                                        <button onClick={parseExecute} className="btn btn-outline flex-1 mr-2">
                                            {t.canvas.run()}
                                        </button>
                                        <button
                                            className={`btn btn-outline btn-circle mr-2 transition-all
                                            ${warning ? 'animation-none' : ''}
                                            ${current.name == 'error' ? 'w-12 btn-error animate-tilt-shake' : 'btn-neutral w-0'}`}
                                            tabIndex={0}
                                            onClick={() => setWarning(!warning)}
                                            aria-label={t.canvas.warning()}
                                        >
                                            <ExclamationIcon className="w-6" />
                                        </button>
                                        <button
                                            aria-label={t.canvas.undo()}
                                            tabIndex={0}
                                            className={`btn btn-outline btn-primary btn-circle mr-2`}
                                            onClick={() => HistoryEditor.undo(editor)}>
                                            <ReplyIcon className="w-5" />
                                        </button>
                                        <button
                                            className="btn btn-outline btn-circle"
                                            tabIndex={0}
                                            onClick={() => setOpen(!isOpen)}
                                            aria-label={t.canvas.undo()}
                                        >
                                            <ChevronDownIcon className="w-6" />
                                        </button>
                                    </div>
                                </> as any}
                            />
                        </div>
                    </> as any, document.getElementsByClassName('drawer-content')[0])}
        </div >
    );
}

export default EditorDesktop;