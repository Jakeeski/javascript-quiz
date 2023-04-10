let initials = document.querySelector("#initials");
let saveScoreButton = document.querySelector("#saveScoreButton");
let finalScore = document.querySelector("#finalScore");
let lastScore = localStorage.getItem("lastScore");

let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = lastScore;

saveHighScore = (e) => {
  e.preventDefault();
  let score = {
    score: lastScore,
    name: initials.value,
  };

  highScores.push(score);

  highScores.splice(5);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign("./index.html");
};
