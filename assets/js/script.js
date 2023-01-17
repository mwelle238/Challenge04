// grab elements
var gamespaceEL = document.getElementById("gamespace");
var hiScoreLink = document.getElementById("hiScores");
var timeLeftEl = document.getElementById("timeLeft");
var questionEl = document.getElementById("questionText");
var choices = document.querySelectorAll("button");
var scores = document.getElementById("scoreList");
var resultEl = document.getElementById("result");
//declare variables
var timer;
var timeLeft = 60;
var score = 0;
var initials;
const maxHiScores = 4; // store top 5 scores
var highScores = [];
var highInitials = [];
var questionNumber = 0;
// var questionOrder = [];  // randomize the order of the questions

console.log(hiScoreLink);
console.log(timeLeftEl);
console.log(questionEl);
console.log(choices);

var questions = [];

const question1 = {
    qText: "What is JavaScript?",
    correct: "Programming language of webpages",
    wrong1: "Tedious",
    wrong2: "Coffee",
    wrong3: "Indonesian Scrolls"
}

const question2 = {
    qText: "What command displays info to the browser console?",
    correct: "console.log()",
    wrong1: "console.print()",
    wrong2: "console.display()",
    wrong3: "print.console()",
}

questions.push(question1);
questions.push(question2);


function init() {
    getScores();
    displayHome();
}

function displayHome() {
    questionEl.textContent = "Upon clicking start, you will be given a series of multiple choice questions.  If you get the question right, your score increases; get it wrong and 10 seconds will be removed from the timer.";
    choices[0].textContent = "Start Game";
    choices[0].setAttribute('data-info', 'start');
    for (var i=1; i<choices.length; i++){
        choices[i].style.visibility = 'hidden';
    }
}

function startGame() {
    //re-initialize score, timeLeft
    score = 0;
    timeLeft = 60;
    questionNumber = 0;
    var qs = [];
    //start timer
    startTimer();
    //unhide all buttons
    for (var i=0; i<choices.length; i++){
        choices[i].style.visibility = 'visible';
    }
   
    //display question
    displayQuestion(questions[questionNumber]);    
}

//displays the question and randomizes the choices.  sets the data-info attribute of the correct answer to correct for future comparisson
function displayQuestion(q) {
    var answers = [q.correct, q.wrong1, q.wrong2, q.wrong3]
    var scrambled = [];
    var x;
    while (answers.length>0) {
        x = Math.floor(Math.random()*answers.length);
        scrambled.push(answers[x]);
        console.log(scrambled);
        console.log(scrambled[x]);
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

function displayHiScores() {
    questionEl.textContent = "High Scores";
    var h1 = document.createElement("li");
    h1.textContent = "100 - MW";
    var h2 = document.createElement("li");
    h2.textContent = "99 - MW";
    var h3 = document.createElement("li");
    h3.textContent = "95 - MW";
    var h4 = document.createElement("li");
    h4.textContent = "80 - MW";
    var h5 = document.createElement("li");
    h5.textContent = "69 - MW";
    scores.appendChild(h1);
    scores.appendChild(h2);
    scores.appendChild(h3);
    scores.appendChild(h4);
    scores.appendChild(h5);
    

    for (var i=1; i<choices.length; i++) {
        choices[i].style.visibility = 'hidden';
    }
    choices[0].textContent = "Return to Game";
    choices[0].setAttribute('data-info', 'hiScores');

    

}



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

  function endGame() {
    clearInterval(timer);
    alert("You finished with " + score + " points.");
    
    if (highScores[maxHiScores] === null || score > highScores[maxHiScores]) {
        // good enough for high score list
        getInitials();
        adjustHighScores();
    }
  }

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
    console.log(highScores);
    console.log(highInitials);
  }

  function setScores() {
    if (highScores[0] == 0 && highInitials[0] == '') {
        return;  //no high scores set
    }
    localStorage.setItem('hiScores', JSON.stringify(highScores));
    localStorage.setItem('initials', JSON.stringify(highInitials));
  }

  function getInitials() {
    initials = '';
    do {
        var input = prompt("Please enter your initials (will only accept the first 3 letters entered):");
    } while (input == '' || input === null)
    for (var i=0; i<3; i++){
        if (input.charAt(i)===null){
            break;
        }
        initials += input.charAt(i);
    }
    console.log(initials);
  }

  function adjustHighScores() {
    for (var i=0; i<highScores.length; i++){
        if (score > highScore[i]) {
            if (highScores.length == maxHiScores+1) {
            highScores.splice(highScores.length-1, 1); // remove the last high score
            highInitials.splice(highInitials.length-1,1);  //remove the last initial
            }
            highScores.splice(i, 0, score);  // insert the new high score
            highInitials.splice(i, 0, initials); //insert new initials
            console.log(highScores);
            setScores();
            return;
        }
    }
  }

  gamespaceEL.addEventListener("click", function(event) {
    event.preventDefault();
    var element = event.target;
    if (element.matches(".btn")){
        var info = element.getAttribute("data-info");
        if (info == 'start') {
            startGame();
            return;
        } else if (info == 'hiScores') {
            displayHome();
            return;
        } else if (info == 'correct') {
            score += 5;
        } else {
            timeLeft -= 5;
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

  init();


  