import { ExternalLinkIcon } from "@heroicons/react/outline";
import { useTranslation } from "@modules/i18n";
import { TEditableProps, useEditorRef  } from "@udecode/plate-common";
import {useVirtualFloating,  getDefaultBoundingClientRect, getRangeBoundingClientRect} from "@udecode/plate-floating"
import { useAtomValue } from "jotai";
import { useCallback, useMemo, useState } from "react";
import { linkActiveAtom, linkPropsAtom } from "./common";

export const FloatingLink = (props: TEditableProps) => {
    const { t } = useTranslation()
    const linkActive = useAtomValue(linkActiveAtom)
    const linkProps = useAtomValue(linkPropsAtom)
    const [focus, setFocus] = useState(false)
    const editor = useEditorRef();

    const getBoundingClientRect = useCallback(() => {

        if (linkProps?.anchor && linkProps?.focus) {
            return getRangeBoundingClientRect(editor, {
                anchor: linkProps.anchor,
                focus: linkProps.focus,
            });
        }

        return getDefaultBoundingClientRect();
    }, [editor, linkProps]);
    // console.log(targerRange, getBoundingClientRect())

    const { update, style, refs } = useVirtualFloating({
        // editorId: editor.id,
        open: linkActive || focus,
        getBoundingClientRect,
        // ...floatingOptions,
    });

    // console.log(style)

    return <a
        href={linkProps?.url}
        target="_blank"
        contentEditable={false}
        // onClick={() => openLink()}
        className={`absolute text-sm px-1 rounded-sm bg-base-100 bottom-5 left-0 transition-opacity delay-300
            text-warning border-primary border no-underline hover:text-success text-center w-32  lg:w-48 h-6
            flex items-center justify-center
            hover:cursor-pointer select-none 
            `} //${focus ? 'opacity-100' : '-z-10 opacity-0 hidden'}
        ref={refs.setFloating}
        style={style}
        onMouseEnter={() => setFocus(true)}
        onMouseLeave={() => setFocus(false)}
    >
        {`${t.canvas.follow_link()}`}
        <ExternalLinkIcon className="w-4 inline-block mb-1 mx-1" />
        <span className="text-base-content hidden lg:inline">{`(${t.canvas.ctrl_click()})`}</span>
    </a>
}
