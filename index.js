const resultScreen = document.querySelector("#result-screen");
const backspaceButton = document.querySelector(".backspace-button");
const clearButton = document.querySelector(".clear-button");
const operandButtons = Array.from(document.querySelectorAll(".operand-button"));
const decimalButton = document.querySelector(".decimal-button");
const operatorButtons = Array.from(document.querySelectorAll(".operator-button"));
const equalButton = document.querySelector(".equal-button");
const keySfx = document.querySelector("audio");
keySfx.volume = 0.2;

let operandFirst = 0;
let operandSecond = 0;
let currentOperator = "";
let needResetScreen = false;

function appendNumber(number){
    if(needResetScreen) resetScreen();
    else if(resultScreen.textContent.length >= 7) return;

    resultScreen.textContent += number;
};

function appendDecimal(){
    if(needResetScreen) resetScreen();
    else if(resultScreen.textContent.includes(".")) return;

    resultScreen.textContent += ".";
};

function setOperation(operator){
    if(currentOperator !== "") calculate();

    operandFirst = resultScreen.textContent;
    currentOperator = operator;
    needResetScreen = true;
};

function calculate(){
    if(currentOperator === "/" && operandSecond === "0"){
        resultScreen.textContent = "ERROR";
        return;
    }

    operandSecond = resultScreen.textContent;
    let result = operateNumber(currentOperator, operandFirst, operandSecond);
    resultScreen.textContent = roundNumber(result);
    init();
};

function operateNumber(operator, num1, num2){
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    switch(operator){
        case "+":{
            return (num1 + num2);
        }case "-":{
            return (num1 - num2);
        }case "*":{
            return (num1 * num2);
        }case "/":{
            if(num2 !== 0) return (num1 * num2);
            return null;
        }
    };
}

function roundNumber(number){
    return Math.round(number);
}

function deleteNumber(){
    resultScreen.textContent = resultScreen.textContent.slice(0, -1);
};

function resetScreen(){
    resultScreen.textContent = "";
    needResetScreen = false;
}

function init(){
    operandFirst = 0;
    operandSecond = 0;
    currentOperator = "";
    needResetScreen = true;
}

operandButtons.forEach((operandButton)=>{
    operandButton.addEventListener("click",()=>{
        appendNumber(operandButton.id);
    });
});
decimalButton.addEventListener("click", appendDecimal);
operatorButtons.forEach((operatorButton)=>{
    operatorButton.addEventListener("click",()=>{
        setOperation(operatorButton.textContent);
        resultScreen.textContent += operatorButton.textContent;
    });
});
equalButton.addEventListener("click", calculate);
backspaceButton.addEventListener("click", deleteNumber);
clearButton.addEventListener("click", ()=>{
    resetScreen();
    init();
});

window.addEventListener("keydown", ({key})=>{
    keySfx.currentTime = 0.115;
    keySfx.play();

    if(key >= 0 || key <= 9){
        appendNumber(key);
    }else if(key === "."){
        appendDecimal();
    }else if(key === "+" || key === "-" || key === "*" || key === "/"){
        setOperation(key);
        resultScreen.textContent += key;
    }else if(key === "Enter"){
        calculate();
    }else if(key === "Backspace"){
        deleteNumber();
    }
});