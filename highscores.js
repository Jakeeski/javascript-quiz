let highScoresList = document.querySelector("#highScoresList");
let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoresList.innerHTML = highScores
  .map((score) => {
    return `<li>${score.name} - ${score.score}</li>`;
  })
  .join("");
