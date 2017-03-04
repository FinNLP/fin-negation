import * as dict from "./dictionary";

import {Fin} from "finnlp";

/**
 * Expand namespace
**/
export namespace Fin {
	export interface FinReturn {
		negation:()=>boolean[][];
	}
}

/**
 * Calcualte negation
**/
export function negation(input:Fin.FinReturn){
	const calculateNegation = function () {
		const negated:boolean[][] = [];
		// initialize all with false
		input.tokens.forEach((sentenceTokens,sentenceIndex)=>{
			negated[sentenceIndex] = [];
			sentenceTokens.forEach((token,tokenIndex)=>{
				negated[sentenceIndex][tokenIndex] = false;
			});
		});
		input.tokens.forEach((sentence,sentenceIndex)=>{
			sentence.forEach((token,tokenIndex)=>{
				const negationMarkTag = dict.neg[token.toLowerCase()];
				if(input.tags[sentenceIndex][tokenIndex] === negationMarkTag) {
					const parentIndex = input.deps[sentenceIndex][tokenIndex].parent;
					// EXCEPTION: check if parent is counter negation mark:
					const parentToken = input.tokens[sentenceIndex][parentIndex];
					const parentTag = input.tags[sentenceIndex][parentIndex];
					if(dict.neg_neg[parentToken.toLowerCase()] === parentTag) return;
					// EXCEPTION: check sibilings and children for any counter negation
					const relatives = input.deps[sentenceIndex]
					.map((x,i)=>{
						return {
							parent:x.parent,
							originalIndex:i
						};
					})
					.filter((x)=>x.parent === parentIndex || x.parent === tokenIndex)
					.map((x)=>{
						return {
							tag:input.tags[sentenceIndex][x.originalIndex],
							token:input.tokens[sentenceIndex][x.originalIndex]
						};
					});
					for (var i = 0; i < relatives.length; i++) {
						const neg_negTag = dict.neg_neg[relatives[i].token.toLowerCase()];
						if(neg_negTag === relatives[i].tag) return;
					}
					// if you're here, it means that you're negated and
					// don't have any counter negation sibiling
					negated[sentenceIndex][parentIndex] = true;
				}
			});
		});
		return negated;
	};
	return Object.assign(input,{negation:calculateNegation});
}