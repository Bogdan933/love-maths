
document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    //instead of the below, a cleaner version can be used: "let button of buttons"//
    // for (let i=0; i < buttons.length; i++){}   
    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                //include the alert right off the bat to show the function is working //
                // alert(`You clicked ${gameType}`); //
                runGame(gameType);

            }

        })
    }
    // Hit enter to submit answer rather than clicking submit button. //
    document.getElementById('answer-box').addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
        })

    runGame("addition");
    
});

/**
 * The main game "loop", called when the script is first loaded and after the user's answer has been processed.  
 */

//using docstrings will show the sentence of what your code does if your function is located somewhere else in the code too //
function runGame(gameType) {
    // Answer box resets to blank after page refreshes //
    document.getElementById('answer-box').value = "";

    // Focus the cursor in the answer box by default after the page is refreshed so you don't have to click each time. //
    document.getElementById('answer-box').focus();

// These two variables generate random numbers betwen 1 and 25 //
    let num1 = Math.floor(Math.random()*25) + 1;
    let num2 = Math.floor(Math.random()*25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion (num1, num2);

    } else if (gameType === "multiply") {
        displayMultiplyQuestion (num1, num2);

    } else if (gameType === "subtract") {
        displaySubtractQuestion (num1, num2);

    } else if (gameType === "division") {
        displayDivisionQuestion (num1, num2);

    } else {
        alert(`Unknown game type: ${gameType}`);
        // the 'throw' will send this message to the console >> open it and you can see the error //
        throw `ERROR! Unknown game type: ${gameType}. Aborting!`;
    }

}
/**
 * Checks the user's answer against the first element of the returned calculateCorrectAnswer array.
 */
 function checkAnswer() {
    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
        alert("Good job! You got it right!");
        incrementScore();
    } else {
        alert(`Oh no, you got it wrong. The correct answer is ${calculatedAnswer[0]}`);
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);
}


/** Gets the operands (both numbers) from the DOM and the operator (plus, minus, etc) and returns a correct answer. */
function calculateCorrectAnswer() {
    // parseInt used here bc getting info DIRECTLY from dom returns a STRING and we need an INTEGER for math functions) //
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById("operator").innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];

    } else if (operator === "x") {
        return [operand1 * operand2, "multiply"];

    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"];

    } else if (operator === "/") {
        return [operand1 / operand2, "division"];

    // This else statement below is irrelevant now if we've filled out all 4 options //
    } else {
        alert(`Unimplemented operator: ${operator}`);
        throw `ERROR! This operator, ${operator} is unknown. Aborting!`;
    }
}

/** Get current score from DOM and increment it by one if the user's answer is correct. */
function incrementScore() {
    let oldScore = parseInt(document.getElementById("score").innerText);
    // Could use: innerText or textContent (interchangeable mostly). Could use oldScore + 1 or ++oldScore //
    // Put the ++ BEFORE oldScore so the DOM is updated with the new number, otherwise the innerText will never be overwritten. //
    document.getElementById("score").innerText = ++oldScore;

}

/** Get current score of incorect answers from DOM and increment it by one if the user's answer is incorrect. */
function incrementWrongAnswer() {
    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;

}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById("operator").textContent = "+";
}

function displaySubtractQuestion(operand1, operand2) {
    // if operand 1 > operand2, return operand1. If not, return operand2. This way you avoid negative answers. //
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById('operand2').textContent = operand2 < operand1 ? operand2 : operand1;
    document.getElementById("operator").textContent = "-";

}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    // use 'x' rather than '*' bc it's just a symbol, not a code instruction. //
    document.getElementById("operator").textContent = "x";

}

function displayDivisionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1 * operand2;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById("operator").textContent = "/";

}