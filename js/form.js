// Form validation

const form = document.getElementById('form');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const passwordConfirm = document.getElementById('passwordConfirm');

// Add event listeners to the form elements

form.addEventListener('submit', (e) => handleFormSubmission(e));
firstName.addEventListener('input', (e) => validateInput(e.target));
lastName.addEventListener('input', (e) => validateInput(e.target));
email.addEventListener('input', (e) => validateInput(e.target));
phone.addEventListener('input', (e) => validateInput(e.target));
password.addEventListener('input', (e) => validateInput(e.target));
passwordConfirm.addEventListener('input', (e) => validateInput(e.target));

// Create a map for the input fields and error messages

const inputs = document.querySelectorAll('.form-control input');
const errors = document.querySelectorAll('.form-control .error');

const errorMap = {};
for (let i = 0; i < inputs.length; i++) {
  errorMap[inputs[i].id] = errors[i];
}

// Validates the input field

function validateInput(input) {
  let errorMessage = '';

  switch (input) {
    case firstName:
    case lastName:
      errorMessage = input.validity.valueMissing
        ? 'Please fill in the input field'
        : '';
      break;

    case email:
      errorMessage = input.validity.valueMissing
        ? 'Please fill in the input field'
        : input.validity.typeMismatch
        ? 'Please enter a valid email address'
        : '';
      break;

    case phone:
      errorMessage = input.validity.valueMissing
        ? 'Please fill in the input field'
        : input.validity.typeMismatch
        ? 'Please enter a valid phone number'
        : '';
      break;

    case password:
      errorMessage = input.validity.valueMissing
        ? 'Please fill in the input field'
        : input.validity.tooShort
        ? 'Password must be at least 8 characters long'
        : input.validity.typeMismatch
        ? 'Password must contain a digit and an uppercase letter'
        : '';

      // Validate confirmation field
      validateInput(passwordConfirm);
      break;

    case passwordConfirm:
      errorMessage = input.validity.valueMissing
        ? 'Please fill in the input field'
        : input.value !== password.value
        ? 'Passwords do not match'
        : '';
      break;
  }

  // If the error message contains text, the input is invalid
  if (errorMessage) {
    input.classList.remove('valid');
    input.classList.add('invalid');
  } else {
    input.classList.remove('invalid');
    input.classList.add('valid');
  }

  // Set the input's error message
  errorMap[input.id].textContent = errorMessage;
}

// Validates the submitted form

function handleFormSubmission(event) {
  if (!form.checkValidity()) {
    event.preventDefault();

    // Iterate over the inputs and validate them
    inputs.forEach((input) => validateInput(input));
  }
}
