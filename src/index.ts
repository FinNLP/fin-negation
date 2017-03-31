import * as dict from "./dictionary";
import * as Fin from "finnlp";
import {Inflectors} from "en-inflectors";

declare module "finnlp" {
	export interface Run {
		negation:()=>boolean[][];
	}
}


// conjugate verbs and their rules
for (var index = 0; index < Object.keys(dict.neg).length; index++) {
	const token = Object.keys(dict.neg)[index];
	const rule = dict.neg[token];
	if(rule.type === "V") {
		dict.neg[new Inflectors(token).toGerund()] = rule;
		dict.neg[new Inflectors(token).toPast()] = rule;
		dict.neg[new Inflectors(token).toPastParticiple()] = rule;
		dict.neg[new Inflectors(token).toPresentS()] = rule;
	}
}


Fin.Run.prototype.negation = function(this:Fin.Run):boolean[][]{
	let negated:boolean[][] = [];
	for (var sentenceIndex = 0; sentenceIndex < this.sentences.length; sentenceIndex++) {
		negated[sentenceIndex] = [];
		const sentence = this.sentences[sentenceIndex];
		for (var tokenIndex = 0; tokenIndex < sentence.tokens.length; tokenIndex++) {
			if(!negated[sentenceIndex][tokenIndex]) negated[sentenceIndex][tokenIndex] = false;
			const token = sentence.tokens[tokenIndex].toLowerCase();
			if(dict.neg[token]) {
				const target = dict.neg[token].find.map(x=>x(tokenIndex,sentence)).find(x=>x !== -1);
				if(target !== undefined && target !== -1 && (!dict.neg_neg[sentence.tokens[target].toLowerCase()])) {
					negated[sentenceIndex][target] = true;
				}
			}
		}
	}
	return negated;
};