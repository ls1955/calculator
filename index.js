const add = (num1, num2) => (num1 + num2);
const subtract = (num1, num2) => (num1 - num2);
const multiply = (num1, num2) => (num1 * num2);
const divide = (num1, num2) => (num1 / num2);
const operator = function(operand, num1, num2){
    let result = 0;
    switch(operand){
        case "+":{
            result = add(num1, num2);
            break;
        }case "-":{
            result = subtract(num1, num2);
            break;
        }case "*":{
            result = multiply(num1, num2);
            break;
        }case "/":{
            result = divide(num1, num2);
            break;
        }
    };
    return result;
};