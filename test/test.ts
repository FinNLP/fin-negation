/// <reference path="../node_modules/@types/node/index.d.ts" />

import * as Fin from "finnlp";
import "../src/index";

function error (msg:string){
    console.error(msg);
    process.exit(1);
}

function assert (sentence:string, hasNegation:boolean, atIndex?:number){
    const result = new Fin.Run(sentence).negation();
    if((!hasNegation) && (!!result[0].find((x)=>x === true))) {
        console.log(result[0].find((x)=>x === true));;
        error(`❌ Failed: sentence "${sentence}" had negation while we were not expecting any.`);
    }
    else if(atIndex !== undefined && (result[0].findIndex((x)=>x === true) !== atIndex))
        error(`❌ Failed: sentence ${sentence} has negation at index ${result[0].findIndex((x)=>x === true)} but we were expecting it at index ${atIndex}`);
    else {
        console.log(`✅ Passed: ${sentence}`);
    }
}

assert("no work left",true,1);
assert("I didn't leave any trace on the scene",true,3);
assert("That's not a good excuse",true,5);
assert("Well, he wasn't here only for few hours",false);
assert("You shouldn't run that fast",true,3);
assert("Don't send it just yet",true,2);
assert("That's really unlike you",true,4);
assert("There was zero initial statements.",true,4);
console.log("All tests passed!");