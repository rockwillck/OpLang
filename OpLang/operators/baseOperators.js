function add(x, y) { return (x + y) }

function multiply(x, y) { return x * y }

function divide(x, y) { return x/y }

function power(x, y) { return x**y }

function set(x, y) { 
    if (restrictedNamespaces.filter(x => {
       return (x.endsWith("*") && y.startsWith(x.slice(0, x.length - 1))) || (x == y)
    }).length > 0) {
        raiseError("RestrictedNamespace", `Restricted namespace [${y}]`)
    } else {
        registeredVariables[y] = x
    }
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

