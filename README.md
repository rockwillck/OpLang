# OpLang
A operational programming language
## Big Ideas
OpLang is called **Op**Lang because it is centered around **Op**erators.  
In OpLang, there are *no* functions and *no* classes. OpLang is neither a functional programming language nor an Object-Oriented programming language. It's an *operational* language.  
There is also only one core data type in OpLang - a number. No strings, no lists. To print text, you need to output ASCII codes. OpLang is not meant to build text applications.  
## Examples
The basic idea is simple:  
`1 + 2` returns `3`  
`5 / 3` returns `1.6666`  
The magic comes with the non-mathematical operators:  
`3 -> out` prints `3` to the console  
And because OpLang supports writing your own operators, both using the JavaScript backend and in OpLang itself, you can write things like:  
`ft : # * 12 + ##`  
and use it like:
`5 ft 2` to return `62`.
## Architecture
OpLang is written in JavaScript with a local web-based console, meaning it's portable and runs on any device that can run basic JavaScript. That's... basically everywhere.  
This also means OpLang is really easy to embed on the web. OpLang's JavaScript logic can be run entirely on the frontend - it truly is very lightweight - and because the output function is abstracted away, it can be modified to print to anywhere.  
### Files
In an OpLang project, the file structure is as follows:
```bash
.
│   PROJECT-NAME.oph
│   PROJECT-NAME.opl
│   icon.png
│   index.html
│   README.md
│   style.css
│
└───OpLang
    │   globalVars.js
    │   interpreter.js
    │   messaging.js
    │   OpLang.js
    │
    ├───operators
    │       baseOperators.js
    │       + other operators
    │
    └───preprocessors
            pemdas.js
            + other preprocessors
```
#### .opl
The .opl file is the main code file. It *must* share its name with your project.
#### .oph
The .oph file is the header file. It contains operator declarations. It must exist, even if it is empty.  
To write an operator in OpLang:
```
operator-symbol : # + ##
```
`#` is the argument *before* the operator and `##` is the argument *after* the operator.
#### Operator Files
Operator Files are used to define JavaScript functions that can be referenced in the .oph file. All operator functions must be in the form:
```javascript
function function_name(x, y) {
    return /* do something here */
}
```
To reference them in a .oph file, write:
```
operator-symbol : @function_name
```
#### Preprocessor Files
OpLang has no knowledge of order of operations, non-number data types, etc. So if we want to work with these things, we must handle them *before* OpLang scripts reach the interpreter. So, we use __preprocessors__.  
OpLang ships with a base `pemdas.js` preprocessor to implement basic order of operations.  
Every preprocessor is provided the "debracketed" chunks from an OpLang expression (see below about debracketing). A preprocessor is expected to return chunks in the same format, even if they are modified.
### Interpreter
The interpreter is made of three components: the debracketer, the operation runner, and the evaluator.  
The typical loop is:  
```
.___EVALUATOR__.
|              |       {
| DEBRACKETER  | ===== { OPERATION RUNNER 
|______________|       {
```
In other words, the `evaluator` is provided a `debracketed` expression, which is then put through the `operation runner`.  
#### Debracketer
While the evaluator and operation runner can be implemented in many ways, the debracketer is important for several parts of OpLang. For example, preprocessors receive debracketed expressions.  
The debracketer takes an expressions like `1 + ( 2 / 3 ) - ( 4 + ( 3 ^ 2 ) )` and returns
 ```javascript
[
    1,
    +, 
    [
        [
            2, 
            /, 
            3
        ], 
        - 
    ], 
    [ 
        [
            4, 
            +, 
            [
                3, 
                ^, 
                2
            ]
        ]
    ]
]
```
#### Evaluator
After `debracketing`, the evaluator takes the above chunks and evaluates recursively. The evaluator moves from left to right, so without the PEMDAS preprocessor, `1 + 2 * 3` would actually compute to `9`, not `7`. It's the preprocessor that groups it into `1 + ( 2 * 3 )` so that the computed value is correct.
#### Operation Runner
The `operation runner` is comparatively simple. Give it `a op b` and it'll check the registered operators for `op`, check the registered variables for `a` and `b`, then take `op(a, b)`.
### Base Operations
#### +
Adds x and y
#### -
Subtracts y from x
#### *
Multiplies x and y
#### /
Divides x and y
#### ^
Raises x to the yth power
#### ->
Sets y to x: `2 -> a`.
#### > / <
Compares x and y.
#### =?
Checks if x == y.
#### then
Evaluates y if x is true
#### abs
|x| * y
#### &&
1 if x == y == true, 0 otherwise
#### ||
1 if x == true or y == true, 0 if x == y == false
#### and / or
Aliases for && / ||
## Running OpLang
To run OpLang, clone this repository and serve its contents using any static file server. If you use Visual Studio Code, the Live Reload extension works well.
## Roadmap
OpLang is in a pre-alpha state right now, meaning it is not meant to be used.
### Preprocessors  
- [x] PEMDAS preprocessor
- [ ] String preprocessor
- [ ] Arrays preprocessor
### Tools
- [ ] Installer
- [ ] Launcher/runner
- [ ] Debugger
### Miscellaneous
- [ ] Multi-file projects
## Supporting the Project
You can contribute to the project by making pull requests.  
If you'd like to support me, as a developer, personally, I have a Buy Me a Coffee:  

<a href="https://www.buymeacoffee.com/rockwill"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=rockwill&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" /></a>

## License
This software is licensed under the Bok Choy General Software License. The full text of the license should be included below. If not, more information can be found at https://www.rockwill.dev/Bok-Choy-License/.
```
Bok Choy General Software License

Copyright (c) 2024 William Choi-Kim

This software and associated files (the "Software") may be used commercially, privately, and publicly. The Software may be modified in any way, without limitation. It may be distributed free of charge as is, but not distributed commerically without modifications to its functionality. Any distributed version of the Software must provide attribution to the Software in some way. Any distributed copy of the Software must abide by and include this license. The user is free to use, modify, and distribute the software under the aforementioned conditions.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```