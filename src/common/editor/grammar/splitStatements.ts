import { jcSemantics } from "./grammar"

jcSemantics.addOperation("splitStatements", {
    Program(directive, seList) {
        const out: string[] = []

        let prevEndIdx = 0;
        for (const se of seList.children) {
            const spaces = this.source.sourceString.slice(prevEndIdx, se.source.startIdx).trim();
            // console.log(se, spaces)
            if (!["", "\n"].includes(spaces)) {
                out.push(spaces)
            }
            out.push(se.sourceString.trim())
            prevEndIdx = se.source.endIdx;

        }
        const finalSpace = this.source.sourceString.slice(prevEndIdx, this.source.sourceString.length).trim()
        if (finalSpace != '')
            out.push(finalSpace)

        return out
    }
})

export type SplitStatementsFunc = () => string[]