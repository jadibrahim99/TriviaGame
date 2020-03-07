$(document).ready(function () {
    var options = [
        {
            question: "What NBA basketball teams has Lebron James played for", 
            choice: ["Cavaliers, Lakers, Heat", "Cavaliers, Celtics, Bulls", "Cavaliers, Lakers, New England Patriots", "Lebron James is a king, not a basketball player"],
            answer: 0,
            photo: "assets/images/KTFWLFGq_400x400.jpg"
         },
         {
             question: "Which current NFL player has the most super bowl rings?", 
            choice: ["Aaron Rodgers", "Ben Roethlisberger", "Jerry Jones", "Tom Brady"],
            answer: 3,
            photo: "assets/images/1TIpbAZP_400x400.jpg"
         }, 
         {
            question: "What NBA teams or team have won three NBA championships in a row?", 
            choice: ["Lakers", "Bulls", "Celtics", "Lakers and Bulls" ],
            answer: 3,
            photo: "assets/images/MJKobe_crop_north.jpg"
        }, 
        {
            question: "Which team sport has the highest average salary per player?", 
            choice: ["Baseball", "Football", "Basketball", "Soccer" ],
            answer: 3,
            photo: "assets/images/nba-282876.webp"
        }, 
        {
            question: "How many players can be on the floor at one time per team in basketball", 
            choice: ["5", "3", "6", "4" ],
            answer: 0,
            photo: "assets/images/BasketballPositions.png"
        }, 
        {
            question: "How many games are played in the NFL's regular season?", 
            choice: ["12", "82", "18", "16" ],
            answer: 3,
            photo: "assets/images/unnamed.png"
        }, 
        {
            question: "Which sport has the longest regular season?", 
            choice: ["Baseball", "Soccer", "Football", "Basketball" ],
            answer: 0,
            photo: "assets/images/3bd76f160bcb7b60e57c92f8f6bbf099.jpeg"
        }, 
        {
            question: "What is the most Embarrassing thing the cowboys have ever done as a franchise?", 
            choice: ["Hire Jason Garrett", "No Super Bowl Wins since 1996", "Getting knocked out of the first round after going 13-3", "Signed Tony Romo" ],
            answer: 1,
            photo: "assets/images/102416-NFL-Dallas-Cowboys-Tony-Romo-Snap.jpg"
        }];
    
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 20;
    var intervalId;
    var userGuess ="";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
    
    
    
    $("#reset").hide();
    //click start button to start game
    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
    }
        })
    //timer start
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }
    //timer countdown
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
    
        //stop timer if reach 0
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }	
    }
    
    //timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    //randomly pick question in array if not already shown
    //display question and loop though and display possible answers
    function displayQuestion() {
        //generate random index in array
        index = Math.floor(Math.random()*options.length);
        pick = options[index];
    
            //iterate through answer array and display
            $("#questionblock").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choice[i]);
                //assign array position to it so can check answer
                userChoice.attr("data-guessvalue", i);
                $("#answerblock").append(userChoice);
    
    }
    
    
    
    //click function to select answer and outcomes
    $(".answerchoice").on("click", function () {
        //grab array position from userGuess
        userGuess = parseInt($(this).attr("data-guessvalue"));
    
        //correct guess or wrong guess outcomes
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $("#answerblock").html("<p>Correct!</p>");
            hidepicture();
    
        } else {
            stop();
            wrongCount++;
            userGuess="";
            $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    })
    }
    
    
    function hidepicture () {
        $("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index,1);
    
        var hidepic = setTimeout(function() {
            $("#answerblock").empty();
            timer= 20;
    
        //run the score screen if all questions answered
        if ((wrongCount + correctCount + unanswerCount) === qCount) {
            $("#questionblock").empty();
            $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
            $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
            $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
            $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
            $("#reset").show();
            correctCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
    
        } else {
            runTimer();
            displayQuestion();
    
        }
        }, 3000);
    
    
    }
    
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for(var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    
    })
    
    })