//OPERATIONS
var view = document.getElementById("view");
var circumference = document.getElementById("circumference");
var circumferenceA = document.getElementById("circumferenceA");
var radius = document.getElementById("radius");
var radiusA = document.getElementById("radiusA");
var diameter = document.getElementById("diameter");
var diameterA = document.getElementById("diameterA");
var rectside = document.getElementById("rectside");
var rectside2 = document.getElementById("rectside2");
var rectsideA = document.getElementById("rectsideA");
const resultList = [];
const categories = ["scalc", "areaC", "areaR", "areaD", "areaSQ"];
function runpow(expression) {
    let expr2 = [];
    if (!expression.includes("^")) {
        return expression;
    }
    while (expression.includes("^")) {
        for (let i = 0; i < expression.length; i++) {
            if (expression[i + 1] == "^") {
                expr2.push(expression[i] ** expression[i + 2]);
                if (i + 3 < expression.length) {
                    for (let a = i + 3; a < expression.length; a++) {
                        expr2.push(expression[a]);
                    }
                }
                break;
            } else {
                expr2.push(expression[i]);
            }
        }
        expression = expr2;
        expr2 = [];
    }
    return expression;
}

function rundiv(expression) {
    let expr2 = [];
    if (!expression.includes("/")) {
        return expression;
    }
    while (expression.includes("/")) {
        for (let i = 0; i < expression.length; i++) {
            if (expression[i + 1] == "/") {
                expr2.push(expression[i] / expression[i + 2]);
                if (i + 3 < expression.length) {
                    for (let a = i + 3; a < expression.length; a++) {
                        expr2.push(expression[a]);
                    }
                }
                break;
            } else {
                expr2.push(expression[i]);
            }
        }
        expression = expr2;
        expr2 = [];
    }
    return expression;
}

function runmult(expression) {
    let expr2 = [];
    if (!expression.includes("*")) {
        return expression;
    }
    while (expression.includes("*")) {
        for (let i = 0; i < expression.length; i++) {
            if (expression[i + 1] == "*") {
                expr2.push(expression[i] * expression[i + 2]);
                if (i + 3 < expression.length) {
                    for (let a = i + 3; a < expression.length; a++) {
                        expr2.push(expression[a]);
                    }
                }
                break;
            } else {
                expr2.push(expression[i]);
            }
        }
        expression = expr2;
        expr2 = [];
    }
    return expression;
}

function runplus(expression) {
    let expr2 = [];
    if (!expression.includes("+")) {
        return expression;
    }
    while (expression.includes("+")) {
        for (let i = 0; i < expression.length; i++) {
            if (expression[i + 1] == "+") {
                expr2.push(expression[i] + expression[i + 2]);
                if (i + 3 < expression.length) {
                    for (let a = i + 3; a < expression.length; a++) {
                        expr2.push(expression[a]);
                    }
                }
                break;
            } else {
                expr2.push(expression[i]);
            }
        }
        expression = expr2;
        expr2 = [];
    }
    return expression;
}

//PARSERS
function brackclear(expression) {
    let lis = expression.split("");
    let expr2 = [];
    let expr3 = [];
    let pos1 = 0;
    let pos2 = 0;
    let extrabrack = 0;
    if (lis.includes("(")) {
        for (let i = 0; i < lis.length; i++) {
            if (lis[i] == "(") {
                pos1 = i;
                for (let a = i; a < lis.length; a++) {
                    if (lis[a] == "(") {
                        extrabrack++;
                    }
                    if (lis[a] == ")") {
                        pos2 = a;
                        if (extrabrack == 0) {
                            break;
                        } else {
                            extrabrack--;
                        }
                    }
                }
                break;
            }
        }
        for (let i = 0; i < pos1; i++) {
            expr2.push(lis[i]);
        }
        if (pos1 >= 1) {
            if (!["-", "+", "/", "*", "^", "("].includes(lis[pos1 - 1])) {
                expr2.push("*");
            }
        }
        for (let i = pos1 + 1; i < pos2; i++) {
            expr3.push(lis[i]);
        }
        expr2.push(String(calculate(expr3.join(""))));
        if (pos2 + 1 < lis.length) {
            if (!["-", "+", "/", "*", "^", "("].includes(lis[pos2 + 1])) {
                expr2.push("*");
            }
            for (let i = pos2 + 1; i < lis.length; i++) {
                expr2.push(lis[i]);
            }
        }
        expr2 = brackclear(expr2.join(""));
        return expr2;
    } else {
        return lis;
    }
}

