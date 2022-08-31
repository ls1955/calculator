const previousOperationScreen = document.querySelector("#previous-operation-screen");
const resultScreen = document.querySelector("#result-screen");
const numButtons = Array.from(document.querySelectorAll(".number-button"));
const decimalButton = document.querySelector(".decimal-button");
const operatorButtons = Array.from(document.querySelectorAll(".operator-button"));
const equalButton = document.querySelector(".equal-button");
const backspaceButton = document.querySelector(".backspace-button");
const clearButton = document.querySelector(".clear-button");

const keyBoardSfx = document.querySelector("audio");
keyBoardSfx.volume = 0.2;

let operand1 = 0;
let operand2 = 0;
let operation = "";
let needCleanScreen = false;

function init(){
    operand1 = 0;
    operand2 = 0;
    operation = "";
    needCleanScreen = false;
};

numButtons.forEach((numButton)=>{
    numButton.addEventListener("click", ()=>{
        if(needCleanScreen){
            resultScreen.textContent = "";
            needCleanScreen = false;
        }

        addNumToScreen(numButton.textContent);
    });
});

decimalButton.addEventListener("click", ()=>{
    addDecimalToScreen();
});

operatorButtons.forEach((operatorButton)=>{
    operatorButton.addEventListener("click",()=>{
        evaluate(operatorButton.textContent);
    });
});

equalButton.addEventListener("click", ()=>{
    calculateResult();
});

clearButton.addEventListener("click", ()=>{
    init();
    resultScreen.textContent = "";
});

backspaceButton.addEventListener("click", ()=>{
    resultScreen.textContent = resultScreen.textContent.slice(0, -1);
});

window.addEventListener("keydown",(event)=>{
    const {key} = event;

    if(key >= 0 || key <= 9){
        if(needCleanScreen){
            resultScreen.textContent = "";
            needCleanScreen = false;
        }

        addNumToScreen(key);
    }else if(key === "."){
        addDecimalToScreen();
    }else if(key === "+" || key === "-" || key === "*" || key === "/"){
        evaluate(key);
    }else if(key === "Enter"){
           calculateResult();
    }else if(key === "Backspace"){
        resultScreen.textContent = resultScreen.textContent.slice(0, -1);
    }
});

function addNumToScreen(num){
    if(needCleanScreen){
        resultScreen.textContent = "";
    }else if(resultScreen.textContent.length > 3){
        return;
    }

    resultScreen.textContent += num;
};

function addDecimalToScreen(){
    if(resultScreen.textContent.includes(".")) return;

    resultScreen.textContent += ".";
};

function addOperatorToScreen(operator){
    resultScreen.textContent += operator;
};

function evaluate(operator){
    if(operation !== ""){
        operand2 = resultScreen.textContent;
        operand1 = operate(operation, operand1, operand2);
        resultScreen.textContent = operand1;
    }

    operand1 = resultScreen.textContent;
    operation = operator;
    addOperatorToScreen(operator);
    needCleanScreen = true;
};

function calculateResult(){
    if(operand1 === 0 || operation === ""){
        return;
    }

    operand2 = resultScreen.textContent;

    if(operand2 === "0" && operation === "/"){
        resultScreen.textContent = "ERROR";
        init();
        needCleanScreen = true;
        return;
    }

    resultScreen.textContent = operate(operation, operand1, operand2);
    needCleanScreen = true;
};

function operate(operator, num1, num2){
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    let result = 0;

    if(operator === "+"){
        result = (num1 + num2);
    }else if(operator === "-"){
        result = (num1 - num2);
    }else if(operator === "*"){
        result = (num1 * num2);
    }else if(operator === "/"){
        result = (num1 / num2);
    }

    init();
    if(result > 9999999){
        result = "ERROR";
    }
    return result;
};