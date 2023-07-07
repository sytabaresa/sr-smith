const states = {
    init: 0,
    lcomment: 1,
    comment: 2,
    string: 3,
    preEnd: 4,
    end: 5,
    preComment: 6,
    text: 7,
    postEnd: 8,
}
type valueof<T> = T[keyof T]

export function splitLines(str: string): [string[], boolean] {
    let tokens = []
    let f = 0
    let c1 = 0, c2 = 0
    let state: valueof<typeof states> = states.init
    let i = 0
    for (i = 0; i < str.length; i++) {
        // console.log(str[i], state, c1, c2)
        switch (state) {
            case states.init:
                if (str[i] == '\n' && c1 == 0 && c2 == 0) {
                    state = states.preComment
                    continue
                } else {
                    state = states.text
                    i--
                    continue
                }
                break;
            case states.text:
                if ('\'"'.includes(str[i]) && str[i - 1] != '\\') {
                    state = states.string
                    continue
                }
                if (str[i] == '/' && str[i + 1] == '*') {
                    state = states.lcomment
                    i++
                    continue
                }
                if (str[i] == '/' && str[i + 1] == '/') {
                    state = states.comment
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
                    state = states.end
                    i--
                    continue
                }
                break
            case states.preComment:
                if (str[i] == '/' && str[i + 1] == '*') {
                    state = states.lcomment
                    i++
                    continue
                }
                if (str[i] == '/' && str[i + 1] == '/') {
                    state = states.comment
                    i++
                    continue
                }
                if (str[i] != '\n') {
                    state = states.preEnd
                    i--
                    continue
                }
                break
            case states.lcomment:
                if (str[i] == '*' && str[i + 1] == '/') {
                    state = states.preEnd
                    i++
                    continue
                }
                break
            case states.comment:
                if (str[i] == '\n') {
                    state = states.preEnd
                    continue
                }
                break
            case states.string:
                if ('\'"'.includes(str[i]) && str[i - 1] != '\\') {
                    state = states.init
                    continue
                }
                break;
            case states.preEnd:
                if (str[i] != '\n') {
                    state = states.end
                    i -= 2
                    continue
                }
                break
            case states.end:
                i = str[i] == '\n' ? i : i + 1
                tokens.push(str.slice(f, i))
                f = str[i] == '\n' ? i + 1 : i
                state = states.postEnd
                break
            case states.postEnd:
                i--
                state = states.init
                break
            default:
                console.log('error')
        }
    }
    const rest = str.slice(f, i + 1)
    if (rest != '') {
        tokens.push(rest)
    }
    if (str.slice(-1)[0] == '\n' && state == states.postEnd) {
        tokens.push('')
    }
    if (i > 0 && ![states.preEnd, states.postEnd, states.preComment, states.comment].includes(state)) {
        return [tokens, false]
    }

    return [tokens, true]
}