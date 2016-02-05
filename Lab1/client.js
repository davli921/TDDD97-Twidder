displayView = function(view) {
	displayError('');
	document.getElementById('windowContainer').innerHTML = document.getElementById(view).text;
    
};

window.onload = function() {
	if (sessionStorage.getItem("token") == null) {
		displayView('welcomeView');
	} else {
		displayView('profileView');
	}
};

var signup = function() {
	if (validateSignup()) {
		var signupForm = document.forms['signupForm'];
		var data = {
			email: signupForm['signupUsername'].value,
			password: signupForm['signupPassword1'].value,
			firstname: signupForm['firstname'].value,
			familyname: signupForm['familyname'].value,
			gender: signupForm['gender'].value,
			city: signupForm['city'].value,
			country: signupForm['country'].value
		};


		var signupUser = serverstub.signUp(data);
		if(!signupUser.success){
			displayError(signupUser.message);
		} else {
			displayError(signupUser.message); // How show message and wait?
			var tryToSignIn = serverstub.signIn(data.email, data.password);
			displayError(tryToSignIn.message);
			//---------------------------------------------------------------------------
			console.log(tryToSignIn.token);
			// Call window.onload ? Or not neccessary?
		}
	}
	return false;
};

var logIn = function() {
	var loginForm = document.forms['loginForm'];
	var email = loginForm['loginUsername'].value;
	var pass = loginForm['loginPassword'].value;

	var login = serverstub.signIn(email, pass);

	if (login.success) {
		sessionStorage.token = login.data;
		//----------------------------------------------
		console.log(token);
	} else {
		displayError(login.message);
	}
	return false;
};

var checkIfPasswordsMatch = function() {
	var signupForm = document.forms['signupForm'];
	var password1 = signupForm['signupPassword1']; 
	var password2 = signupForm['signupPassword2'];
	
	if (password1.value != password2.value) {
		displayError('Passwords must match.');
		return false;
	}
	return true;
};

function validateSignup() {
	displayError('');
	var signupForm = document.forms['signupForm'];
	var password1 = signupForm['signupPassword1']; 
	var password2 = signupForm['signupPassword2'];
	var email = signupForm['signupUsername']; 
	
	var data = {
		email:  signupForm['signupUsername'].value,
		password: signupForm['signupPassword1'].value,
		firstname: signupForm['firstname'].value,
		familyname: signupForm['familyname'].value,
		gender: signupForm['gender'].value,
		city: signupForm['city'].value,
		country: signupForm['country'].value
    };
	
	// Check email is valid, have @ etc
	
	
	if (password1.value.length < 6) {
		displayError('Password is too short');
		return false;
		}
	
	
	if (!checkIfPasswordsMatch()) {
		displayError('Passwords must match.');
		return false;
	}
		
	if (password1.value == email.value) {
		displayError('Password can not be equal to email');
		return false;
	}
	
	for (item in data) { // Check so that fields aren't empty. "Require" doesn't work in IE before IE7
			if (item == null || item == "") {
				displayError('All fields have to be filled');
				return false;
			}
	}	
	return true;
}

var displayError = function(error){
    var errorBox = document.getElementById('errorBox');
    errorBox.innerHTML = error;
    
    if(error == ''){
        errorBox.style.visibility = 'hidden';
    } else {
        errorBox.style.visibility = 'visible';
    }
};
