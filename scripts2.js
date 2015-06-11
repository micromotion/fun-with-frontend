
if (localStorage.score != null) {
	var scoreSaver = JSON.parse(localStorage.score);
}

var questionIndex = 0;
var questionNumber = 1;
var answers = []; // Answer array
var Questions = []; // Array of random generated questions
var questionPool = [ // QuestionPool array
	["What's the capital of Russia?", "Moscow"],
	["What's the capital of Turkey?", "Ankara"],
	["What's the capital of Canada?", "Ottawa"],
	["What's the capital of Hungary?", "Budapest"],
	["What's the capital of Algeria?", "Alger"],
	["What's the capital of Belgium?", "Brussels"],
	["What's the capital of Finland?", "Helsinki"],
	["What's the binary '1100' converted to decimals?", "12"],
	["How many days in a year?", "365"],
	["Can soap get dirty?", "Yes"],
	["Are tomatoes legally defined as fruits or vegetables?", "Vegetables"],
	["Is this the greatest quiz in the world?", "Yes"],
	["Name of athlete with most olympic medals?", "Michael Phelps"],
	["What's the worlds most trafficated website?", "Google"],
	["What's the best selling video game of all time?", "Wii Sports"],
	["Finish the phrase: 'A drop in the...'", "Ocean"],
	["Finish the phrase: 'A wolf in sheep's...'", "Clothing"],
	["What year did the allies attack Normandy in World war 2?", "1944"],
	["What animal has the world strongest bite?", "Crocodile"]
];

/* Randomly pick 10 questions */
function randomize() {
	var usedNumbers = []; // store used random numbers
	
	for (i = 0; i < 10; i++) {
		var randomNumber = Math.floor((Math.random()*19)); // Number between 0-18
		if($.inArray(randomNumber, usedNumbers) < 0) {
			Questions.push(questionPool[randomNumber]);
			usedNumbers.push(randomNumber);
		}else {
			i--;
		}
	}
	showQuestion();
}
/* An answer has been given */
function answer(ans) {
	ans = ans.toLowerCase().trim();
	answers.push(ans); // Insert answer in answer array

	if (questionIndex === Questions.length - 1) { // If no questions left
		
		var correctAnswers = 0;
		for (i = 0; i < Questions.length; i++) { // Loop through correct and given answers
			if (Questions[i][1].toLowerCase().trim() === answers[i]) { // Compare arrays to see if correct answer matches given answer
				correctAnswers += 1; 	
			}
		}
		var gameOver = 'The quiz is over. You had ' + correctAnswers + ' / ' + Questions.length + ' correct answers.';
		$('#question').text(gameOver); // Print gameover string

		if (scoreSaver != undefined) { // Very ugly Fulhack
			scoreSaver.push(correctAnswers);
			localStorage.score = JSON.stringify(scoreSaver);
		} else {
			var standin = [];
			standin.push(correctAnswers);
			localStorage.score = JSON.stringify(standin);
		}

		showFacit(); // Call facit function 
		answers = []; 
		Questions = [];
		$('#answerButton').prop('disabled', true); 
		$('#answerButton').addClass('disabledButton');
		$('#answer').prop('disabled', true);
	} else { // If there's questions left
		questionIndex += 1;
		showQuestion();
	}	
}

/* Shows the next question */
function showQuestion() {
	$('#answer').text(''); // Reset user input
	$('#answer').focus();
	$('#question').text(questionNumber + '. ' + Questions[questionIndex][0]); // Print question
	questionNumber++;
}

/* Shows facit and given answers */
function showFacit() {
	$('#facit').empty();
	for (i = 0; i < Questions.length; i++) {
		$('<h3>').text(i + 1 + '. ' + Questions[i][0]).appendTo($('#facit'));
		$('<p>').text('Correct answer: ' + Questions[i][1]).appendTo($('#facit'));
		$('<p>').text('You said: ' + answers[i]).appendTo($('#facit'));
	}
	$('#facit').show();
}

/* Shows score saved in webstorage */
function showScore() {
	$('#user').text(localStorage.username); 
	if (localStorage.score != null) {
		var getScore = JSON.parse(localStorage.score);
		getScore.sort(function(a,b) {return b-a});
		for (i = 0; i < getScore.length; i++) {
			$('<p>').text(i + 1 + '. Correct answers: ' + getScore[i] + ' / 10').appendTo($('#showScore'));
		}
	} else {
		$('<p>').text('You have no score yet.').appendTo($('#myScore'));
	}
	$('#questionBox').hide();
	$('#facit').hide();
	$('#myScore').show();
	$('#showScore').show();
}	

/* Restart quiz */
function restart() {
	$('#answerButton').prop('disabled', false);
	$('#answer').prop('disabled', false);

	questionIndex = 0;
	answers = [];
	Questions = [];
	questionNumber = 1;
	location.reload();
}


$(function() { // Call when html is fully loaded


	randomize();

	$('#myScore').hide();
	$('#facit').hide();
	$('#highscore').removeClass('active');

	$('#answerButton').click(function(event) { 
		event.preventDefault();	
		$('#answer').focus();
		if (questionNumber <= 10) {	
			$('#questionBox').slideUp(300, function() {
				answer($('#answer').val());
				$('#answer').val('');
			});
			$('#questionBox').slideDown(300);
		} else {
			answer($('#answer').val());
			$('#answer').val('');
		}
	}); // End click, call answer function

	$('#restartButton').click(function(event) {
		event.preventDefault();
		restart();
	}); // End click, call restart function

	$('#highscore').click(function(event) {
		event.preventDefault();
		$('#showScore').empty();
		$('a').removeClass('active');
		$('#highscore').addClass('active');
		showScore();
	});
});