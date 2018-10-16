var
  answers = ["Oregon", "Sacramento", "1850", "Ninth largest", "Largest", "Jerry Brown"],
  data = $("input"),
  correctAnswers = 0,
  incorrectAnswers = 0,
  unanswered = 0,
  timer = 60;

function start() {
  $(".quiz").css("display", "none");
  for (var i = 0; i < data.length; i++) {

    if (data[i].checked) {

      if (answers.indexOf(data[i].value) !== -1) {
        correctAnswers++;
        console.log(correctAnswers);
      }

      else {
        incorrectAnswers++;
        console.log(incorrectAnswers);
      }
    }
  }
  var sum = correctAnswers + incorrectAnswers;

  if (sum !== 4) {
    unanswered = 4 - sum;
  }

  $(".correct").html("Correct Answers: " + correctAnswers);
  $(".incorrect").html("Incorrect Answers: " + incorrectAnswers);
  $(".unanswered").html("Unanswered: " + unanswered);
  $(".sum").addClass("stylish");
}

$(".startButton").on("click", function () {
  $(".startButton").css("display", "none");
  $(".quiz").css("display", "block");


  var startTimer = setInterval(function () {
    timer--;


    if (timer > 59) {
      $(".timeRemaining").html(timer);
    }

    else if (timer <= 59) {
      $(".timeRemaining").html(timer);
    }


    if (timer <= 0) {
      clearInterval(startTimer);
      startGame();

    }
  }, 60000);


  $(".stopButton").on("click", function () {
    clearInterval(startTimer);
    alert(correctAnswers, incorrectAnswers, unanswered);
    start();
  });
}); 
