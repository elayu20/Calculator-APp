let currentNumber = 0;
let displayCurrentNumber = "";
let operator = "";
let previousNumber = 0;
let operatorCount = 0;
let clickedEquals = false;

// Iniatilizes width of visual outputs
// Helps to stop displaying out of bounds
let outputDiv = document.querySelector(".output-container");
let liveOutput = document.querySelector(".live-output");
let hiddenOutput = document.querySelector(".hidden-output");

let style = window.getComputedStyle(outputDiv);

// Convert padding to numbers (removing "px")
let paddingLeft = parseFloat(style.paddingLeft);
let paddingRight = parseFloat(style.paddingRight);

let containerWidth = outputDiv.clientWidth - paddingLeft - paddingRight;
let hiddenOutputWidth = hiddenOutput.clientWidth;

function output(a) {
    console.log(a);
}

function divide(a, b) {
    let quotient = a / b;
    if (b === 0) {
        return "Error";
    }

    return quotient;
}

function multiply(a, b) {
    let product = a * b;
    return parseFloat((product).toFixed(10));
}

function subtract(a, b) {
    let difference = a - b;
    return difference;
}

function add(a, b) {
    let sum = a + b;
    return parseFloat((sum).toFixed(10));
}

function percent(a) {
    let result = a / 100;
    return result;
}

function plusMinus(a) {
    let result = a * -1;
    return result;
}

// Clear everything
let clear = document.querySelector("#clear-button");
clear.addEventListener("click", () => {
    currentNumber = 0;
    displayCurrentNumber = "";
    previousNumber = 0;
    operator = "";
    operatorCount = 0;
    liveOutput.textContent = 0;
    hiddenOutput.textContent = 0;
});

// Displays the number and keeps the current number in memory
let numberButton = document.querySelectorAll(".number-circle-button");
numberButton.forEach( (btn, i) => {
    btn.addEventListener("click", ()=> {

        // Gets the text content of the button clicked
        currentNumber = btn.textContent;


        // Displays the current number, is a sequence of characters
        // displayCurrentNumber also acts as a tracker for current element
        // just as string
        displayCurrentNumber = displayCurrentNumber + currentNumber;
        hiddenOutput.textContent = displayCurrentNumber;
        hiddenOutputWidth = hiddenOutput.clientWidth;


        if (hiddenOutputWidth > containerWidth) {
            // Do nothing
            hiddenOutput.textContent = liveOutput.textContent;
            hiddenOutputWidth = hiddenOutput.clientWidth;
        }
        else {
            liveOutput.textContent = displayCurrentNumber;

            // Keeps track of the currentNumber
            currentNumber = parseFloat(displayCurrentNumber);
        }
    })
});

// Decimal button clicked, only one decimal allowed
let decimalButton = document.querySelector("#decimal-button");
decimalButton.addEventListener("click", ()=> {
    // When pressing decimal without values in front
    // Automatically puts zero in front
    if (!displayCurrentNumber.includes(".")) {
        if (displayCurrentNumber === "") {
            displayCurrentNumber = "0.";
        }
        else {
            displayCurrentNumber += ".";
        }

        currentNumber = parseFloat(displayCurrentNumber);
        liveOutput.textContent = displayCurrentNumber;
        hiddenOutput.textContent = displayCurrentNumber;
    }

});

// Multiplies the current number by -1, then displays the result
let plusMinusButton = document.querySelector("#plus-minus-button");
plusMinusButton.addEventListener("click", () => {
    currentNumber = plusMinus(currentNumber);
    displayCurrentNumber = currentNumber.toString();
    liveOutput.textContent = displayCurrentNumber;
    hiddenOutput.textContent = displayCurrentNumber;

});

// Divides the current number by 100, then displays the result
let percentButton = document.querySelector("#percent-button");
percentButton.addEventListener("click", () => {
    currentNumber = percent(currentNumber);
    displayCurrentNumber = currentNumber.toString();
    liveOutput.textContent = displayCurrentNumber;
    hiddenOutput.textContent = displayCurrentNumber;

});

