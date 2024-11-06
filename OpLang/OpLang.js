class OpLang {
    static runCode(headers, code) {
        document.getElementById("errors").innerHTML = ""
        document.getElementById("out").innerText = ""
        globalVarsInit()
        let lines = headers.split("\n").map(l => l.trim())
        let newOps = lines.map(x => x.split(":").map(y => y.trim()))
        for (let op of newOps) {
            if (op[0].trim() != "") {
                registeredOperators[op[0]] = op[1]
            }
        }

        let ls = code.split("\n").map(l => l.trim())
        
        for (let line of ls) {
            evaluate(pemdas_preprocessor(debracket(line)))
            curLine++
        }
    }

    static run(name) {
        fetch(`${name}.oph`).then(
            x => x.text()
        ).then(
            hs => {
                fetch(`${name}.opl`).then(
                    x => x.text()
                ).then(
                    code => {
                        this.runCode(hs, code)
                    }
                )
            }
        )
    }

    static runSnippet(s, h) {
        this.runCode(h, s)
    }
}