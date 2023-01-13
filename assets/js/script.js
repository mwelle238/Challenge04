// grab elements
var hiScoreLink = document.getElementById("hiScores");
var timeLeftEl = document.getElementById("timeLeft");
var questionEl = document.getElementById("questionText");
var choices = document.querySelectorAll("button");

console.log(hiScoreLink);
console.log(timeLeftEl);
console.log(questionEl);
console.log(choices);

var questions;

const question1 = {
    qText: "What is JavaScript?",
    correct: "Programming language of webpages",
    wrong1: "Tedious",
    wrong2: "Coffee",
    wrong3: "Indonesian Scrolls"
}

function displayQuestion(q) {
    questionEl.textContent = q.qText;
    choices[0].textContent = q.correct;
    choices[1].textContent = q.wrong1;
    choices[2].textContent = q.wrong2;
    choices[3].textContent = q.wrong3;
}

displayQuestion(question1);