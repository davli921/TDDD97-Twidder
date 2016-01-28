//package TDDD97.Lab1;
/*
extern class DisposableEmails {
	public function new():Void;
	public function isValid(string):Bool;
}; */

	
displayView = function(view) {
	//the code required to display a view
	displayError('');
	document.getElementById('windowContainer').innerHTML = document.getElementById('welcomeView').text;
    
};
window.onload = function() {
	//code that is executed as the page is loaded
	//you shall put your own custom code here
	//window.alert("Hello TDDD97!");
	displayView('welcomeView');
};

var signup = function() {
	if (validateSignup) {
		var signupForm = document.forms['signupForm'];
		var data = {
			email:  signupForm['signupUsername'].value,
			password: signupForm['signupPassword1'].value,
			firstname: signupForm['firstname'].value,
			familyname: signupForm['familyname'].value,
			gender: signupForm['gender'].value,
			city: signupForm['city'].value,
			country: signupForm['country'].value,
		}
		
		if (serverstub.getUserDataByEmail(token,data['email'])['email'] != data['email']) { // Token??, Works?
			var signupUser = serverstub.signUp(data);
			if(!signupUser.success){ 
				displayError(signupUser.message)
			} else {
				serverstub.signIn(data.email, data.password);
				displayError(signupUser.message) // COMMENT OUT LATER
				displayView('profileView');
			}
		} else {
			displayError('This email is already signed up')
		}
	}
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
}

function validateSignup() {
	displayError('')
	var signupForm = document.forms['signupForm'];
	var password1 = signupForm['signupPassword1']; 
	var password2 = signupForm['signupPassword2'];
	var email = signupForm['signupUsername']; 
	
	
	//var dispEmail = new DisposableEmails(); //Create an instance of isValid //Class with disposable email addresses //https://github.com/sureshdsk/temporary-email-address-validator-node-js
	
	//result = dispEmail.isValid("dsk@mailinator.com");

	
	
	var data = {
		email:  signupForm['signupUsername'].value,
		password: signupForm['signupPassword1'].value,
		firstname: signupForm['firstname'].value,
		familyname: signupForm['familyname'].value,
		gender: signupForm['gender'].value,
		city: signupForm['city'].value,
		country: signupForm['country'].value,
    }
	
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
	/*
	if (result) { //dispEmail.isValid(email.value)) {
		displayError("A disposable email is not valid");
		return false;
	}
	*/
	
	for (item in data) { // Check so that fields aren't empty. "Require" doesn't work in IE before IE7
			if (item == null || item == "") {
				displayError('All fields have to be filled');
				return false;
			}
	}	
	return true;
};

var displayError = function(error){
    var errorBox = document.getElementById('errorBox');
    errorBox.innerHTML = error;
    
    if(error == ''){
        errorBox.style.visibility = 'hidden';
    } else {
        errorBox.style.visibility = 'visible';
    }
};
