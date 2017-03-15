import * as dict from "./dictionary";
import * as Fin from "finnlp";


declare module "finnlp" {
	export interface Run {
		negation:()=>boolean[][];
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
				const parentIndex = sentence.deps[tokenIndex].parent;
				const parentToken = sentence.tokens[parentIndex].toLowerCase();
				// has a parent as a counter negation
				if(dict.neg_neg[parentToken]) continue;
				// has a child or sibling as a couther negation
				if(sentence.deps.find((x,i)=>(x.parent !== parentIndex && x.parent !== tokenIndex) && (!!dict.neg_neg[sentence.tokens[i].toLowerCase()]))) continue;
				negated[sentenceIndex][parentIndex] = true;
			}
		}
	}
	return negated;
};