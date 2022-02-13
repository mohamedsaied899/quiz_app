
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-button');

let shuffledQuestion, currentQuestionIndex;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
})

function startGame(){
    startButton.classList.add('hide');
    shuffledQuestion = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainer.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion(){
    resetState();
    showQuestion(shuffledQuestion[currentQuestionIndex]);
}

function showQuestion(question){
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button)
    })
}

function resetState(){
    clearStatusClass(document.body)
    nextButton.classList.add('hide');
    while(answerButtonsElement.firstChild){
        nextButton.classList.add('hide');
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e){
    const selectButton = e.target;
    const correct = selectButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button =>{
        setStatusClass(button, button.dataset.correct)
    })
    if(shuffledQuestion.length > currentQuestionIndex + 1){
        nextButton.classList.remove('hide');
    }else{
        startButton.innerText = "Restart";
        startButton.classList.remove('hide');
    }
}

function setStatusClass(element, correct){
    clearStatusClass(element)
    if(correct){
        element.classList.add('correct')
    }else{
        element.classList.add('wrong')
    }
}

function clearStatusClass(element){
        element.classList.remove('correct')
        element.classList.remove('wrong')
}

const questions = [
    {
        question: "what is 2 + 2",
        answers: [
            {text: 4, correct: true},
            {text: 6, correct: false}
        ]
    },
    {
        question: "what is 3 + 2",
        answers: [
            {text: 5, correct: true},
            {text: 6, correct: false}
        ]
    },
    {
        question: "what is 7 * 2",
        answers: [
            {text: 16, correct: false},
            {text: 14, correct: true}
        ]
    },
    {
        question: "what is 10 - 2",
        answers: [
            {text: 8, correct: true},
            {text: 7, correct: false}
        ]
    },
    {
        question: "what is 5 + 5",
        answers: [
            {text: 12, correct: false},
            {text: 10, correct: true}
        ]
    }
]