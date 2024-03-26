document.addEventListener("DOMContentLoaded", function() {
  displayCountdown();
  document.querySelector("#question1-yes").addEventListener("click", showQuestionare);
  document.querySelector("#question1-no").addEventListener("click", hideQuestionare);
});

function displayCountdown() {
  let countDownDisplay = document.querySelector("#countdown")

  let countDownDate = new Date("September 20, 2025 15:00:00").getTime();

  let x = setInterval(function() {
    let now = new Date().getTime();
    let distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24))
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countDownDisplay.innerHTML = "<span class='days'>" + days +  " <label>Days</label></span> <span class='hours'>" + hours + " <label>Hours</label></span> <span class='minutes'>"
    + minutes + " <label>Minutes</label></span> <span class='seconds'>" + seconds + " <label>Seconds</label></span>";

    if (distance < 0) {
      clearInterval(x);
      countDownDisplay.innerHTML = "Wedding started!";
    }
  }, 1000);
}

function showQuestionare() {
  document.querySelector(".attendee1").style.display = "block";
}

function hideQuestionare() {
  document.querySelector(".attendee1").style.display = "none";
}