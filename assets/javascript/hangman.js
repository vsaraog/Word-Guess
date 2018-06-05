
"use strict";

var winCount = 0;
var lossCount = 0;
var guessHistory = [];
var guessesLeft;
var computerChoice;
var userCorrectGuesses;

initState();
printOut();

document.onkeyup = processUserGuess;

initState();

function initState() {
    guessHistory = [];
    guessesLeft = 10;
    computerChoice = getComputerChoice().toUpperCase().split("");

    // Create an array, which will have correct guesses of the user
    userCorrectGuesses = [];
    for (var i = 0; i < computerChoice.length; ++i)
        userCorrectGuesses.push("");
}

function processUserGuess(event) {
    //debugger
    var userGuess = event.key.toUpperCase();
    debugger
    if (isValidInput(userGuess)) {
        // Search if user already guess that letter
        if (guessHistory.indexOf(userGuess) === -1) {
            guessHistory.push(userGuess);
            --guessesLeft;

            if (computerChoice.indexOf(userGuess) !== -1) {
                processCorrectGuess(userGuess);
            }
            else {
                processWrongGuess(userGuess);
            }

            printOut();
        }
    }
    else {
        alert("Please press A-Z keys only");
    }
}

function processCorrectGuess(userGuess) {
    console.assert(userGuess !== undefined, "Invalid input");
    
    for (var i = 0; i < computerChoice.length; ++i) {
        if (userGuess === computerChoice[i]) {

            console.assert(userCorrectGuesses[i] === "", 
                "user guesses at index\"" + i + "\" already filled with letter \"" + 
                userCorrectGuesses[i] + "\"");

            userCorrectGuesses[i] = userGuess;
        }
    }
    // If all letters are populated
    if (userCorrectGuesses.indexOf("") === -1) {
        alert("You win!");
        ++winCount;
        initState();
    }
}

function processWrongGuess(userGuess) {
    if (guessesLeft === 0) {
        ++lossCount;
        initState();
    }
}

function generateRandomNum(max)
{
    return Math.floor(Math.random() * Math.ceil(max));
}


function getComputerChoice()
{
    var bands = ["Metallica", "Nirvana", "Guns N Roses"];
    var index = generateRandomNum(bands.length);

    console.assert(index >= 0 && index < bands.length, 
        "Random generator returned outside the valid values. Index: " + index);

    return bands[index];
}

function isValidInput(userIn)
{
    return (/^[A-Z]$/.test(userIn));
}

function printOut() {
    var winElem = document.getElementById("win");
    var lossElem = document.getElementById("loss");
    var guessesLeftElem = document.getElementById("guesses-left");
    var guessHistElem = document.getElementById("user-guess-history");
    var correctGuesses = document.getElementById("user-correct-guesses");
    
    winElem.textContent = "Wins:" + winCount;
    lossElem.textContent = "Loss:" + lossCount;
    guessesLeftElem.textContent = "Guesses Left:" + guessesLeft; 
    guessHistElem.textContent = guessHistory.join(", ");
    correctGuesses.textContent = userCorrectGuesses.join(" ");
}