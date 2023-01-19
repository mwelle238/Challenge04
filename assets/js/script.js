// grab elements
var gamespaceEL = document.getElementById("gamespace");
var timeLeftEl = document.getElementById("timeLeft");
var questionEl = document.getElementById("questionText");
var choices = document.querySelectorAll("button");
var hiScoreListEl = document.getElementById("scoreList");
var resultEl = document.getElementById("result");
var inputEl = document.createElement("input");
//declare variables
var timer;
var timeLeft = 20;
var score = 0;
var initials;
const maxHiScores = 4; // store top 5 scores
var highScores = [];
var highInitials = [];
var questionNumber = 0;

//console.log(timeLeftEl);
//console.log(questionEl);
//console.log(choices);

var questions = [
    {
    qText: "What is JavaScript?",
    correct: "Programming language of webpages",
    wrong1: "Tedious",
    wrong2: "Coffee",
    wrong3: "Indonesian Scrolls"
    },

    {
    qText: "What command displays info to the browser console?",
    correct: "console.log()",
    wrong1: "console.print()",
    wrong2: "console.display()",
    wrong3: "print.console()",
    },

    {
    qText: "Javascript is a(n) _________ language?",
    correct: "Object-Oriented",
    wrong1: "Object-Based",
    wrong2: "Procedural",
    wrong3: "None of These"
    },

    {
    qText: "Upon encountering empty statements, what does the Javascript interpreter do?",
    correct: "Ignores the statements",
    wrong1: "Throws an error",
    wrong2: "Gives a warning",
    wrong3: "None of these"
    },

    {
    qText: "How can a datatype be declared to be a constant type?",
    correct: "const",
    wrong1: "var",
    wrong2: "let",
    wrong3: "constant"
    },

    {
    qText: "What is the use of the <noscript> tag",
    correct: "The contents are displayed by non-JS-based browsers",
    wrong1: "Clears all cookies and cache",
    wrong2: "Stops the current script being run",
    wrong3: "None of these"
    },

    {
    qText: "When an operator’s value is NULL, the typeof returned by the unary operator is:",
    correct: "Object",
    wrong1: "Boolean",
    wrong2: "String",
    wrong3: "Undefined"
    }
];

// randomize the order of the 
function randomizeQuestions(){
    var scrambled = [];
    var x;
    while (questions.length>0) {
        x = Math.floor(Math.random()*questions.length);
        scrambled.push(questions[x]);
        //console.log(scrambled);
        //console.log(scrambled[x]);
        questions.splice(x, 1);
    }
    questions = scrambled;
}


// displays the home screen in the gamespace
function displayHome() {
    hideHighScores();
    questionEl.textContent = "Upon clicking start, you will be given a series of multiple choice questions.  If you get the question right, your score increases; get it wrong and 10 seconds will be removed from the timer.";
    choices[0].textContent = "Start Game";
    choices[0].setAttribute('data-info', 'start');
    choices[1].textContent = "View High Scores";
    choices[1].setAttribute('data-info', 'scores');
    choices[2].style.visibility = "hidden"
    choices[3].style.visibility = "hidden"    
}

//displays the question and randomizes the choices.  sets the data-info attribute of the correct answer to correct for future comparisson
function displayQuestion(q) {
    hideHighScores();
    var answers = [q.correct, q.wrong1, q.wrong2, q.wrong3]
    var scrambled = [];
    var x;
    while (answers.length>0) {
        x = Math.floor(Math.random()*answers.length);
        scrambled.push(answers[x]);
        //console.log(scrambled);
        //console.log(scrambled[x]);
        answers.splice(x, 1);
    }
    questionEl.textContent = q.qText;
    for (var i=0; i<scrambled.length; i++) {
        choices[i].textContent = scrambled[i];
        if (scrambled[i] === q.correct) {
            choices[i].setAttribute('data-info', 'correct');
        }
        else {
            choices[i].setAttribute('data-info', 'wrong');
        }
    }
}

// displays the high scores in the gamespace
function displayHiScores() {
    questionEl.textContent = "High Scores";
    var hi1 = document.createElement("li");
    var hi2 = document.createElement("li");
    var hi3 = document.createElement("li");
    var hi4 = document.createElement("li");
    var hi5 = document.createElement("li");
    var scoresArray = [hi1, hi2, hi3, hi4, hi5];
    for (var i=0; i<maxHiScores+1; i++){
        hiScoreListEl.appendChild(scoresArray[i])
        if (highScores[i] == null) {
            scoresArray[i].textContent = "NO SCORE SET";
        } else {
            scoresArray[i].textContent = highScores[i] + " points........ " + highInitials[i];
        }
    }
    hiScoreListEl.style.visibility = 'visible';
    choices[0].style.visibility = 'visible';
    choices[0].textContent = "Start New Game";
    choices[0].setAttribute('data-info', 'start');
    
    choices[1].style.visibility = 'visible';
    choices[1].textContent = "Back to Home";
    choices[1].setAttribute('data-info', 'home');

    choices[2].style.visibility = 'visible';
    choices[2].textContent = "Reset High Scores";
    choices[2].setAttribute('data-info', 'clear');
    
    choices[3].style.visibility = 'hidden';
}

// deletes high score elements.  Even when hidden, they took up space and the gamespace looked off on subsequent games
function hideHighScores() {
    var child = hiScoreListEl.lastElementChild;  // if scores had been viewed and then later viewed again, it was keeping the old list.  This clears the list items
    while (child) {
        hiScoreListEl.removeChild(child);
        child = hiScoreListEl.lastElementChild;
    }
    hiScoreListEl.style.visibility = 'hidden';
}


