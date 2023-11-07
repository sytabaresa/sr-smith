import * as ohm from 'ohm-js';
import grammar from './grammar.ohm?raw'

export const jcGrammar = ohm.grammar(grammar)

export const jcSemantics = jcGrammar.createSemantics()