function minclear(expression) {
    let expr2 = [];
    if (expression.includes("-")) {
        for (let i = 0; i < expression.length; i++) {
            if (expression[i] == "-") {
                expression[i + 1] = expression[i] + expression[i + 1];
                if (!["+", "/", "*", "^"].includes(expression[i - 1])) {
                    if (i > 0) {
                        expression[i] = "+";
                    } else {
                        expression[i] = null;
                    }
                } else {
                    expression[i] = null;
                }
            }
        }
    }
    for (let i = 0; i < expression.length; i++) {
        if (expression[i] == null) {
        } else if (!["+", "/", "*", "^"].includes(expression[i])) {
            expr2.push(parseFloat(expression[i]));
        } else {
            expr2.push(expression[i]);
        }
    }
    return expr2;
}

function digits(expression) {
    let expr2 = [];
    expr2[0] = "";
    let q = 0;
    let justnum = false;
    for (let i = 0; i < expression.length; i++) {
        if (!["-", "+", "/", "*", "^"].includes(expression[i])) {
            expr2[q] += expression[i];
            justnum = true;
        } else {
            if (justnum) {
                justnum = false;
                expr2.push("");
                q++;
            }
            expr2[q] += expression[i];
            expr2.push("");
            q++;
        }
    }
    return expr2;
}

//Calculator
function calculate(expression) {
    expression = brackclear(expression).join("");
    expression = digits(expression);
    expression = minclear(expression);
    expression = runpow(expression);
    expression = runmult(expression);
    expression = rundiv(expression);
    expression = runplus(expression);
    return expression;
}
function display(result) {
    expr = String(result[0]);
    if (/e-[\d]+/g.test(expr)) {
        placement = /e-[\d]+/g.exec(expr);
        num = placement[0].slice(2, placement[0].length);
        expr = expr.replace(/e-[\d]+/g, "/10^" + num);
    } else if (/e+[\d]+/g.test(expr)) {
        placement = /e+[\d]+/g.exec(expr);
        num = placement[0].slice(2, placement[0].length);
        expr = expr.replace(/e+[\d]+/g, "*10^" + num);
    }
    view.value = expr;
}

//HTML
// function clr() {
//     view.value = null;
// }
// function dis(char) {
//     view.value += char;
// }
// function popit() {
//     view.value = view.value.slice(0, -1);
// }
function solve() {
    let expression = view.value;
    try {
        display(calculate(expression));
        resultList.push(expression);
    } catch (err) {
        display(String(err));
    }
}
var _active = "scalc";
function active(id) {
    _active = id;
    categories.forEach((id) => {
        document.querySelector("#" + id).classList.add("hidden");
    });
    document.querySelector("#" + id).classList.remove("hidden");
}
function execute() {
    switch (_active) {
        case "scalc":
            solve();
            break;
        case "areaC":
            areafromcirc();
            break;
        case "areaR":
            areafromrad();
            break;
        case "areaD":
            areafromdia();
            break;
        case "areaSQ":
            areafromside();
            break;
    }
}
function areafromcirc() {
    circum = parseFloat(circumference.value);
    r = circum / Math.PI / 2;
    circumferenceA.value = Math.PI * Math.pow(r, 2);
}
function areafromrad() {
    rad = parseFloat(radius.value);
    radiusA.value = Math.PI * Math.pow(rad, 2);
}
function areafromdia() {
    dia = parseFloat(diameter.value);
    r = dia / 2;
    diameterA.value = Math.PI * Math.pow(r, 2);
}
function areafromside() {
    a = parseFloat(rectside.value);
    b = parseFloat(rectside2.value);
    rectsideA.value = a * b;
}
