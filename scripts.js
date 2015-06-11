$(function() {
	$(':text:first').focus();

	/*------Log in function-----*/
	$('#submit').click(function(event) { // When user log in
		
		var username = $('#username').val();
		var email = $('#email').val();
		var userValidated = true;
		var emailValidated = true;

		if (username.length < 7) { // If username is less thar 7 characters
			$('#usernameResponse').text('Username must be at least 6 characters.').addClass('verifiedFalse');
			userValidated = false;
		}

		if (!email.match(/\S+@\S+\.\S+/)) { // If email format is incorrect
			$('#emailResponse').text('Enter a valid email adress.').addClass('verifiedFalse');
			emailValidated = false;
		}

		if(userValidated == false || emailValidated == false) { // If user input variable didn't validate, prevent form from action
			event.preventDefault();
		} else {
			localStorage.username = username;
		}
	});

	$('#username').change(function() {
		$('#usernameResponse').text('');
	});

	$('#email').change(function() {
		$('#emailResponse').text('');
	});


});
