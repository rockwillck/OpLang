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
                raiseError("VariableNotRegistered", `Invalid variable name [${chunk}]`)
                return 0
            }
        }
    }
    let lastResult = parseFloat(evaluate(chunk[0]))
    for (let i = 1; i < chunk.length; i++) {          
        if (i % 2 == 1) {
            if (Object.keys(registeredOperators).includes(chunk[i])) {
                lastResult = runOp(chunk[i], chunk[i+1], lastResult)
            } else {
                let good = false
                for (let key of Object.keys(registeredOperators)) {
                    let reps = chunk[i].slice(key.length)
                    if (chunk[i].startsWith(key)) {
                        if (!isNaN(reps)) {
                            reps = parseInt(reps)
                            for (let c = 0; c < reps; c++) {
                                lastResult = runOp(key, chunk[i+1], lastResult)
                            }
                            good = true
                            break
                        } else if (Object.keys(registeredVariables).includes(reps)) {
                            reps = registeredVariables[reps]
                            for (let c = 0; c < reps; c++) {
                                lastResult = runOp(key, chunk[i+1], lastResult)
                            }
                            good = true
                            break
                        }
                    }
                }
                if (!good) {
                    raiseError("OperatorNotRegistered", `Invalid operator [${chunk[i]}]`)
                }
            }
        }
    }

    if (registeredVariables["out"] != null) {
        pushToOut(registeredVariables["parse-out"] == 0 ? registeredVariables["out"] : String.fromCharCode(registeredVariables["out"]))
        registeredVariables["out"] = null
    }

    return lastResult
}