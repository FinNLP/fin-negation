/**
 * Negation tokens
**/
export const neg:{
	[key:string]:string
} = {
// 	token			pos
	"not": 			"RB",
	"n't":  		"RB",
	"'t":  			"RB",
	"no": 			"RB",
	"neither": 		"DT",
	"nor": 			"DT",
	"never": 		"RB",
	"non": 			"NN",
	"zero": 		"CD",
	"without": 		"IN",
	"except": 		"IN",
	"absent": 		"JJ",
	"unlike": 		"IN",
	"unable": 		"JJ",
	"unremarkable": "JJ",
	"unlikely": 	"JJ",
	"negative": 	"JJ",
	"hardly": 		"RB",
	"deny": 		"VB",
	"fail": 		"VB",
	"exclude": 		"VB",
	"lack": 		"NN",
	"absence": 		"NN",
	"none": 		"NN",
	"nothing": 		"NN"
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