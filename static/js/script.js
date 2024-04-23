
document.addEventListener("DOMContentLoaded", function() {

  displayCountdown();

  // CHECK FOR SUCCESS MESSAGE WHEN PAGE LOADS
  const successMessage = localStorage.getItem('successMessage');
  if (successMessage) {
    displaySuccess(successMessage);
    localStorage.removeItem('successMessage');
  }

  // FORM RELATED FUNCTIONS
  hideQuestionare();
  listenForRadioButtonClick();
  checkFieldNotEmpty();
  listenForFormSubmittion();
});

function displayCountdown() {
  let countDownDisplay = document.querySelector(".countdown")

  let countDownDate = new Date("September 20, 2025 15:00:00").getTime();

  // update the countdown every second
  let x = setInterval(function() {
    let now = new Date().getTime();
    let distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24))
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countDownDisplay.innerHTML = 
    "<span class='countdown-span days'>" + days +  " <label>Days</label></span>" +
    "<span class='countdown-span hours'>" + hours + " <label>Hours</label></span>" +
    "<span class='countdown-span minutes'>" + minutes + " <label>Minutes</label></span>" +
    "<span class='countdown-span seconds'>" + seconds + " <label>Seconds</label></span>";

    if (distance < 0) {
      clearInterval(x);
      countDownDisplay.innerHTML = "Wedding started!";
    }
  }, 1000);
}

function displaySuccess(message) {
  document.querySelector("#alert-collapse").classList.add("success");
    showAlert(message);
    setTimeout(function() {
      document.querySelector("#alert-collapse").classList.remove("success");
    }, 3000);
}

function listenForRadioButtonClick() {
  const RADIO_BUTTONS = [
    document.querySelector("#question-attend-yes"),
    document.querySelector("#question-attend-no"),
    document.querySelector("#question-partner-yes"),
    document.querySelector("#question-partner-no"),
    document.querySelector("#question-have-allergies-yes"),
    document.querySelector("#question-have-allergies-no"),
    document.querySelector("#question-partner-have-allergies-yes"),
    document.querySelector("#question-partner-have-allergies-no")
  ];

  for (let rb of RADIO_BUTTONS) {
    rb.addEventListener("click", function() {
      if (rb == document.querySelector("#question-attend-yes"))
        showQuestionare();
      else if (rb == document.querySelector("#question-attend-no"))
        hideQuestionare();
      else if (rb == document.querySelector("#question-partner-yes"))
        showPartnerInfo();
      else if (rb == document.querySelector("#question-partner-no"))
        hidePartnerInfo();
      else if (rb == document.querySelector("#question-have-allergies-yes"))
        showAllergiesInput();
      else if (rb == document.querySelector("#question-have-allergies-no"))
        hideAllergiesInput();
      else if (rb == document.querySelector("#question-partner-have-allergies-yes"))
        showPartnerAllergiesInput();
      else if (rb == document.querySelector("#question-partner-have-allergies-no"))
        hidePartnerAllergiesInput();
    });
  }
}

function showQuestionare() {
  const list = [
                document.querySelector(".question-name"),
                document.querySelector(".question-allergies"),
                document.querySelector(".question-partner-name"),
                document.querySelector(".question-partner-have-allergies"),
                document.querySelector(".question-partner-allergies")
  ];

  document.querySelector("#questionare-description").style.display = "block";

  for (let question of  document.querySelectorAll(".question")) {
    if (!(list.includes(question))) {
      question.style.display = "block";
    }
  }
  
}
  
function hideQuestionare() {
  for (let question of  document.querySelectorAll(".question")) {
    if (question != document.querySelector(".question-name") && question != document.querySelector(".question-attend")) {
      question.style.display = "none";
    }
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

/* === VALIDATION === */
function validateUserInput(event) {

  let invalid = false;

  if (!checkField("#name")) {
    invalid = true;
  }

  if (!isAnswerChecked("#question-attend-yes", "#question-attend-no")) {
    invalid = true;
  }

  if (document.querySelector("#question-attend-yes").checked) {
    if (!isAnswerChecked("#question-have-allergies-yes", "#question-have-allergies-no")) {
      invalid = true;
    }

    if (document.querySelector("#question-have-allergies-yes").checked) {
      if (!checkField("#allergies")) {
      invalid = true;
      }
    }

    if (!isAnswerChecked("#question-partner-yes", "#question-partner-no")) {
      invalid = true;
    }

    if (document.querySelector("#question-partner-yes").checked) {
      if (!checkField("#partner-name")) {
        invalid = true;
      }
      if (!isAnswerChecked("#question-partner-have-allergies-yes", "#question-partner-have-allergies-no")) {
        invalid = true;
      }
      if (document.querySelector("#question-partner-have-allergies-yes").checked) {
        if (!checkField("#partner-allergies")) {
          invalid = true;
        }
      }
    }
    if (!isAnswerChecked("#question-accommodation-yes", "#question-accommodation-no")) {
      invalid = true;
    }
  }

  if (invalid) {
    showAlert("Please asnwer every question");
    return false;
  }  
  return true;
}

function isAnswerChecked(radioButtonId1, radioButtonId2) {
  if (!document.querySelector(radioButtonId1).checked && !document.querySelector(radioButtonId2).checked) {
    return false;
  }
  return true;
}

function showAlert(message) {
  document.querySelector("#alert-message").innerHTML = message;
  document.querySelector("#alert-collapse").classList.add("show");

  setTimeout(function() {document.querySelector("#alert-collapse").classList.remove("show")}, 3000);
}

function checkField(fieldId) {
  if (document.querySelector(fieldId).value.trim() == "") {
    document.querySelector(fieldId).style.borderColor = "red";
    return false;
  }
  return true;
}

function checkFieldNotEmpty() {
  const TEXT_FIELDS = [
    document.querySelector("#name"), 
    document.querySelector("#allergies"), 
    document.querySelector("#partner-name"), 
    document.querySelector("#partner-allergies")
  ];

  for (let field of TEXT_FIELDS) {
    field.addEventListener("input", function() {
      if(field.value.trim() != "") {
        resetFieldStyle(field);
      }
    });
  }
}

function resetFieldStyle(field) {
  field.style.borderColor = "var(--bs-body-bg)";
}


function listenForFormSubmittion() {
  document.querySelector("#form-questionare").addEventListener("submit", function(event) {
    // if form validation fails, prevent submittion
    if (!validateUserInput()) {
      event.preventDefault();
    }
    else {
      localStorage.setItem("successMessage", "Form submitted successfully!");
    }
  });
}