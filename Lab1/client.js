package ;
extern class DisposableEmails {
	public function new():Void;
	public function isValid(string):Bool;
}
	
displayView = function() {
	//the code required to display a view
};
window.onload = function() {
	//code that is executed as the page is loaded
	//you shall put your own custom code here
	window.alert("Hello TDDD97!");
};

// Password strength meter: http://stackoverflow.com/questions/948172/password-strength-meter
var validateSignup = function() {
	var signupForm = document.forms['signupForm'];
	var password1 = signupForm['signupPassword1']; 
	var password2 = signupForm['signupPassword2'];
	var email = signupForm['signupUsername'];
	var validateMail = new DisposableEmails(); //Class with disposable email addresses //https://github.com/sureshdsk/temporary-email-address-validator-node-js
	
	var  signupData = {
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
	
	for (item in signupData) { // Check so that fields aren't empty. "Require" doesn't work in IE before IE7
			if (item == null || item == "") {
				displayError('All fields have to be filled');
				return false;
			}
	}	
	return true;
};

