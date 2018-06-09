
"use strict";

const WORD_LIST = [
    {tech: "HTML", img: "html.png"},
    {tech: "CSS", img: "css.png"},
    {tech: "Javascript", img: "javascript.png"},
    {tech: "Bootstrap", img: "bootstrap.jpeg"},
    {tech: "jQuery", img: "jquery.jpeg"},
    {tech: "firebase", img: "firebase.png"},
    {tech: "reactjs", img: "reactjs.png"}
];
Object.freeze(WORD_LIST);


var winCount = 0;
var lossCount = 0;
var guessHistory = [];
var guessesLeft;
var computerChoice;
var userCorrectGuesses;

initState();
printOut();

document.onkeyup = processUserGuess;

function initState() {
    guessHistory = [];
    guessesLeft = 10;

    if (computerChoice != undefined) {
        console.assert(computerChoice.img != undefined, "Image not set");
        // VIK_QUESTION: Why jQuery is not working
        //$("#img-tech").html("src=assests/images/"+computerChoice.img);
        var img = document.getElementById("img-tech");
        img.src = "assets/images/"+computerChoice.img;
    }

    computerChoice = getComputerChoice();
    // Normalize. Uppercase, Remove spaces and make it an array
    computerChoice.tech = computerChoice.tech.toUpperCase().split(" ").join("");

    // Create an array, which will have correct guesses of the user
    userCorrectGuesses = [];
    for (var i = 0; i < computerChoice.tech.length; ++i)
        userCorrectGuesses.push("");
}

function processUserGuess(event) {
    var userMsg = document.getElementById("user-message");
    userMsg.innerHTML = "";

    displayMsgToUser("");

    var userGuess = event.key.toUpperCase();
    if (isValidInput(userGuess)) {
        // Search if user already guess that letter
        if (guessHistory.indexOf(userGuess) === -1) {
            guessHistory.push(userGuess);
            --guessesLeft;

            if (guessesLeft < 0) {
                userLose();
            }

            if (computerChoice.tech.indexOf(userGuess) !== -1) {
                processCorrectGuess(userGuess);
            }
  
            printOut();
        }
    }
    else {
        userMsg.innerHTML = "Please press A-Z keys only";
    }
}

function processCorrectGuess(userGuess) {
    console.assert(userGuess !== undefined, "Invalid input");
    
    for (var i = 0; i < computerChoice.tech.length; ++i) {
        if (userGuess === computerChoice.tech[i]) {

            console.assert(userCorrectGuesses[i] === "", 
                "user guesses at index\"" + i + "\" already filled with letter \"" + 
                userCorrectGuesses[i] + "\"");

            userCorrectGuesses[i] = userGuess;
        }
    }
    // If all letters are populated
    if (userCorrectGuesses.indexOf("") === -1) {
        displayMsgToUser("Yay you win!!!", "text-success");
        ++winCount;
        initState();
    }
}

function userLose() {
    ++lossCount;
    displayMsgToUser("Sorry, better luck next time", "text-danger");
    initState();
}

function displayMsgToUser(msg, textClass)
{
    var userMsg = document.getElementById("win-lose-msg");
    userMsg.textContent = msg;
    userMsg.classList.add(textClass);
}

function generateRandomNum(max)
{
    return Math.floor(Math.random() * Math.ceil(max));
}

function getComputerChoice()
{
    var index = generateRandomNum(WORD_LIST.length);

    console.assert(index >= 0 && index < WORD_LIST.length, 
        "Random generator returned outside the valid values. Index: " + index);

    // Remove spaces in the word, if any
    return WORD_LIST[index];
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
    
    //$("#win").text("Wins: " + winCount)
    winElem.textContent = "Wins: " + winCount;
    lossElem.textContent = "Loss: " + lossCount;
    guessesLeftElem.textContent = "Guesses Left: " + guessesLeft; 
    guessHistElem.textContent = "My Guesses: " + guessHistory.join(", ");
    correctGuesses.textContent = userCorrectGuesses.join(" ");
}
