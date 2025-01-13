const input = document.querySelector('input');
const saveButton = document.querySelector('button');
const scoreText = document.querySelector('p');
const score = 0 || JSON.parse(localStorage.getItem('score'));
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const showScore = () => {
  scoreText.innerText = score;
};

const saveHandler = () => {
  if (!score || !input.value) {
    Swal.fire({
      title: 'Error',
      text: 'Invalid score or username!',
      icon: 'error',
    });
  } else {
    const finalScore = { name: input.value, score };
    highScores.push(finalScore);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(10);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    localStorage.removeItem('score');

    Swal.fire({
      title: 'Saved',
      text: 'Successfully saved your score! Your Score: ' + score,
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK!',
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.assign('/');
      }
    });
  }
};

window.addEventListener('load', showScore);
saveButton.addEventListener('click', saveHandler);
