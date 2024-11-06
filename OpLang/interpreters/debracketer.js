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