// Keeps track which operator was clicked as a string
// Also acts as an equal button if chaining operations without clicking equals
let operationButton = document.querySelectorAll(".operation-circle-button");
operationButton.forEach((btn) => {
    btn.addEventListener("click", ()=> {
        operator = btn.textContent;

        // For chained operations (immediate evaluation without equals)
        // Any occurence of clicking operator after first occurence
        // immediately evaluates and displays
        // Makes sure we didn't click the equals beforehand
        // Does not allow operator to be repeatedly clicked (ex. 5 ++++)
        if (operatorCount > 0 && clickedEquals === false) {
            if (operator === "+") {
                let sum = add(previousNumber, currentNumber);
                displayCurrentNumber = sum.toString();
                liveOutput.textContent = displayCurrentNumber;
                hiddenOutput.textContent = displayCurrentNumber;
                currentNumber = sum;

            }
            else if (operator === "-") {
                let difference = subtract(previousNumber, currentNumber);
                displayCurrentNumber = difference.toString();
                liveOutput.textContent = displayCurrentNumber;
                currentNumber = difference;

            }
            else if (operator === "x") {
                let product = multiply(previousNumber, currentNumber);
                displayCurrentNumber = product.toString();
                liveOutput.textContent = displayCurrentNumber;
                hiddenOutput.textContent = displayCurrentNumber;
                currentNumber = product;

            }
            else {
                let quotient = divide(previousNumber, currentNumber);
                displayCurrentNumber = quotient.toString();
                liveOutput.textContent = displayCurrentNumber;
                hiddenOutput.textContent = displayCurrentNumber;
                currentNumber = quotient;

            }
        }

        // Since pressing the operator indicates we are on a new number
        // Have to reset the string
        // Have to store the previous number as a variable
        displayCurrentNumber = "";
        previousNumber = currentNumber;
        clickedEquals = false;

        operatorCount++;
    });
});

let equalButton = document.querySelector(".long-circle-button");
equalButton.addEventListener("click", ()=> {
    clickedEquals = true;

    if (operator === "+") {
        let sum = add(previousNumber, currentNumber);
        displayCurrentNumber = sum.toString();
        liveOutput.textContent = displayCurrentNumber;
        hiddenOutput.textContent = displayCurrentNumber;
        currentNumber = sum;

    }
    else if (operator === "-") {
        let difference = subtract(previousNumber, currentNumber);
        displayCurrentNumber = difference.toString();
        liveOutput.textContent = displayCurrentNumber;
        hiddenOutput.textContent = displayCurrentNumber;
        currentNumber = difference;

    }
    else if (operator === "x") {
        let product = multiply(previousNumber, currentNumber);
        displayCurrentNumber = product.toString();
        liveOutput.textContent = displayCurrentNumber;
        hiddenOutput.textContent = displayCurrentNumber;
        currentNumber = product;

    }
    else {
        let quotient = divide(previousNumber, currentNumber);
        displayCurrentNumber = quotient.toString();
        liveOutput.textContent = displayCurrentNumber;
        hiddenOutput.textContent = displayCurrentNumber;
        currentNumber = quotient;

    }
});

// Different scenarios that can happen

// Basic arithmetic
// num, operator, num, equals
// Ex. 5 + 3 = 
// Produces 8

// Chained operators (immediate evalution without equals)
// num, operator, num, operator...
// Ex. 5 + 3 x 2
// 15 x 2

// Equals pressed repeatedly (repeat last operation)
// num, equals, equals, equals...
// 5 + 3 = = =
// Repeats +3 each time
// Produces 8, 11, 14,...

// Operator pressed first
// operator, num
// x 5
// Produces 0
// Treats like 0 operator num

// Operator pressed twice
// num, operator, operator, num
// 5 + - 3
// Replaced previous operator, only last operator matters

// Negative/Positive numbers (+/- button)
// num, plus-minus
// 5 +/- 
// Just changes sign of num, changes to positive if negative
// Changes to negative if positive

// Decimal handling
// num, decimal, num
// Ex. 5 . 2 + 1 . 3 =
// Should only allow one decimal per number
// Concatenate input properly
// Convert to float before math

// Percent button
// num, percent
// Ex. 50 + 10 % =
// Produces 50 + 0.1 =

// Clear button
// Sets all variables to default values
// Display is 0

// Clicking equals after partial input
// num, operator, equals
// Ex. 5 + =
// Repeats + 5 (5 + 5)
// Assumes operation will be calculated as the same previous number

// Zero leading numbers
// Ignore extra leadings
// NOT: 00005
// DO: 5

// Starting with decimal
// decimal, num
// Ex. . 5
// Should be treated as 0 in front, so 0.5

// After equals, press operator to continue
// num, operator, num, equals, operator
// Ex. 5 + 3 = +
// Continue chaining, result becomes new previousValue
// Allow user to keep going without restarting

