import { useState } from "react";
import { linkMd } from "@components/editor/autolinker/autolinker-grammar";
import { useHotkeys } from "@udecode/plate-headless";
import { useAtom, useSetAtom } from "jotai";
import { linkActiveAtom, linkPropsAtom } from "./common";

export const AutolinkerLeaf = (props) => {
    let { children, leaf, attributes, ...rest } = props
    const { text, type = {}, pos, content } = leaf
    // console.log(props)

    const [focus, setFocus] = useAtom(linkActiveAtom)
    const setProps = useSetAtom(linkPropsAtom as any)
    const [ctrl, setCtrl] = useState(false)

    // console.log(keyEvent, props, focus)

    useHotkeys('ctrl', (e) => setCtrl(true), {
        keydown: true, enableOnContentEditable: true,
    });
    useHotkeys('ctrl', (e) => setCtrl(false), {
        keyup: true, enableOnContentEditable: true,
    });

    let linkcontent = content
    let href = content
    if (leaf['email-link'] && href.indexOf('mailto:') != 0) {
        href = 'mailto:' + href;
    } else if (leaf['md-link']) {
        // Markdown
        var match = content.match(linkMd);

        href = match[2];
        linkcontent = match[1];
    }

    const showLink = ctrl && focus
    const openLink = () => window.open(href, "_blank", "noopener,noreferrer");

    return <span
        className="relative"
        onMouseEnter={() => { setFocus(true); setProps({ ...pos, url: href }) }}
        onMouseLeave={() => setFocus(false)}
    >
        <a
            {...attributes}
            className={`link ${showLink ? 'cursor-pointer font-bold' : 'cursor-auto'}`}
            href={href}
            target="_blank"
            onClick={() => {
                if (showLink)
                    openLink()
            }}
        >{children}</a>
    </span>
}