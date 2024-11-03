function add(x, y) { return (x + y) }
function multiply(x, y) { return x*y }
function divide(x, y) { return x/y }
function power(x, y) { return x**y }
function set(x, y) { 
    registeredVariables[y] = x
    return x
}
function greater(x, y) { return (x > y) ? 1 : 0 }
function equalto(x, y) { return (x == y) ? 1 : 0 }
function then(x, y) { 
    if (x > 0) { 
        evaluate(debracket(y))
    } 
    return x
}

var registeredOperators = {
    "+": "@add" /* add */,
    "-": "# + ( -1 * ## )" /* subtract*/,
    "*": "@multiply" /* multiply */,
    "/": "@divide" /* multiply */,
    "^": "@power",
    "=": "@set" /* set value */,
    ">": "@greater",
    "<": "( # > ## ) or ( # =? ## ) =? 0",
    "=?": "@equalto",
    "then": "@then",
    "abs": "( ( # ^ 2 ) ^ 0.5 ) * ##",
    "&&": "( # * ## ) =? 1",
    "and": "# && ##",
    "or": "( # + ## ) > 0"
}

// +3 1 = + 1 + 1 + 1

const restrictedNamespaces = [
    "#",
    "##",
    "true",
    "false"
]
// operations that should just receive the string argument, not its evaluated form
const opsPassRaw = [
    "=",
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

var errorLog = ""
function raiseError(type, hint) {
    document.getElementById("errors").innerHTML += `<div class="error">${type + "<br>" + hint}</div>`
}
var outputLog = ""
function pushToOut(x) {
    outputLog += `${x}`
    document.getElementById("out").innerText = outputLog
}

function debracket(chunk) {
    if (!chunk.includes("(") && !chunk.includes(")")) {
        return chunk.includes(" ") ? chunk.split(" ").filter(x => x.trim() != "") : chunk
    }
    let debracketed = []
    let running = ""
    let numOpen = 0
    let numClosed = 0
    for (let char of chunk.split(" ")) {
        char = char.trim()
        if (char == "(") {
            numOpen++
        } else if (char == ")") {
            numClosed++
        }

        if (numOpen == numClosed) {
            let inner = (running + char).trim()
            if (inner.length > 0) {
                debracketed.push(inner == chunk ? debracket(inner.slice(1, inner.length - 1)) : debracket(inner))
            }
            numOpen = 0
            numClosed = 0
            running = ""
        } else {
            running += char + " "
        }
    }
    return debracketed
}

function evaluate(chunk) {
    if (typeof chunk === "string") {
        chunk = chunk.trim()
        if (!isNaN(chunk)) {
            expr = chunk
            return parseFloat(expr)
        } else {
            if (Object.keys(registeredVariables).includes(chunk)) {
                return evaluate(debracket(`${registeredVariables[chunk]}`))
            } else {
                registeredVariables[chunk] = 0
                return 0
            }
        }
    }
    let lastResult = parseFloat(evaluate(chunk[0]))
    for (let i = 1; i < chunk.length; i++) {          
        if (i % 2 == 1) {
            if (Object.keys(registeredOperators).includes(chunk[i])) {
                let op = registeredOperators[chunk[i]]
                let secondArg = opsPassRaw.includes(chunk[i]) ? chunk[i + 1] : parseFloat(evaluate(chunk[i+1]))
                if (op.startsWith("@")) {
                    let opfunc = window[op.slice(1)]
                    lastResult = opfunc(lastResult, secondArg)
                } else {
                    registeredVariables["#"] = lastResult
                    registeredVariables["##"] = secondArg
                    lastResult = evaluate(debracket(op))
                }
            } else {
                raiseError("OperatorNotFound", `Invalid operator [${chunk[i]}].`)
            }
        }
    }

    if (registeredVariables["out"] != null) {
        pushToOut(registeredVariables["parse-out"] == 0 ? registeredVariables["out"] : String.fromCharCode(registeredVariables["out"]))
        registeredVariables["out"] = null
    }

    return lastResult
}

// Start coding here
code = ``

lines = code.split("\n")

// Parentheses Preprocessor
for (line of lines) {
    output = evaluate(debracket(line))
}

console.log("Hello World!".split("").map(x => x.charCodeAt(0)))