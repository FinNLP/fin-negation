import {SentenceResult} from "finnlp";
import * as f from "./find";

export interface TokenRule {
	type:string;
	find:Array<(index:number,sentence:SentenceResult)=>number>;
}

export const neg:{[key:string]:TokenRule} = {
	"not":{
		type:"RB",
		find:[f.parent]
	},
	"n't":{
		type:"RB",
		find:[f.parent]
	},
	"'t":{
		type:"RB",
		find:[f.parent]
	},
	"hardly":{
		type:"RB",
		find:[f.parent]
	},
	"never":{
		type:"RB",
		find:[f.parent]
	},
	"no":{
		type:"RB",
		find:[f.nextNoun]
	},
	"neither":{
		type:"D",
		find:[f.nextNoun]
	},
	"nor":{
		type:"D",
		find:[f.nextNoun]
	},
	"zero":{
		type:"C",
		find:[f.nextNoun,f.parentVerb]
	},
	"0":{
		type:"C",
		find:[f.nextNoun,f.parentVerb]
	},
	"without":{
		type:"I",
		find:[f.nextNoun]
	},
	"absence":{
		type:"N",
		find:[f.nextNoun]
	},
	"none":{
		type:"N",
		find:[f.parentVerb,f.parentsSubject]
	},
	"nothing":{
		type:"N",
		find:[f.parentVerb,f.parentsSubject]
	},
	"non":{
		type:"N",
		find:[f.parentVerb,f.parentsSubject]
	},
	"deny":{
		type:"V",
		find:[f.object,f.childCompliment]
	},
	"exclude":{
		type:"V",
		find:[f.object]
	},
	"lack":{
		type:"V",
		find:[f.object]
	},
	"unremarkable":{
		type:"J",
		find:[f.parentNoun,f.parentsSubject]
	},
	"absent":{
		type:"J",
		find:[f.parentNoun,f.parentsSubject]
	},
	"unlikely":{
		type:"J",
		find:[f.parentVerb,f.parentNoun]
	},
	"unlike":{
		type:"CASE",
		find:[f.parent]
	},
	"unable":{
		type:"J",
		find:[f.siblingCompliment,f.parentVerb]
	},
	"fail":{
		"type":"V",
		find:[f.childCompliment]
	}
};


/**
 * Counter negation tokens
**/
export const neg_neg:{
	[key:string]:string
} = {
	"only": 'RB',
	"just": 'RB',
	"solely": 'RB',
	"uniquely": 'RB',
	"exclusively": 'RB'
};