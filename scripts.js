function add(a,b){
    let aString = a.toString();
    let bString = b.toString();
    if ((!aString.includes('.')) && (!bString.includes('.'))){
        return a + b;
    } else {
        let aDecimal = 0;
        let bDecimal = 0;
        if (aString.includes('.')) aDecimal = a.toString().split('.')[1].length;
        if (bString.includes('.')) bDecimal = b.toString().split('.')[1].length;
        return Number((a + b).toFixed(Math.max(aDecimal, bDecimal)));
    }
    
};

function subtract(a,b){
    let aString = a.toString();
    let bString = b.toString();
    if ((!aString.includes('.')) && (!bString.includes('.'))){
        return a - b;
    } else {
        let aDecimal = 0;
        let bDecimal = 0;
        if (aString.includes('.')) aDecimal = a.toString().split('.')[1].length;
        if (bString.includes('.')) bDecimal = b.toString().split('.')[1].length;
        return Number((a - b).toFixed(Math.max(aDecimal, bDecimal)));
    }
};

function multiply(a,b){
    let aString = a.toString();
    let bString = b.toString();
    if ((!aString.includes('.')) && (!bString.includes('.'))){
        return a * b;
    } else {
        let aDecimal = 0;
        let bDecimal = 0;
        if (aString.includes('.')) aDecimal = a.toString().split('.')[1].length;
        if (bString.includes('.')) bDecimal = b.toString().split('.')[1].length;
        return Number((a * b).toFixed(aDecimal + bDecimal));
    }
};

function divide(a,b){
    if (a === 0 && b === 0){
        return Infinity;
    }
    return a / b;
};

function operate(num1, num2, operator){
    if (operator === '+'){
        return add(num1,num2);
    } else if (operator === '-'){
        return subtract(num1,num2);
    } else if (operator === '*'){
        return multiply(num1,num2);
    } else if (operator === '/'){
        return divide(num1,num2);
    };
};

function display(num){
    if (displayNumber !== '0'){
        displayNumber += num;
    } else {
        displayNumber = num;
    }
    refreshDisplay(displayNumber);
}

function refreshDisplay(num){
    num = num.toString();
    if ((num.includes('.')) && (!num.includes('e')) && num.length > 16){
        leftLength = num.split('.')[0].length;
        rightLength = num.split('.')[1].length;
        maxRightLength = 15 - leftLength;
        num = Number(num).toFixed(maxRightLength);
    }
    if (num === 'Infinity' || num === '-Infinity'){
        displayText.textContent = "Error";
    } else if (num.toString().length > 16) {
        if (Number(num).toExponential().toString().length > 16) {
            displayText.textContent = Number(num).toExponential(5)
        } else {
            displayText.textContent = Number(num).toExponential();
        }
    } else {
        displayText.textContent = num;
    }
}

function operatorPress(pressedOperator){
    if (!isNaN(num1) && !isNaN(num2) && operator) {
        num1 = operate(num1, num2, operator);
        refreshDisplay(num1);
        num2 = NaN;
        operator = null;
    }
    if ((pressedOperator !== '=') && !isNaN(num1)) operator = pressedOperator;
}

function recordNumber(){
    if (!isNaN(num1) && operator && displayNumber){
        num2 = Number(displayNumber);
    } else if (displayNumber) {
        num1 = Number(displayNumber);
    }
    displayNumber = ''
}

function dotOperator(){
    if (!displayNumber.includes('.')){
        displayNumber += '.';
        displayText.textContent = displayNumber;
    }
}

function reset(){
    displayNumber = '0';
    num1 = NaN;
    num2 = NaN;
    operator = null;
    displayText.textContent = displayNumber;
}

function signChange(){
    console.log(displayNumber, typeof(displayNumber), num1)
    if ((displayNumber) && (displayNumber !== '0')){
        if (displayNumber.includes('-')){
            displayNumber = displayNumber.replace('-', '');
        } else {
            displayNumber = '-' + displayNumber;
        }
        refreshDisplay(displayNumber);
    } else if ((num1) && (num1 !== 0)){
         num1 *= -1;
         refreshDisplay(num1);
    }
}

function percentage(){
    if (!isNaN(num1) && operator && displayNumber){
        num2 = num1 / 100 * Number(displayNumber);
        displayNumber = num2;
        refreshDisplay(displayNumber);

    } else if (isNaN(num1)){
        
        if ((displayNumber.includes('.')) && (!displayNumber.includes('e'))){
            let decimals = 2
            decimals = displayNumber.split('.')[1].length + 2;
            displayNumber = Number((Number(displayNumber)/100).toFixed(decimals).toString()).toString();
        } else {
            displayNumber = (Number(displayNumber) / 100).toString();
        }
        refreshDisplay(displayNumber);
    } else {
        num1 = num1.toString();
        let decimals = 2
        if (num1.includes('.')){
            decimals = num1.split('.')[1].length + 2;
        }
        num1 = Number((Number(num1)/100).toFixed(decimals));
        refreshDisplay(num1);
    }
}



let firstOperation = true;
let testCondition = false;
const numButtons = document.querySelectorAll('.number');
const displayText = document.querySelector('#pressed-number');
numButtons.forEach(button => button.addEventListener('click', () => display(button.textContent)));
const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(button => button.addEventListener('click', () => {
    recordNumber();
    operatorPress(button.textContent);
    
}));
const dotButton = document.querySelector('.dot');
dotButton.addEventListener('click', () => dotOperator());
const resetButton = document.querySelector('.reset');
resetButton.addEventListener('click', () => reset());
const signChangeButton = document.querySelector('.sign-change');
signChangeButton.addEventListener('click', () => signChange());
const percentageButton = document.querySelector('.percentage');
percentageButton.addEventListener('click', () => percentage());
let displayNumber = '0'; 
let num1 = NaN;
let num2 = NaN;
let operator = null;