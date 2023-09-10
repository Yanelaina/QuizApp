let timeLeft = document.querySelector(".time-left"); 
let quizContainer = document.getElementById("container"); 
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.querySelector(".display-container"); 
let scoreContainer = document.querySelector(".score-container"); 
let restart = document.getElementById('restart'); 
let userScore = document.getElementById("user-score"); 
let startScreen = document.querySelector(".start-screen"); 
let startButton = document.getElementById("start-button");
let questionCount; 
let scoreCount = 0; 
let count = 11;
let countdown;


// Treatement of API 

const API_URL = 'https://opentdb.com/api.php';

// Query parameters
const category = 21; 
const difficulty = 'easy'; 
const numberOfQuestions = 3; 

// Construire l'URL de la requête
const apiUrl = `${API_URL}?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}&type=multiple&lang=fr`;


fetch(apiUrl)
.then(response => response.json())
.then(data => {
    
    // quizArray = data;
    // console.log("jhcbhbchbchbc : " + quizArray)
    const quizArray = data.results.map(result => {
      return {
        question: result.question,
        options: [...result.incorrect_answers, result.correct_answer],
        correct: result.correct_answer
      };
    });


    console.log("point : 1");
// const quizArray = [
//     {
//         id : "0",
//         question : "HTML stands for _________ ?",
//         options : [
//             "HighText Machine Language", 
//             "HyperText and links Markup Language",
//             "HyperText Markup Language",
//             "None of these",
//         ], 
//         correct: "HyperText Markup Language",
//     },

//     {
//         id : "1",
//         question : "Comment je m'appelle ?",
//         options : [
//             "Yanel", 
//             "Maurel",
//             "Précieuse",
//             "Cécylia",
//         ], 
//         correct: "Yanel",
//     }
// ]; 

restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");  
    scoreContainer.classList.add("hide");   
}); 

nextBtn.addEventListener("click", (displayNext = () => {
    questionCount += 1;

    if (questionCount == quizArray.length) {
        displayContainer.classList.add("hide");
        scoreContainer.classList.remove("hide");
        userScore.innerHTML = "Votre Score est " + 
        scoreCount + " sur " + questionCount;
    } else {
        countOfQuestion.innerHTML = questionCount + 1 + "sur " + 
        quizArray.length + "Questions"; 

        quizDisplay(questionCount);
        count = 11; 
        clearInterval(countdown); 
        timerDisplay();
        }
    })
); 

quizArray_1 = quizArray;

const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000); 
};

const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");

    quizCards.forEach((card) => {
        card.classList.add("hide");
    });

    quizCards[questionCount].classList.remove("hide");
}; 

function quizCreater() {
    // console.log("quizCreater : " + quizArray[0].options)
    quizArray.sort(() => Math.random() - 0.5);
    // console.log("quizCreater : " + quizArray)


    for (let i of quizArray) {
        i.options.sort(() => Math.random() - 0.5); 
        let div = document.createElement("div"); 
        div.classList.add("container-mid", "hide");

        countOfQuestion.innerHTML = 1 + " sur " + quizArray.length + " questions";

        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question"); 
        question_DIV.innerHTML = i.question; 
        div.appendChild(question_DIV);

        console.log('i.true : ', typeof(i.correct))
        div.innerHTML +=  
        `
        <button class="options-div" onclick="checker(this, ${i.correct})"> 
        ${question.options[0]}</button>
    
        <button class="options-div" onclick="checker(this, ${i.correct})"> 
        ${question.options[1]}</button>
    
        <button class="options-div" onclick="checker(this, ${i.correct})"> 
        ${question.options[2]}</button>
    
        <button class="options-div" onclick="checker(this, ${i.correct})"> 
        ${question.options[3]}</button>
        
        `;


        quizContainer.appendChild(div)
    }
}

// function displayOptions(question, correct) {
//     return `
//     <button class="options-div" onclick="checker(this, ${correct})"> 
//     ${question.options[0]}</button>

//     <button class="options-div" onclick="checker(this, ${correct})"> 
//     ${question.options[1]}</button>

//     <button class="options-div" onclick="checker(this, ${correct})"> 
//     ${question.options[2]}</button>

//     <button class="options-div" onclick="checker(this, ${correct})"> 
//     ${question.options[3]}</button>
    
//     `
// }




function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0; 
    scoreCount = 0; 
    count = 11; 

    clearInterval(countdown); 
    timerDisplay(); 
    quizCreater();
    quizDisplay(questionCount);
}


startQuiz = () => {
    console.log("I'm here")
    startScreen.classList.add("hide");
    // console.log("DisplayContain : " + displayContainer)
    displayContainer.classList.remove("hide");

    console.log("point : 2");
    initial();
};

window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
    initial();
}

})
.catch(error => {
    console.error('Erreur lors de la récupération des questions depuis l\'API', error);
})


function checker(userOption, correct) {

    console.log('correct : ' + correct)
    let userSolution = userOption.innerText;
    let question = document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".options-div");

    if (userSolution == correct) {
        userOption.classList.add("correct"); 
        scoreCount++; 
    } else {
        userOption.classList.add("incorrect"); 

        options.forEach((element) => {
            if (element.innerText == correct) {
                element.classList.add("correct"); 
            }
        });
    }

    clearInterval(countdown);
    options.forEach((element) => {
        element.disabled = true;
    });

}


 