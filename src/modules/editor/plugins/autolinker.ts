import prism from "prismjs/components/prism-core.js"

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
