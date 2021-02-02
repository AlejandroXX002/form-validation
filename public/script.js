let themeDots = document.getElementsByClassName("theme-dot");
let theme = localStorage.getItem("theme");
const form = document.getElementById("contact-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const message = document.getElementById("message");
const subject = document.getElementById("subject");

// theme color switch

if (theme == null) {
	setTheme("light");
} else {
	setTheme(theme);
}

for (let i = 0; themeDots.length > i; i++) {
	themeDots[i].addEventListener("click", function () {
		let mode = this.dataset.mode;
		setTheme(mode);
	});
}

function setTheme(mode) {
	if (mode == "light") {
		document.getElementById("theme-style").href =
			"../public/css/styles.css";
	}

	if (mode == "blue") {
		document.getElementById("theme-style").href = "../public/css/blue.css";
	}

	if (mode == "green") {
		document.getElementById("theme-style").href =
			"../public/css/green.css";
	}

	if (mode == "purple") {
		document.getElementById("theme-style").href =
			"../public/css/purple.css";
	}

	localStorage.setItem("theme", mode);
}

// automatic slide

let counter = 1;
setInterval(function () {
	document.getElementById("radio" + counter).checked = true;
	counter++;
	if (counter > 3) {
		counter = 1;
	}
}, 5000);

// form validation

form.addEventListener("submit", (e) => {
	e.preventDefault();

	checkInputs();
});

function checkInputs() {
	// get values from the input
	const usernameValue = username.value;
	const emailValue = email.value.trim();
	const messageValue = message.value;
	const subjectValue = subject.value;

	// user verification
	if (usernameValue === "") {
		// show error
		// add error class
		setErrorFor(username, "Username cannot be blank");
	} else {
		// add success class
		setSuccesFor(username);
	}

	// email verification
	if (emailValue === "") {
		setErrorFor(email, "Email cannot be blank");
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, "Email is not valid");
	} else {
		setSuccesFor(email);
	}

	// message
	if (messageValue === "") {
		setErrorFor(message, "Message field cannot be blank");
	} else {
		setSuccesFor(message);
	}

	// subject
	if (subjectValue === "") {
		setErrorFor(subject, "Subject field cannot be blank");
	} else {
		setSuccesFor(subject);
	}
}

// shows the error signs
function setErrorFor(input, message) {
	const formControl = input.parentElement; //.form-control
	const small = formControl.querySelector("small");

	// add error message inside small
	small.innerText = message;

	// add error class
	formControl.className = "form-control error";
}

// shows de succes signs
function setSuccesFor(input) {
	const formControl = input.parentElement;
	formControl.className = "form-control success";
}

// regex email function verification
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
		email
	);
}
