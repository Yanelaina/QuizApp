let timeLeft = document.querySelector(".time-left"); 
let quizContainer = document.getElementById("container"); 
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.querySelector(".display-container"); 
let scoreContainer = document.querySelector(".score-container"); 
let restart = document.getElementById('restart'); 
let userScore = document.getElementById("user-score"); 
let startScreen = document.querySelector(".start-screen"); 
let optionsContainer = document.querySelector(".options-container"); 
let startButton = document.getElementById("start-button");
let startQuiz = document.getElementById("start-button")
let questionCount; 
let scoreCount = 0; 
let count = 11;
let countdown;
let length = 0;





startQuiz.addEventListener("click", () => {

    optionsContainer.classList.add('hide')

    const numberOfQuestions = 10; 
    const API_URL = 'https://opentdb.com/api.php'
    const selectedCategory = document.getElementById("category").value;
    const selectedDifficulty = document.getElementById("difficulty").value;
    
    // Construire l'URL de la requête en fonction des options sélectionnées
    const apiUrl = `${API_URL}?amount=${numberOfQuestions}&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=multiple&lang=fr`;

    // Effectuer la requête API avec l'URL construit
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const quizArray = data.results.map(result => {
                return {
                    question: result.question,
                    options: [...result.incorrect_answers, result.correct_answer],
                    correct: result.correct_answer
                };
            });

            // Initialiser le quiz avec les questions récupérées
            startQuizWithQuestions(quizArray);

            window.onload = () => {
                // console.log("I'm here in window load")
                startScreen.classList.remove("hide");
                displayContainer.classList.add("hide");
                initial(quizArray);
            }
        
        
            restart.addEventListener("click", () => {
        
                initial(quizArray);
        
                displayContainer.classList.remove("hide");  
                scoreContainer.classList.add("hide");   
            }); 
        
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des questions depuis l\'API', error.message);
        });
});

function startQuizWithQuestions(quizArray) {

    startScreen.classList.add("hide");
    // console.log("DisplayContain : " + displayContainer)
    displayContainer.classList.remove("hide");

    initial(quizArray)
    
}




function initial(quizArray) {

    // console.log("We enter in initial function")

    // console.log("data in initial :", quizArray);

    quizContainer.innerHTML = "";
    questionCount = 0; 
    scoreCount = 0; 
    count = 11; 
    length = quizArray.length;

    clearInterval(countdown); 
    timerDisplay(quizArray); 
    quizCreater(quizArray);
    quizDisplay(questionCount);
}

nextBtn.addEventListener("click", (displayNext = (quizArray) => {

    questionCount += 1;


    if (questionCount == length) {
        displayContainer.classList.add("hide");
        scoreContainer.classList.remove("hide");
        userScore.innerHTML = "Votre Score est " + 
        scoreCount + " sur " + questionCount;
    } else {
        countOfQuestion.innerHTML = questionCount + 1 + " sur " + 
        length + " Questions"; 

        quizDisplay(questionCount);
        count = 11; 
        clearInterval(countdown); 
        timerDisplay(quizArray);
        }
    })
); 


const timerDisplay = (quizArray) => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext(quizArray);
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


function quizCreater(quizArray) {
    // console.log("quizCreater : " + quizArray[0].options)
    quizArray.sort(() => Math.random() - 0.5);
    // console.log("quizCreater : " + quizArray)


    for (let i of quizArray) {
        i.options.sort(() => Math.random() - 0.5); 
        let div = document.createElement("div"); 
        div.classList.add("container-mid", "hide");

        countOfQuestion.innerHTML = 1 + " sur " + length + " questions";

        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question"); 
        question_DIV.innerHTML = i.question; 
        div.appendChild(question_DIV);
        
        // console.log('i.true : ', i.correct)
        div.innerHTML +=   displayOptions(i, i.correct)
        

        quizContainer.appendChild(div)
    }
}

function displayOptions(question, correct) {
    // console.log("I'm here in displayOptions")
    return `
    <button class="options-div" onclick="checker(this, '${correct}')"> 
    ${question.options[0]}</button>

    <button class="options-div" onclick="checker(this, '${correct}')"> 
    ${question.options[1]}</button>

    <button class="options-div" onclick="checker(this, '${correct}')"> 
    ${question.options[2]}</button>

    <button class="options-div" onclick="checker(this, '${correct}')"> 
    ${question.options[3]}</button>
    
    `
}


function checker(userOption, correct) {

    // console.log('*****************************correct ******************************************* : ' + correct)
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












 