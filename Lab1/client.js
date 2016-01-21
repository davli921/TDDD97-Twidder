displayView = function() {
	//the code required to display a view

};

window.onload = function() {
	//code that is executed as the page is loaded
	//you shall put your own custom code here
	window.alert("Hello TDDD97!");
};

// Check disposable Email: 
// https://github.com/sureshdsk/temporary-email-address-validator-node-js
// http://www.email-validator.net/block-fake-disposable-email-addresses.html


// Password strenght meter: http://stackoverflow.com/questions/948172/password-strength-meter
function CheckPassword() // User can not submit without same password
{
	var password1 = document.getElementById('password1'); 
	var password2 = document.getElementById('password2');
	var email = document.getElementById('username');
	
	var checkPasswordMatch = function() {
		if (passw1.value != passw2.value) {
		password1.setCustomValidity('Passwords must match.');
		} else {
			password1.setCustomValidity('');
		}
	};
	
	var checkPasswordLength = function () {
		if (password1.value.length < 6) {
			password1.setCustomValidity('Password must be minimum 6 characters');
		} else {
			password1.setCustomValidity('');
		}
	};
	
	var checkPasswordNotEmail = function() {
		if (password1.value == email.value) {
			password1.setCustomValidity('Password can not be equal to email');
		} else {
			password1.setCustomValidity('');
		}
	};
	
	
	
	password1.addEventListener('change', checkPasswordMatch, false)
	password2.addEventListener('change', checkPasswordMatch, false)
	
	var form = document.getElementById('signupform');
	form.addEventListener('submit', function(event) {
		checkPasswordMatch();
		//checkPasswordNotEmail();
		//checkPasswordLength(); ?? // Switch order? First check length etc then match? // Can have more than one func here?
		if (!this.checkValidity()) { 
			event.preventDefault();
			// ERROR MESSAGE !
			alert("Error: Password must match") // How add correct error, match, length? Error message in functions above?
			password1.focus();
		}
	}, false);
	
	
};