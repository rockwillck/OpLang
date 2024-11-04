var errorLog = ""
function raiseError(type, hint) {
    document.getElementById("errors").innerHTML += `<div class="error">${type + "<br>" + hint} :: Line ${curLine}</div>`
}
var outputLog = ""
function pushToOut(x) {
    outputLog += `${x}`
    document.getElementById("out").innerText = outputLog
}