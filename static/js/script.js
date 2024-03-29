
document.addEventListener("DOMContentLoaded", function() {
  displayCountdown();

// event listeners related to the questionare
  hideQuestionare()
  document.querySelector("#question-attend-yes").addEventListener("click", showQuestionare);
  document.querySelector("#question-attend-no").addEventListener("click", hideQuestionare);

  document.querySelector("#question-partner-yes").addEventListener("click", showPartnerInfo);
  document.querySelector("#question-partner-no").addEventListener("click", hidePartnerInfo);

  document.querySelector("#question-have-allergies-yes").addEventListener("click", showAllergiesInput);
  document.querySelector("#question-have-allergies-no").addEventListener("click", hideAllergiesInput);

  document.querySelector("#question-partner-have-allergies-yes").addEventListener("click", showPartnerAllergiesInput);
  document.querySelector("#question-partner-have-allergies-no").addEventListener("click", hidePartnerAllergiesInput);

  // if form validation fails, prevent submittion
  document.querySelector("#form-questionare").addEventListener("submit", function(event) {
    if (!validateUserInput()) {
      event.preventDefault();
    }
  });
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
  const list = [document.querySelector(".question-allergies"),
                document.querySelector(".question-partner-name"),
                document.querySelector(".question-partner-have-allergies"),
                document.querySelector(".question-partner-allergies")];

  document.querySelector("#questionare-description").style.display = "block";

  for (let question of  document.querySelectorAll(".question")) {
    if (!(list.includes(question))) {
      question.style.display = "block";
    }
  }
  
}
 
function hideQuestionare() {
  document.querySelector("#questionare-description").style.display = "none";
  for (let question of  document.querySelectorAll(".question")) {
    question.style.display = "none";
  }
}

function showAllergiesInput() {
  document.querySelector(".question-allergies").style.display="block";
}

function hideAllergiesInput() {
  document.querySelector("#allergies").value="";
  document.querySelector(".question-allergies").style.display="none";
}

function showPartnerInfo() {
  document.querySelector(".question-partner-name").style.display = "block";
  document.querySelector(".question-partner-have-allergies").style.display = "block";
}

function hidePartnerInfo() {
  document.querySelector("#partner-name").value="";
  document.querySelector(".question-partner-name").style.display = "none";
  document.querySelector(".question-partner-have-allergies").style.display = "none";
  hidePartnerAllergiesInput()
}

function showPartnerAllergiesInput() {
  document.querySelector(".question-partner-allergies").style.display = "block";
}

function hidePartnerAllergiesInput() {
  document.querySelector("#partner-allergies").value="";
  document.querySelector(".question-partner-allergies").style.display = "none";
}

function validateUserInput(event) {

  // check if first answer is checked
  if (!document.querySelector("#question-attend-yes").checked && !document.querySelector("#question-attend-no").checked) {
    showAlert();
    return false;
  }

  if (document.querySelector("#question-attend-no").checked) {
    return true;
  }

  // check if name is filled out and valid
  if (!checkName()) {
    return false;
  }

  // check if third answer is checked
  if (!document.querySelector("#question-have-allergies-yes").checked && !document.querySelector("#question-have-allergies-no").checked) {
    document.querySelector("#apology-allergies").style.display = "block";
    return false;
  }
  
  // check if third answer is checked


    // check if allergies field is filled
  return true;
}

function showAlert() {
  document.querySelector("#alert-collapse").classList.remove("hide");
  document.querySelector("#alert-collapse").classList.add("show");
}