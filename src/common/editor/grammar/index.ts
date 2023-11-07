import { jcSemantics, jcGrammar } from "./grammar"
import "./changeParamsSlate"
import "./splitStatements"
import { ChangeParamsSlateFunc } from "./changeParamsSlate"
import { SplitStatementsFunc } from "./splitStatements"
import { MatchResult } from "ohm-js"

export {
    jcSemantics,
    jcGrammar,
}

export interface JCDict {
    changeParamsSlate: ChangeParamsSlateFunc,
    splitStatements: SplitStatementsFunc,
}

export const jcMatcher = jcGrammar.matcher()

export function getJC(code: string) {
    // jcMatcher.setInput(code)
    // const matchResult = jcMatcher.match()
    const matchResult = jcGrammar.match(code)
    const validParse = matchResult.succeeded()
    const dict = validParse ? jcSemantics(matchResult) : {}
    return [validParse, dict, matchResult] as [boolean, JCDict, MatchResult]
}