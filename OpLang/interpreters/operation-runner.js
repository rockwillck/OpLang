function runOp(curChunk, nextChunk, lr) {
    let op = registeredOperators[curChunk]
    let secondArg = opsPassRaw.includes(curChunk) ? nextChunk : parseFloat(evaluate(nextChunk))
    if (op.startsWith("@")) {
        let opfunc = window[op.slice(1)]
        return opfunc(lr, secondArg)
    } else {
        registeredVariables[`hash${hashtagId}`] = lr
        registeredVariables[`hash${hashtagId + 1}`] = secondArg
        op = op.replaceAll("##", `hash${hashtagId + 1}`).replaceAll("#", `hash${hashtagId}`)
        hashtagId += 2
        return evaluate(debracket(op))
    }
}