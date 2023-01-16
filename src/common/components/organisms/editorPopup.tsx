import React, { HTMLAttributes, useState } from "react";
import CodeEditor from "./codeEditor";
import { useTranslation } from "@modules/i18n";

export interface EditorPopupProps extends HTMLAttributes<HTMLDivElement> {

}

const EditorPopup = (props: EditorPopupProps) => {
    const [isOpen, setOpen] = useState(false);
    const { t } = useTranslation()

    const exit = (e) => {
        if (e.target === e.currentTarget) {
            setOpen(false)
        }
    }

    return (
        <div {...props}>
            <button
                // preset="filled"
                className={`btn ${isOpen ? 'btn-active' : ''}`}
                onClick={() => setOpen(!isOpen)}
            >
                {t.canvas.code()}
            </button>
            <div className={`p-2 bg-transparent lg:hidden z-[999] w-full h-[50vh] ${isOpen ? 'fixed bottom-0 left-0' : 'hidden'}`}>
                <CodeEditor className="h-full" />
            </div>
        </div >
    );
}

export default EditorPopup;