import prism from "prismjs/components/prism-core.js"

prism.languages['jc'] = prism.languages.extend('javascript', {
    'literal-property': {
        pattern: /((?:^|,|\<\<)[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
        lookbehind: true,
        alias: 'property'
    },
    'constant': /\b(?:\$board|LN2|LN10|LOG2E|LOG10E|PI|EULER|SQRT1_2|SQRT2)\b/

})

prism.languages.insertBefore('jc', 'operator', {
    'jc-punctuation': {
        pattern: /\<\<|\>\>/,
        alias: 'punctuation'
    }
})

// prism.languages.insertBefore('jc', 'operator', {
// });