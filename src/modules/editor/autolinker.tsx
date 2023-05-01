import prism from "prismjs/components/prism-core.js"
import { useState } from "react";
import { useAtomValue } from "jotai";
import { keyAtom } from "./atom";
import { useTranslation } from "@modules/i18n";
import { ExternalLinkIcon } from "@heroicons/react/outline";


export const url = /\b([a-z]{3,7}:\/\/|tel:)[\w\-+%~/.:=&!$'()*,;@]+(?:\?[\w\-+%~/.:=?&!$'()*,;@]*)?(?:#[\w\-+%~/.:#=?&!$'()*,;@]*)?/;
export const email = /\b\S+@[\w.]+[a-z]{2}/;
export const linkMd = /\[([^\]]+)\]\(([^)]+)\)/;

// Tokens that may contain URLs and emails
var candidates = ['comment', 'url', 'attr-value', 'string'];

export function autolinker(grammar) {
    // Abort if grammar has already been processed
    if (!grammar || grammar['url-link']) {
        return grammar;
    }
    prism.languages.DFS(grammar, function (key, def, type) {
        if (candidates.indexOf(type) > -1 && !Array.isArray(def)) {
            if (!def.pattern) {
                def = this[key] = {
                    pattern: def
                };
            }

            def.inside = def.inside || {};

            if (type == 'comment') {
                def.inside['md-link'] = linkMd;
            }
            if (type == 'attr-value') {
                prism.languages.insertBefore('inside', 'punctuation', { 'url-link': url }, def);
            } else {
                def.inside['url-link'] = url;
            }

            def.inside['email-link'] = email;
        }
    });
    grammar['url-link'] = url;
    grammar['email-link'] = email;

    return grammar
}

export const AutolinkerLeaf = (props) => {
    let { attributes, children, leaf, classes } = props
    const { text, type = {}, content, ...rest } = leaf
    const { t } = useTranslation()
    const [focus, setFocus] = useState(false)
    const [tooltip, showTooltip] = useState(false)
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

    return <a
        className={`relative link ${showLink ? 'cursor-pointer font-bold' : 'cursor-auto'}`}
        href={href}
        onMouseEnter={() => setFocus(true)}
        onMouseLeave={() => {
            setFocus(false)
            showTooltip(false)
        }}
        target="_blank"
        onClick={() => {
            showTooltip(true)
            if (showLink)
                window.open(href, "_blank", "noopener,noreferrer");
        }}
    >
        <a
            href={href}
            onClick={() => window.open(href, "_blank", "noopener,noreferrer")}
            className={`absolute text-sm px-1 rounded-sm bg-base-100 bottom-5 transition-opacity delay-300
                text-warning border-primary border no-underline hover:text-accent-content text-center w-36 lg:w-60
                ${tooltip ? 'opacity-100' : 'opacity-0'}
                `}>
            {`${t.canvas.follow_link()} `}
            <span className="text-base-content hidden lg:inline">{`(${t.canvas.ctrl_click()})`}</span>
            <ExternalLinkIcon className="w-4 inline-block ml-1 mb-1" />
        </a>
        {children}
    </a >
}


//http://asdsa