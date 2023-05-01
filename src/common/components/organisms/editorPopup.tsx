import React, { HTMLAttributes, useState } from "react";
import CodeEditor from "./codeEditor";
import { useTranslation } from "@modules/i18n";
import { ChevronDownIcon, ReplyIcon } from "@heroicons/react/outline";
import { useAtom } from "jotai";
import { menuServiceAtom } from "@core/atoms/smith";
import { HistoryEditor } from "slate-history";

export interface EditorPopupProps extends HTMLAttributes<HTMLDivElement> {

}

const EditorPopup = (props: EditorPopupProps) => {
    const [isOpen, setOpen] = useState(false);
    const { t } = useTranslation()
    const [current, send] = useAtom(menuServiceAtom)


    const exit = (e) => {
        if (e.target === e.currentTarget) {
            setOpen(false)
        }
    }

    return (
        <div {...props}>
            <button
                // preset="filled"
                className={`toolbox-btn ${isOpen ? 'btn-active' : ''}`}
                onClick={() => setOpen(!isOpen)}
            >
                {t.canvas.code()}
            </button>
            <div className={`p-2 bg-transparent lg:hidden z-[999] w-full h-[50vh] ${isOpen ? 'fixed bottom-0 left-0' : 'hidden'}`}>
                <CodeEditor
                    className="h-full"
                    toolbar={editor => <div className="flex items-start">
                        <button
                            aria-label={t.canvas.undo()}
                            tabIndex={0}
                            className={`btn btn-outline btn-circle btn-sm mr-2`}
                            onClick={() => HistoryEditor.undo(editor)}>
                            <ReplyIcon className="w-5" />
                        </button>
                        <button
                            className="btn btn-outline btn-circle btn-sm"
                            tabIndex={0}
                            onClick={() => setOpen(!isOpen)}
                            aria-label={t.canvas.undo()}
                        >
                            <ChevronDownIcon className="w-6" />
                        </button>
                    </div>}
                />
            </div>
        </div >
    );
}

export default EditorPopup;