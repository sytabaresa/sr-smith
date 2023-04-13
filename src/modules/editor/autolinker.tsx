import prism from "prismjs/components/prism-core.js"
import { useCallback, useContext, useEffect, useReducer, useState } from "react";
import { KeysContext } from "./keysContext";


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

export const LinkLeaf = (props) => {
    let { attributes, children, leaf, classes } = props
    const { text, type = {}, content, ...rest } = leaf
    const [focus, setFocus] = useState(false)
    const [ctrl, setCtrl] = useState(false)
    const { event } = useContext(KeysContext)


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

    const showLink = event.ctrlKey && focus
    // console.log(ctrl, focus, props)
    return <a
        className={`link ${showLink ? 'cursor-pointer font-bold' : 'cursor-auto'}`}
        href={href}
        onMouseEnter={() => setFocus(true)}
        onMouseLeave={() => setFocus(false)}
        onKeyDown={(event) => { console.log(event); setCtrl(event.ctrlKey) }}
        onKeyUp={(event) => setCtrl(event.ctrlKey)}
        target="_blank"
        onClick={() => {
            if (showLink)
                window.open(href, "_blank", "noopener,noreferrer");
        }}
    >{children}</a>
}
