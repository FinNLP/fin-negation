import {Fin} from "finnlp";
import {negation} from "../src/index";
Fin.addDetector(negation);
//console.log(Fin.detectors);
console.log((Fin.run("I do not only have any work left") as any).negation());
