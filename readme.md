# Fin-negation

A negation detection for the Fin Natural language processor. It will exclude counter negated tokens.



## Installation

```
npm i --save fin-negation
```

## Usage

```typescript
import * as Fin from "finnlp";
import "fin-negation";

const inputNegated = "That's not good";
const inputCounterNegated = "I wasn't here for only few hours!";

const negatedIns = new Fin.Run(inputNegated).negation();
const counterNegatedIns = new Fin.Run(inputCounterNegated).negation();

console.log(negatedIns);
console.log(counterNegatedIns);

```

The above example will give you:

```javascript
[
    [
        false,
        false,
        false,
        true, // good is negated
    ]
]
```

```javascript
[
    [
        false,
        false,
        false,
        false,
        false
        // ... all are false
        // no negation should be detected
        // because it's been counter negated
        // by the "only" token
    ]
]
```