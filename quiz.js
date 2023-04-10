let question = document.querySelector("#question");
let scoreText = document.querySelector("#score");
let questionProgress = document.querySelector("#question-progress");
let timeEl = document.querySelector(".time");

let options = Array.from(document.querySelectorAll(".option-text"));

let currentQuestion = {};
let avaiableQuestions = [];

let timeLeft = 31;
let acceptingAnswers = true;
let questionCounter = 0; //keeps track of how many questions have been asked
let score = 0;
let incrementScore = 0;

const SCORE_TOTAL = 0;
const SCORE_POINTS = 25; //how many points will go up at a time
const MAX_QUESTIONS = 5;

//Array of questions
let questions = [
  {
    question: "What is the best holiday?",
    option1: "Christmas",
    option2: "Halloween",
    option3: "Easter",
    option4: "Valentine's Day",
    answer: 2,
  },
  {
    question: "What is the best cat breed?",
    option1: "Ragdoll",
    option2: "Siamese",
    option3: "Sphynx",
    option4: "Persian",
    answer: 3,
  },
  {
    question: "What is the best dog breed?",
    option1: "Husky",
    option2: "Pug",
    option3: "Bulldog",
    option4: "Poodle",
    answer: 1,
  },
  {
    question: "What is the best color?",
    option1: "Red",
    option2: "Blue",
    option3: "Green",
    option4: "Yellow",
    answer: 2,
  },
  {
    question: "What is the best drink?",
    option1: "Coffee",
    option2: "Tea",
    option3: "Water",
    option4: "Lemonade",
    answer: 4,
  },
];

//Timer countdown
// this would be if time was set as global variable and would be inside the event function; if (buttonEl.value !== questions[currentQuestionsIndex].answer)
// time -=15;
function setTime() {
  var timerInterval = setInterval(function () {
    timeLeft--;
    timeEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
}

//Quiz Starts
function startQuiz() {
  // this will start the quiz, with the question counter reading 0, and the score reading 0 to start. It will then
  questionCounter = 0;
  score = 0;
  avaiableQuestions = [...questions];
  setTime();
  startNextQuestion();
}

//Question Loads
function startNextQuestion() {
  //if there's no more questions available, or the question counter has reached the max, game will save score to local storage, and direct user to end page.
  if (
    avaiableQuestions.length === 0 ||
    questionCounter > MAX_QUESTIONS ||
    timeLeft <= 0
  ) {
    localStorage.getItem("lastScore", score);
    return window.location.assign("./end.html");
  }

  questionCounter++; //question counter goes up by 1
  questionProgress.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`; //gives you progress of questions. For example, 1 out of 4, 2 out of 4. This does the math for you.

  let questionsIndex = Math.floor(Math.random() * avaiableQuestions.length); //gives us index value of question

  currentQuestion = avaiableQuestions[questionsIndex]; //checks for questions not used yet
  question.innerText = currentQuestion.question; //checks which question to display for user

  options.forEach((option) => {
    let number = option.dataset["number"];
    option.innerText = currentQuestion["option" + number];
  });

  avaiableQuestions.splice(questionsIndex, 1);
  acceptingAnswers = true;
}

//JS works through each option, checks if the answer is part of acceptingAnswers
options.forEach((option) => {
  option.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    let selectedOption = e.target;
    let selectedAnswer = selectedOption.dataset["number"];

    console.log(selectedAnswer); // Get option

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore += SCORE_POINTS;
      console.log(incrementScore);
      scoreText.textContent = incrementScore;
    } else timeLeft -= 5;

    startNextQuestion();
  });
});

function endGame() {
  localStorage.getItem("lastScore", score);
  return window.location.assign("./end.html");
}

//starts the quiz on page load.
startQuiz();
