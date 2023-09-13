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
let length = 0;


// Treatement of API 

const API_URL = 'https://opentdb.com/api.php';

// Query parameters
const category = 20; 
const difficulty = 'easy'; 
const numberOfQuestions = 3; 

// Construire l'URL de la requête
const apiUrl = `${API_URL}?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}&type=multiple&lang=fr`;


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


    window.onload = () => {
        // console.log("I'm here in window load")
        startScreen.classList.remove("hide");
        displayContainer.classList.add("hide");
        initial(quizArray);
    }
    


    startQuiz = () => {
        // console.log("I'm here")
        startScreen.classList.add("hide");
        // console.log("DisplayContain : " + displayContainer)
        displayContainer.classList.remove("hide");
    
        // console.log("point : 2");
        initial(quizArray);
    };

    restart.addEventListener("click", () => {

        initial(quizArray);

        displayContainer.classList.remove("hide");  
        scoreContainer.classList.add("hide");   
    }); 
    

    // If we want the new questions to be generated upon restart, we will uncomment this code which will call a new version from the API
    
    
    // fetch(apiUrl)
    //   .then(response => response.json())
    //   .then(data => {
        
    //     const quizArray = data.results.map(result => {
    //       return {
    //         question: result.question,
    //         options: [...result.incorrect_answers, result.correct_answer],
    //         correct: result.correct_answer
    //       };
    //     });
    //     initial(quizArray);
        
    //   })
    //   .catch(error => {
    //     console.error('Erreur lors de la récupération des questions depuis l\'API', error);
    //   });

        
    //     displayContainer.classList.remove("hide");  
    //     scoreContainer.classList.add("hide");   
    // }); 

})

.catch(error => {
    console.error('Erreur lors de la récupération des questions depuis l\'API', error.message);


})





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
        
        console.log('i.true : ', i.correct)
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












 