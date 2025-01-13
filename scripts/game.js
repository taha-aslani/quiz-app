import { formatData } from './helper.js';
const loader = document.getElementById('loader');
const container = document.getElementById('container');
const questionText = document.getElementById('question-text');
const answerButtons = document.querySelectorAll('.answer-text');
const scoreText = document.getElementById('score');
const nextButton = document.getElementById('next-button');
const questionNumberText = document.getElementById('question-number');
const finishButton = document.getElementById('finish-button');
const errText = document.getElementById('error');
const level = localStorage.getItem('difficulty') || 'medium';
let formattedData = null;
let questionIndex = 0;
let correctAnswer = null;
let score = 0;
let isAccepted = true;

const CORRECT_BONUS = 10;
const URL = `https://opentdb.com/api.php?amount=10&difficulty=${level}&type=multiple`;

const fetchData = async () => {
  try {
    const res = await fetch(URL);
    const json = await res.json();
    formattedData = formatData(json.results);
    start();
  } catch (e) {
    console.log('There was an error!\n' + e);
    loader.style.display = 'none';
    errText.style.display = 'block';
    setTimeout(() => window.location.reload(), 10_000);
  }
};

const start = () => {
  showQuestion();
  loader.style.display = 'none';
  container.style.display = 'block';
};

const showQuestion = () => {
  questionNumberText.innerText = questionIndex + 1;
  const { question, answers, correctAnswerIndex } =
    formattedData[questionIndex];
  correctAnswer = correctAnswerIndex;
  questionText.innerHTML = question;
  answerButtons.forEach((button, index) => {
    button.innerHTML = answers[index];
  });
};

const checkAnswer = (event, index) => {
  if (!isAccepted) return;
  isAccepted = false;
  if (correctAnswer === index) {
    event.target.classList.add('correct');
    score += CORRECT_BONUS;
    scoreText.innerText = score;
  } else {
    event.target.classList.add('incorrect');
    answerButtons[correctAnswer].classList.add('correct');
  }
};

const nextHandler = () => {
  questionIndex++;
  if (questionIndex < formattedData.length) {
    removeClasses();
    showQuestion();
    isAccepted = true;
  } else {
    finishHandler();
  }
};

const removeClasses = () => {
  answerButtons.forEach((button) => (button.className = 'answer-text'));
};

const finishHandler = () => {
  Swal.fire({
    title: 'Finished',
    text: "You've successfully finished quiz! Your Score: " + score,
    icon: 'success',
    showCancelButton: false,
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'OK!',
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.setItem('score', JSON.stringify(score));
      window.location.assign('/end.html');
    }
  });
};

window.addEventListener('load', fetchData);
nextButton.addEventListener('click', nextHandler);
finishButton.addEventListener('click', finishHandler);
answerButtons.forEach((button, index) => {
  button.addEventListener('click', (event) => checkAnswer(event, index));
});
