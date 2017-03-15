import * as Fin from "finnlp";
import "../src/index";

var negation = new Fin.Run("no work left").negation();
console.log(negation);
var negation = new Fin.Run("I didn't leave any trace on the scene").negation();
console.log(negation);
var negation = new Fin.Run("That's not a good excuse").negation();
console.log(negation);
var negation = new Fin.Run("Well, he wasn't here only for few hours").negation();
console.log(negation);
var negation = new Fin.Run("You shouldn't run that fast").negation();
console.log(negation);
var negation = new Fin.Run("Don't send it just yet").negation();
console.log(negation);
var negation = new Fin.Run("That's really unlike you").negation();
console.log(negation);
var negation = new Fin.Run("There was zero initial statements.").negation();
console.log(negation);

