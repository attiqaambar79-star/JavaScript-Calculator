// JavaScript Calculator
const display = document.getElementById("display");
// const previousDisplay = document.getElementById("previous-display");
const previousDisplay = document.getElementById("previous-display");
// const message = document.getElementById("message");
const message = document.getElementById("message");
// Buttons select karna
const buttons = document.querySelectorAll(".buttons button");
// Calculator state variables
let currentInput = "0";
let previousInput = null;
let operator = null;
let resetDisplay = false;

// Screen update karne ka function
function updateDisplay() {
    display.value = currentInput;
}

// Error message clear karna
function clearMessage() {
    message.textContent = "";
}

// Number enter karna
function inputNumber(number) {
    clearMessage();

    if (resetDisplay) {
        currentInput = number;
        resetDisplay = false;
    } else if (currentInput === "0") {
        currentInput = number;
    } else if (currentInput.length < 15) {
        currentInput += number;
    }

    updateDisplay();
}

// Decimal point add karna
function inputDecimal() {
    clearMessage();

    if (resetDisplay) {
        currentInput = "0.";
        resetDisplay = false;
    } else if (!currentInput.includes(".")) {
        currentInput += ".";
    }

    updateDisplay();
}

// Operator select karna
function chooseOperator(nextOperator) {
    clearMessage();

    if (operator !== null && !resetDisplay) {
        calculate();
    }
// Agar current input empty hai, to operator ko update karna
    previousInput = currentInput;
    operator = nextOperator;
    resetDisplay = true;

    previousDisplay.textContent =
        `${previousInput} ${getSymbol(operator)}`;

    updateDisplay();
}

// Operator ka display symbol
function getSymbol(op) {
    if (op === "+") return "+";
    else if (op === "-") return "−";
    else if (op === "*") return "×";
    else if (op === "/") return "÷";
    else return "";
}

// Calculation function
function calculate() {
    if (operator === null || previousInput === null) {
        return;
    }

    const firstNumber = Number(previousInput);
    const secondNumber = Number(currentInput);
    let result;

    if (operator === "+") {
        result = firstNumber + secondNumber;
    } else if (operator === "-") {
        result = firstNumber - secondNumber;
    } else if (operator === "*") {
        result = firstNumber * secondNumber;
    } else if (operator === "/") {
        if (secondNumber === 0) {
            message.textContent = "Cannot divide by zero!";
            return;
        } else {
            result = firstNumber / secondNumber;
        }
    } else {
        return;
    }

    if (!Number.isFinite(result)) {
        message.textContent = "Result is too large!";
        return;
    }

    // Floating-point errors ko control karna
    result = Number(result.toPrecision(12));
    
    previousDisplay.textContent =
        `${previousInput} ${getSymbol(operator)} ${currentInput} =`;

    currentInput = String(result);
    previousInput = null;
    operator = null;
    resetDisplay = true;

    updateDisplay();
}

// Last digit delete karna
function deleteLast() {
    clearMessage();

    if (resetDisplay) {
        return;
    }

    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);

        if (currentInput === "-") {
            currentInput = "0";
        }
    } else {
        currentInput = "0";
    }

    updateDisplay();
}

// Positive/negative number
function toggleSign() {
    clearMessage();

    if (currentInput !== "0") {
        currentInput = currentInput.startsWith("-")
            ? currentInput.slice(1)
            : "-" + currentInput;
    }

    resetDisplay = false;
    updateDisplay();
}

// Calculator reset karna
function clearCalculator() {
    currentInput = "0";
    previousInput = null;
    operator = null;
    resetDisplay = false;

    previousDisplay.textContent = "";
    clearMessage();
    updateDisplay();
}

// Buttons par click handle karna
for (const button of buttons) {
    button.addEventListener("click", function () {
        const value = button.dataset.value;
        const action = button.dataset.action;
        // Agar value defined hai aur action nahi hai, to number input karna

        if (value !== undefined && !action) {
            inputNumber(value);
        } else if (action === "decimal") {
            inputDecimal();
        } else if (action === "operator") {
            chooseOperator(value);
        } else if (action === "equals") {
            calculate();
        } else if (action === "clear") {
            clearCalculator();
        } else if (action === "delete") {
            deleteLast();
        } else if (action === "sign") {
            toggleSign();
        }
    });
}

// Initial display
updateDisplay();
