// grab elements
var hiScoreLink = document.getElementById("hiScores");
var timeLeftEl = document.getElementById("timeLeft");
var questionEl = document.getElementById("questionText");
var choices = document.querySelectorAll("button");
var scores = document.getElementById("scoreList");

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
questions.push(question1);

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
    
    scores.setAttribute('display', 'block');
    for (var i=1; i<choices.length; i++) {
        choices[i].style.visibility = 'hidden';
    }
    choices[0].textContent = "Return to Game";

    

}

displayHiScores();
//displayQuestion(questions[0]);
for (var i=0; i<choices.length; i++) {
    console.log(choices[i]);
}