//DOM ELEMENTS


//var questionsEl = document.getElementById("questions");

var quizBox = document.getElementById("quizBox");
 var questionE =document.getElementById("question");
var option1 = document.getElementById("option-1");
var option2 = document.getElementById("option-2");
var option3 = document.getElementById("option-3");
var option4 = document.getElementById("option-4");

var startBtn = document.getElementById("startBtn");
var showResult = document.getElementById("showResult");
var resultsBox = document.getElementById("resultsBox");
var saveuser = document.getElementById("saveuser");
var timerhtml = document.getElementById("timer");

option1.addEventListener("click", checkUserResponse);
option2.addEventListener("click", checkUserResponse);
option3.addEventListener("click", checkUserResponse);
option4.addEventListener("click", checkUserResponse)
//console.log(option1)
//variables
//var questions=require(questions.js)
var currentQuestion = 0;
var userScore = 0.;
var timer = ""
var timerCount = questions.length * 15

quizBox.style.display = "none"
resultsBox.style.display = "none"
//user score
//localStorage 
saveuser.addEventListener("click", function () {
    var userName = document.getElementById("user").value;
    
    var playerScore = JSON.parse(localStorage.getItem("playerScore")) || []
    playerScore.push({
        user: userName,
        score: userScore
    })
    localStorage.setItem("playerScore", JSON.stringify(playerScore))
    displayLocalStorage()
})
//Start Button
startBtn.addEventListener("click", function () {
    quizBox.style.display = "block"
    startBtn.style.display = "none"
    timer = setInterval(displayClock, 3000)
    getQuestion()
})

// dsplayClock

function displayClock() {
    timerhtml.textContent = timerCount;
    timerCount--;
    if (timerCount <= 0) {
        clearInterval(timerCount)
              endQuiz()
    }
}
// getQuestion function
function getQuestion() {
    questionE.textContent = questions[currentQuestion].question
    option1.textContent = questions[currentQuestion].choices[0]
    option2.textContent = questions[currentQuestion].choices[1]
    option3.textContent = questions[currentQuestion].choices[2]
    option4.textContent = questions[currentQuestion].choices[3]
    
    

}

function checkUserResponse() {
    
    var userresponse =this.getAttribute("data-option")
    Answer=questions[currentQuestion].answer
    if (option1.textContent==Answer) indx=0
    if (option2.textContent==Answer) indx=1
    if (option3.textContent==Answer) indx=2
    if (option4.textContent==Answer) indx=3
    
    
   
 //   console.log(userresponse)
   // console.log(Answer)
  //  if(userresponse == questions[currentQuestion].answer) {
      if(userresponse == indx) {
    showResult.textContent= "Excellent, You got it!"
    showResult.setAttribute("class", "feedback1")
    setTimeout(function (){
        showResult.setAttribute("class", "feedback1 hide")
    }, 1000)
    userScore++;
}
else {
    showResult.textContent= "Sorry, You missed it!"
    timerCount =timerCount -10.0
    showResult.setAttribute("class", "feedback2")
    setTimeout(function (){
        showResult.setAttribute("class", "feedback2 hide")
    }, 1000)
}

currentQuestion++;
if (currentQuestion <questions.length-1) {
    
    
    getQuestion()

 }else{
    
    clearInterval(timerCount)
    endQuiz()   
}
}   
    
function endQuiz(){
    resultsBox.style.display ="block"
    quizBox.style.display = "none"
    document.getElementById('score').innerText ="User Score: " + userScore
    displayLocalStorage()
    clearInterval(timerCount)
}

function displayLocalStorage() {
    var previousScore = document.getElementById("previousScore")
    var htmlCode = ""
    var playerScore = JSON.parse(localStorage.getItem("playerScore")) || []

for (let i = 0; i < playerScore.length; i++) {
    htmlCode += `<h6>User : ${playerScore[i].user} ---- ${playerScore[i].score}</h6>`
}
previousScore.innerHTML = htmlCode;

}
 

 function clearHighScores() {
     window.localStorage.removeItem("playerScore");
     window.location.reload();

 }
 document.getElementById("clearHighscore").onclick=clearHighScores;

 function restart() {
     window.location.reload();
 }
 document.getElementById("goback").onclick =restart;