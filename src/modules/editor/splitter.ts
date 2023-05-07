
export function splitLines(str: string): string[] {
    let tokens = []
    let f = 0
    let state = 'init'
    let c1 = 0, c2 = 0
    for (let i = 0; i < str.length; i++) {

        switch (state) {
            case 'init':
                if (str[i] == '/' && str[i + 1] == '*') {
                    state = 'lcomment'
                    i++
                    continue
                }
                if ('\'"'.includes(str[i]) && str[i - 1] != '\\') {
                    state = 'string'
                    continue
                }
                if (str[i] == '/' && str[i + 1] == '/') {
                    state = 'comment'
                    i++
                    continue
                }
                if (str[i] == '{') {
                    c1++
                    continue
                }
                if (c1 && str[i] == '}') {
                    c1--
                    continue
                }
                if (str[i] == '<' && str[i + 1] == '<') {
                    c2++
                    i++
                    continue
                }
                if (c2 && str[i] == '>' && str[i + 1] == '>') {
                    c2--
                    i++
                    continue
                }
                if (str[i] == ';' && c1 == 0 && c2 == 0) {
                    state = 'end'
                    continue
                }
                if (str[i] == '\n' && c1 == 0 && c2 == 0) {
                    state = 'pre-end'
                    continue
                }
                break;
            case 'lcomment':
                if (str[i] == '*' && str[i + 1] == '/') {
                    state = 'pre-end'
                    i++
                    continue
                }
                break
            case 'comment':
                if (str[i] == '\n') {
                    state = 'pre-end'
                    continue
                }
                break
            case 'string':
                if ('\'"'.includes(str[i]) && str[i - 1] != '\\') {
                    state = 'init'
                    continue
                }
                break;
            case 'pre-end':
                if (str[i] != '\n') {
                    state = 'end'
                    i--
                    i--
                    continue
                }
                break
            case 'end':
                tokens.push(str.slice(f, i))
                f = i + 1
                state = 'init'
                break
            default:
                console.log('error')
        }
    }

    return tokens
}
