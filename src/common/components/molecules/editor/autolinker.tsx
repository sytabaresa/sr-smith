import { useState } from "react";
import { useAtomValue } from "jotai";
import { keyAtom } from "@modules/editor/atoms";
import { useTranslation } from "@modules/i18n";
import { ExternalLinkIcon } from "@heroicons/react/outline";
import { linkMd } from "@modules/editor/plugins/autolinker";

export const AutolinkerLeaf = (props) => {
    let { children, leaf, classes } = props
    const { text, type = {}, content, ...rest } = leaf
    const { t } = useTranslation()
    const [focus, setFocus] = useState(false)
    const keyEvent = useAtomValue(keyAtom)
    // console.log(keyEvent, props, focus)

    let linkcontent = content
    let href = content
    if (classes.includes('email-link') && href.indexOf('mailto:') != 0) {
        href = 'mailto:' + href;
    } else if (classes.includes('md-link')) {
        // Markdown
        var match = content.match(linkMd);

        href = match[2];
        linkcontent = match[1];
    }

    const showLink = keyEvent?.ctrlKey && focus
    const openLink = () => window.open(href, "_blank", "noopener,noreferrer");

    return <span
        className="relative"
        onMouseEnter={() => setFocus(true)}
        onMouseLeave={() => setFocus(false)}
    >
        <a
            className={`link ${showLink ? 'cursor-pointer font-bold' : 'cursor-auto'}`}
            href={href}
            target="_blank"
            onClick={() => {
                setFocus(true)
                if (showLink)
                    openLink()
            }}
        >{children}</a>
        <a
            href={href}
            contentEditable={false}
            onClick={() => openLink()}
            className={`absolute text-sm px-1 rounded-sm bg-base-100 bottom-5 left-0 transition-opacity delay-300
                text-warning border-primary border no-underline hover:text-success text-center w-36 lg:w-60
                hover:cursor-pointer select-none ${focus ? 'opacity-100' : '-z-10 opacity-0 hidden'}
                `}>
            {`${t.canvas.follow_link()} `}
            <ExternalLinkIcon className="w-4 inline-block mb-1" />
            <span className="text-base-content hidden lg:inline">{`(${t.canvas.ctrl_click()})`}</span>
        </a>
    </span>
}