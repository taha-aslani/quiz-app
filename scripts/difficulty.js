const buttons = document.querySelectorAll('button');

const selectHandler = (event) => {
  const level = event.target.innerText.toLowerCase();

  Swal.fire({
    title: 'Are you sure?',
    text: 'You want to change difficulty to ' + level,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, change it!',
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.setItem('difficulty', level);

      Swal.fire({
        title: 'Changed',
        text: 'Difficulty level changed successfully to ' + level,
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
  });
};

buttons.forEach((button) => {
  button.addEventListener('click', selectHandler);
});
