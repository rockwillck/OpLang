var registeredOperators = {
    "+": "@add" /* add */,
    "-": "# + ( -1 * ## )" /* subtract*/,
    "*": "@multiply" /* multiply */,
    "/": "@divide" /* divide */,
    "^": "@power",
    "->": "@set" /* set value */,
    ">": "@greater",
    "<": "( # > ## ) or ( # =? ## ) =? 0",
    "=?": "@equalto",
    "then": "@then",
    "abs": "( ( # ^ 2 ) ^ 0.5 ) * ##",
    "&&": "( # * ## ) =? 1",
    "||": "( # + ## ) > 0",
    "and": "# && ##",
    "or": "# || ##"
}

const restrictedNamespaces = [
    "hash*",
    "true",
    "false"
]

// operations that should just receive the string argument, not its evaluated form
const opsPassRaw = [
    "->",
    "then"
]

var registeredVariables = {
    "pi": Math.PI,
    "#": 0,
    "##": 0,
    "out": null,
    "parse-out": 0,
    "true": 1,
    "false": 0,
}

var curLine = 1