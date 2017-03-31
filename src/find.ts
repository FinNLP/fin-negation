import {SentenceResult} from "finnlp";

/**
 * The following are merely function
 * that finds a target token index
 * it would return -1 when it doesn't find one.
 * 
 * They are used as rules for the negations tokens.
 * for example: the "not" token negates it's parent.
 * while the token "lack" negates it's object.
 * 
 */


export function parent (i:number,sentence:SentenceResult):number {
	return sentence.deps[i].parent;
}

export function nextNoun (i:number,sentence:SentenceResult):number {
	return sentence.tags.findIndex((token,index)=>{
		return index > i && token.startsWith("N");
	});
}

export function parentNoun (i:number,sentence:SentenceResult):number {
	const parentIndex = sentence.deps[i].parent;
	if(parentIndex === -1) return -1;
	else if(sentence.tags[parentIndex].charAt(0) === "N") return parentIndex;
	else return -1;
}

export function parentsSubject(i:number,sentence:SentenceResult):number{
	const parentIndex = sentence.deps[i].parent;
	if(parentIndex === -1) return -1;
	else return sentence.deps.findIndex(({parent,label})=>{
		return parent === parentIndex && /SUBJ/.test(label);
	});
}

export function parentVerb (i:number,sentence:SentenceResult):number {
	const parentIndex = sentence.deps[i].parent;
	if(parentIndex === -1) return -1;
	else if(sentence.deps[parentIndex].type === "VP") return parentIndex;
	else return -1;
}

export function object (i:number,sentence:SentenceResult):number {
	return sentence.deps.findIndex((dep)=>{
		return /OB/.test(dep.label) && dep.parent === i;
	});
}

export function childCompliment (i:number,sentence:SentenceResult):number {
	return sentence.deps.findIndex((dep)=>{
		return /COMP/.test(dep.label) && dep.parent === i;
	});
}

export function siblingCompliment (i:number,sentence:SentenceResult):number {
	const parentIndex = sentence.deps[i].parent;
	return sentence.deps.findIndex((dep)=>{
		return /COMP/.test(dep.label) && dep.parent === parentIndex;
	});
}

export function itself (i:number,sentence:SentenceResult):number {
	return i;
}