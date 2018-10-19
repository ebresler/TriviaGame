// initialize page
$(document).ready(function(){
  
// event listeners
   $("#remaining-time").hide();
   $("#start").on('click', trivia.startGame);
   $(document).on('click' , '.option', trivia.guessChecker);
    
  })
// game properties and data  
  var trivia = {
    correct: 0,
    incorrect: 0,
    // unanswered: 0,
    currentSet: 0,
    timer: " ",
    timerOn: false,
    timerId : " ",

    questions: {
      question1: "What State borders California to the North?",
      question2: "What city is California's state capital?",
      question3: "What year was California founded?",
      question4: "If California were a country, where would its economy rank in the world?",
      question5: "Where does California rank in population compared to all the other states?",
      question6: "Who is the current governor of California?",
    },

    answerOptions: {
      question1: ["Washington", "Montana", "Oregon", "Idaho"],
      question2: ["San Francisco", "Sacramento", "Los Angeles", "San Diego"],
      question3: ["1850", "1790", "1813", "1855"],
      question4: ["Ninth Largest", "Eigth Largest", "Seventh Largest", "Sixth Largest"],
      question5: ["Fourth Largest", "Third Largest", "Second Largest", "Largest"],
      question6: ["Jim Brown","Jerry Brown","Justin Brown","Joseph Brown"],
    },

    correctAnswers: {
      question1: "Oregon",
      question2: "Sacramento",
      question3: "1855",
      question4: "Ninth Largest",
      question5: "Largest",
      question6: "Jerry Brown",
    },

    // initialize game function and reset game results
    startGame: function(){
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      // trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      
      // show game div
      $("#game").show();
      
      // clear results
      $("#results").html('');
      
      // show timer
      $("#timer").html(trivia.timer);
      
      // remove start button
      $("#start").hide();
  
      // display remaining time
      $("#remaining-time").show();
      
      // ask first question
      trivia.nextQuestion();
      
    },
    // function to loop through and display questions and options 
    nextQuestion:function(){
      
      // set timer to 10 seconds each question
      trivia.timer = 10;
        $("#timer").removeClass("last-seconds");
        $("#timer").text(trivia.timer);
      
      // set timer interval
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
      
      // grabs question from trivia object
      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $("#question").text(questionContent);
      
      // grabs answer options for current question in trivia object and creates buttons
      var questionOptions = Object.values(trivia.answerOptions)[trivia.currentSet];
      $.each(questionOptions, function(index, key){
        $("#options").append($('<button class="option btn btn-warning btn-lg">'+key+'</button>'));
      })
      
    },
    // function to decrease counter and count unanswered if timer runs out
    timerRunning:function(){
      // run timer
      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $("#timer").html(trivia.timer);
        trivia.timer--;
          // show red timer clock at 5 seconds left          
          if(trivia.timer === 4){
            $("#timer").addClass("last-seconds");
          }
      }
      // Increase unanswered if timer runs out, display correct answer, clear 
      else if(trivia.timer === -1){
        trivia.incorrect++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 2500);
        $("#results").html('<h3>Times up! The correct answer is '+ Object.values(trivia.correctAnswers)[trivia.currentSet] +'</h3>');
      }
      // end game when all questions answered and show results
      else if(trivia.currentSet === Object.keys(trivia.questions).length){

        var iNum = ((trivia.correct/6)*100);
        
        $("#results")
          .html("<h3>Thank you for playing!</h3>"+
          "<p>Total: 6</p>"+
          "<p>Correct: "+ trivia.correct +"</p>"+
          "<p>Incorrect: "+ trivia.incorrect +"</p>"+
          "<p>Total Score: "+ iNum +"%</p>");
        
        // hide game sction
        $("#game").hide();
        
        // show start button to begin a new game
        $("#start").show();
      }
      
    },
    // function to check the answer option clicked
    guessChecker : function() {
      var resultId;
      
      // the answer to the current question being asked
      var currentAnswer = Object.values(trivia.correctAnswers)[trivia.currentSet];
      
      // if the user chooses correct guess, increase correct
      if($(this).text() === currentAnswer){
        // turn button green for correct
        $(this).addClass("btn-success").removeClass("btn-warning");
        
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 2500);
        $("#results").html("<h3>Correct Answer!</h3>");
      }
      // else increase incorrect
      else{
        // turn button clicked red for incorrect
        $(this).addClass('btn-danger').removeClass('btn-warning');
        
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 2500);
        $("#results").html('<h3>Not quite. The correct answer is '+ currentAnswer +'.</h3>');
      }
      
    },
    // function to remove current question data and move to next question
    guessResult:function(){
      
      // move to next question in Trivia object
      trivia.currentSet++;
      
      // remove the options and results
      $(".option").remove();
      $("#results h3").remove();
    
      // begin next question
      trivia.nextQuestion();
       
    },
  }