// retrieves scores from localStorage
function getScores() {
    var storedScores = JSON.parse(localStorage.getItem("hiScores"));
    var storedInitials = JSON.parse(localStorage.getItem("initials"));
    if (storedScores === null) {
        highScores[0] = 0;
        highInitials[0] = '';
    } else {
        for (var i=0; i<storedScores.length; i++) {
            highScores[i] = storedScores[i];
            highInitials[i] = storedInitials[i];
        }
    }
    //console.log(highScores);
    //console.log(highInitials);
}

//writes high scores to localStorage
  function setScores() {
    if (highScores[0] == null) {
        return;  //no high scores set
    }
    localStorage.setItem('hiScores', JSON.stringify(highScores));
    localStorage.setItem('initials', JSON.stringify(highInitials));
}

// resets high scores
function resetScores(){
    highScores = [];
    highInitials = [];
    setScores();
    hideHighScores();
    displayHiScores();
}

/* //prompts to enter initials for a high score  -- removed and added text field for initial gathering
 function getInitials() {
     initials = '';
     alert("You scored " + score + " points.  You have a high score!!");
     do {
         var input = prompt("Please enter your initials (will only accept the first 3 letters entered):");
     } while (input == '' || input === null)
     input = input.toUpperCase();
     for (var i=0; i<3; i++){
         if (input.charAt(i)===null){
             break;
         }
         initials += input.charAt(i);
     }
     //console.log(initials);
 } */

 // adjusts scores when a high is attained
function adjustHighScores() {
    for (var i=0; i<maxHiScores; i++){
        if (score > highScores[i] || highScores[i] == null) {
            if (highScores[i] == 0 && highInitials[i] == '') {  // if no high scores in local storage, getScores() will set the 0-indexes to 0 and ''
                highScores.splice(i, 1, score);                 // add the new score and remove the placeholder
                highInitials.splice(i, 1, initials);            // add the new initials and remove the placeholder
            } else {
                highScores.splice(i, 0, score);  // insert the new high score
                highInitials.splice(i, 0, initials); //insert new initials
            }
            if (highScores.length > maxHiScores+1) {  // if High Scores are fully populated
                highScores.splice(highScores.length, 1); // remove the last high score
                highInitials.splice(highInitials.length,1);  //remove the last initial
            }
            //console.log(highScores);
            setScores();
            return;
        }
    }
}

// starts the quiz
function startGame() {
    //re-initialize score, timeLeft
    score = 0;
    timeLeft = 20;
    questionNumber = 0;
    //start timer
    startTimer();
    //unhide all buttons
    for (var i=0; i<choices.length; i++){
        choices[i].style.visibility = 'visible';
    }
    randomizeQuestions();
    //display question
    displayQuestion(questions[questionNumber]);    
}

// timer function
function startTimer() {
    // Sets timer
    timer = setInterval(function() {
      timeLeft--;
      timeLeftEl.textContent = timeLeft;
      // Tests if time has run out
      if (timeLeft === 0) {
        // Clears interval
        clearInterval(timer);
        endGame();  
      }
    }, 1000);
  }

 // all questions answered or time has run out 
function endGame() {
    clearInterval(timer);
    if (highScores[maxHiScores] == null || score > highScores[maxHiScores]) {
        // good enough for high score list
        getInitials();
    } else {
    displayEnd();
    }
}

function getInitials(){
    resultEl.textContent = '';
    questionEl.textContent = "You scored " + score + " points. You have achieved a high score, please enter your initials";
    inputEl.maxLength = 3;
    inputEl.setAttribute('type', 'text');
    questionEl.appendChild(inputEl);
    choices[0].textContent = "Submit";
    choices[0].setAttribute('data-info', 'submit');
    choices[1].style.visibility = 'hidden'
    choices[2].style.visibility = 'hidden'
    choices[3].style.visibility = 'hidden'
}


function displayEnd(){
    questionEl.textContent = "You scored " + score + " points.";
    choices[0].textContent = "Start new Game";
    choices[0].setAttribute('data-info', 'start');
    choices[1].textContent = "Show High Scores";
    choices[1].setAttribute('data-info', 'scores');
    choices[1].style.visibility = 'visible';
    choices[2].style.visibility = 'hidden';
    choices[3].style.visibility = 'hidden';
    resultEl.textContent = '';
}

//listen for clicks on buttons within the gamespace
//outside of the game, buttons will have data-info of:  'scores' or 'home' or 'start' or 'clear'
//during the game, buttons will be set to 'correct' or 'wrong'
gamespaceEL.addEventListener("click", function(event) {
    event.preventDefault();
    var element = event.target;
    if (element.matches(".btn")){
        var info = element.getAttribute("data-info");
        if (info == 'start') {
            startGame();
            return;
        } else if (info == 'scores') {
            displayHiScores();
            return;        
        } else if (info == 'clear') {
            resetScores();
            return;
        } else if (info == 'home') {
            displayHome();
            return;
        } else if (info == 'submit') {
            initials = inputEl.value.toUpperCase();
            if (initials == '') {
                resultEl.textContent = "You must enter initials";
                return;
            }
            adjustHighScores();
            displayEnd();
            return;
        } else if (info == 'correct') {
            score += 5;
        } else {
            timeLeft -= 5;
            if (timeLeft <= 0) {  //had bug where if you answered wrong with less than 5 seconds left, timeLeft went negative and kept counting down.
                endGame();
                return;
            }
        }
        resultEl.textContent = info;
        questionNumber++;
        if (questionNumber >= questions.length){
            endGame();
            return;
        }
        displayQuestion(questions[questionNumber]);
    }
});

// initialize page
function init() {
    getScores();
    displayHome();
}

// call init
init();


  