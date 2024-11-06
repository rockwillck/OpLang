function math_preprocessor(expr, symbol) {
    if (typeof expr === "string") {
        return expr
    }
    let output = []
    for (let i = 0; i < expr.length; i++) {
        let chunk = expr[i]
        if (chunk == symbol) {
            output.push(chunk)
            i++
            output.push(expr[i])
            let x = output[output.length - 3]
            let y = output[output.length - 1]
            output = output.slice(0, output.length - 3)
            output.push([math_preprocessor(x, symbol), symbol, math_preprocessor(y, symbol)])
        } else {
            if (i % 2 == 0) {
                output.push(math_preprocessor(chunk, symbol))
            } else {
                output.push(chunk)
            }
        }
    }
    return output
}

function pemdas_preprocessor(expr) {
    return math_preprocessor(
        math_preprocessor(
            math_preprocessor(
                math_preprocessor(
                    math_preprocessor(
                        debracket(expr), 
                        "^"), // E
                    "*"),  // M
                "/"),  // D
            "+"),  // A
        "-") // S
}