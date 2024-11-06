var registeredOperators

var restrictedNamespaces

// operations that should just receive the string argument, not its evaluated form
var opsPassRaw

var registeredVariables

var curLine

var hashtagId

var outputLog
var errorLog


function globalVarsInit() {
    registeredOperators = {
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

    restrictedNamespaces = [
        "hash*", // * means hash folllowed by any string
        "true", 
        "false"
    ]

    opsPassRaw = [
        "->",
        "then"
    ]

    registeredVariables = {
        "pi": Math.PI,
        "#": 0,
        "##": 0,
        "out": null,
        "parse-out": 0,
        "true": 1,
        "false": 0,
    }

    curLine = 1

    hashtagId = 0

    outputLog = ""
    errorLog = ""
}
globalVarsInit()