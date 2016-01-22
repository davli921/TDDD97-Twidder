package ;
extern class DisposableEmails {
	public function new():Void;
	public function isValid(string):Bool;
}
	
displayView = function(view) {
	//the code required to display a view
	displayError('');
	document.getElementById('container').innerHTML = document.getElementById('welcomeView');
    
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
				window.alert(signupUser.message) // COMMENT OUT LATER
				displayView('profileView');
			}
		} else {
			displayError('This email is already signed up')
		}
	}
};

var validateSignup = function() {
	var signupForm = document.forms['signupForm'];
	var password1 = signupForm['signupPassword1']; 
	var password2 = signupForm['signupPassword2'];
	var email = signupForm['signupUsername'];
	var validateMail = new DisposableEmails(); //Class with disposable email addresses //https://github.com/sureshdsk/temporary-email-address-validator-node-js
	
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
		//password1.setCustomValidity('Password must be minimum 6 characters'); // Should use instead?
		displayError('Password is too short');
		return false;
		}
	
	if (password1.value != password2.value) {
		displayError('Passwords must match.');
		return false;
	}
		
	if (password1.value == email.value) {
		displayError('Password can not be equal to email');
		return false;
	}
	
	if (validateMail.isValid(email.value)) {
		displayError("A disposable email is not valid");
		return false;
	}
	
	for (item in data) { // Check so that fields aren't empty. "Require" doesn't work in IE before IE7
			if (item == null || item == "") {
				displayError('All fields have to be filled');
				return false;
			}
	}	
	return true;
};

