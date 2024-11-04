class OpLang {
    constructor(projectName) {
        this.name = projectName
    }
    run() {
        fetch(`${this.name}.oph`).then(
            x => x.text()
        ).then(
            headers => {
                let lines = headers.split("\n").map(l => l.trim())
                let newOps = lines.map(x => x.split(":").map(y => y.trim()))
                for (let op of newOps) {
                    if (op[0].trim() != "") {
                        registeredOperators[op[0]] = op[1]
                    }
                }

                fetch(`${this.name}.opl`).then(
                    x => x.text()
                ).then(
                    code => {
                        let lines = code.split("\n").map(l => l.trim())
                        
                        for (let line of lines) {
                            evaluate(pemdas_preprocessor(debracket(line)))
                            curLine++
                        }
                    }
                )
            }
        )
    }
}