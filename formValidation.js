 document.getElementById('phone').addEventListener('input', function (e) {
            let input = e.target.value.replace(/\D/g, '');
            if (input.length > 10) {
                input = input.slice(0, 10);
            }
            let formatted = '';
            if (input.length > 0) {
                formatted += '(';
            }
            if (input.length > 3) {
                formatted += input.slice(0, 3) + ') ';
                formatted += input.slice(3, 6);
            } else {
                formatted += input.slice(0, 3);
            }
            if (input.length >= 6) {
                formatted += '-' + input.slice(6, 10);
            }
            e.target.value = formatted;
        });

        document.getElementById('zip').addEventListener('input', function (e) {
            let input = e.target.value.replace(/\D/g, '');
            if (input.length > 5) {
                input = input.slice(0, 5);
            }
            e.target.value = input;
        });

        function validateForm() {
            let isValid = true;

            let errors = document.querySelectorAll('.error');
            errors.forEach(error => {
                error.style.display = 'none';
            });

            let name = document.getElementById('name').value.trim();
            let nameError = document.getElementById('nameError');
            if (name.split(' ').length < 2) {
                nameError.textContent = "Please enter both first and last names.";
                nameError.style.display = 'block';
                isValid = false;
            }

            let address = document.getElementById('address').value.trim();
			let addressError = document.getElementById('addressError');
            if (address === '') {
                addressError.textContent = "Please enter your mailing address.";
                addressError.style.display = 'block';
                isValid = false;
            }
			
            let city = document.getElementById('city').value.trim();
			let cityError = document.getElementById('cityError');
            if (city === '') {
                cityError.textContent = "Please enter your city.";
                cityError.style.display = 'block';
                isValid = false;
            }			
            let state = document.getElementById('state').value;
            let stateError = document.getElementById('stateError');
			if (state === '') {
                stateError.textContent = "Please select your state";
                stateError.style.display = 'block';
                isValid = false;
            }
			
            let zip = document.getElementById('zip').value.trim();
			let zipError = document.getElementById('zipError');
            if (!/^\d{5}$/.test(zip)) {
                zipError.textContent = "Please enter 5-digit zip code.";
                zipError.style.display = 'block';
                isValid = false;
            }


            let phone = document.getElementById('phone').value.trim().replace(/\D/g, '');
            let phoneError = document.getElementById('phoneError');
            if (phone.length !== 10) {
                phoneError.textContent = "Please enter a valid 10-digit phone number.";
                phoneError.style.display = 'block';
                isValid = false;
            }

            let email = document.getElementById('email').value.trim();
            let emailError = document.getElementById('emailError');
            let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!emailPattern.test(email)) {
                emailError.textContent = "Please enter a valid email address.";
                emailError.style.display = 'block';
                isValid = false;
            }

            let birthDate = document.getElementById('birthDate').value;
            let birthDateError = document.getElementById('birthDateError');
            if (birthDate === '') {
                birthDateError.textContent = "Please enter your birth date.";
                birthDateError.style.display = 'block';
                isValid = false;
            } else {
                let selectedDate = new Date(birthDate);
                let today = new Date();
                if (selectedDate > today) {
                    birthDateError.textContent = 'Invalid birthdate (cannot be in the future).';
                    birthDateError.style.display = 'block';
                    isValid = false;
                }
            }

            let message = document.getElementById('message').value.trim();
            let messageError = document.getElementById('messageError');
            if (message === '') {
                messageError.textContent = "Please enter a message.";
                messageError.style.display = 'block';
                isValid = false;
            }

            let securityAnswer = document.getElementById('securityQuestion').value.trim();
            let securityError = document.getElementById('securityError');
            const correctAnswer = 'biden'; 
            if (securityAnswer === '') {
                securityError.textContent = "Please answer the security question.";
                securityError.style.display = 'block';
                isValid = false;
            } else if (securityAnswer.toLowerCase() !== correctAnswer.toLowerCase()) {
                securityError.textContent = 'Incorrect answer, please try again.';
                securityError.style.display = 'block';
                isValid = false;
            }

            if (isValid) {
                confSection();
                return false;
            }
            return false;
        }

        function confSection() {
            //document.getElementById('contactForm').style.display = 'none';

            document.getElementById('confName').textContent = document.getElementById('name').value.trim();
            document.getElementById('confAddress').textContent = document.getElementById('address').value.trim();
            document.getElementById('confCity').textContent = document.getElementById('city').value.trim();
            document.getElementById('confState').textContent = document.getElementById('state').value;
            document.getElementById('confZip').textContent = document.getElementById('zip').value.trim();
            document.getElementById('confPhone').textContent = document.getElementById('phone').value.trim();
            document.getElementById('confEmail').textContent = document.getElementById('email').value.trim();
            document.getElementById('confBirthDate').textContent = document.getElementById('birthDate').value;
            document.getElementById('confMessage').textContent = document.getElementById('message').value.trim();

           // document.getElementById('confPage').style.display = 'block';
        }

        function editForm() {
            document.getElementById('confPage').style.display = 'none';
            document.getElementById('contactForm').style.display = 'block';
        }

        function sendForm() {
            let name = encodeURIComponent(document.getElementById('name').value.trim());
            let address = encodeURIComponent(document.getElementById('address').value.trim());
            let city = encodeURIComponent(document.getElementById('city').value.trim());
            let state = encodeURIComponent(document.getElementById('state').value);
            let zip = encodeURIComponent(document.getElementById('zip').value.trim());
            let phone = encodeURIComponent(document.getElementById('phone').value.trim());
            let email = encodeURIComponent(document.getElementById('email').value.trim());
            let birthDate = encodeURIComponent(document.getElementById('birthDate').value);
            let message = encodeURIComponent(document.getElementById('message').value.trim());

            let mailtoLink = `mailto:ryan_garcia-hernandez@daytonastate.edu?subject=Contact Form Submission&body=Name: ${name}%0AAddress: ${address}%0ACity: ${city}%0AState: ${state}%0AZip Code: ${zip}%0APhone Number: ${phone}%0AEmail Address: ${email}%0ABirth Date: ${birthDate}%0AMessage: ${message}`;

            window.location.href = mailtoLink;
        }
    
	
    
        document.querySelectorAll('nav ul li').forEach(function(menuItem) {
            menuItem.addEventListener('mouseover', function() {
                const dropdown = this.querySelector('.dropdown');
                if (dropdown) {
                    dropdown.classList.add('open-menu');
                }
            });

            menuItem.addEventListener('mouseout', function() {
                const dropdown = this.querySelector('.dropdown');
                if (dropdown) {
                    dropdown.classList.remove('open-menu');
                }
            });
        });



// Function to validate address
/* function validateAddress(address) {
    const addressParts = address.split(',');

    // Ensure the address contains at least 3 parts: street, city, state+zip
    if (addressParts.length < 3) {
        alert("Please enter a valid address with street, city, and state, ZIP code.");
        return false;
    }

    // Validate street address
    const street = addressParts[0].trim();
    if (!/^\d+\s[A-Za-z\s]+/.test(street)) {
        alert("Please enter a valid street address (e.g., 123 Main St).");
        return false;
    }

    // Validate city
    const city = addressParts[1].trim();
    if (!/^[A-Za-z\s]+$/.test(city)) {
        alert("Please enter a valid city name.");
        return false;
    }

    // Validate state and ZIP code
    const stateZip = addressParts[2].trim();
    const stateZipParts = stateZip.split(' ');
    if (stateZipParts.length !== 2) {
        alert("Please enter a valid state and ZIP code (e.g., CA 90001).");
        return false;
    }

    const state = stateZipParts[0].trim();
    const zip = stateZipParts[1].trim();

    if (!/^[A-Z]{2}$/.test(state)) {
        alert("Please enter a valid two-letter state abbreviation.");
        return false;
    }

    if (!/^\d{5}(-\d{4})?$/.test(zip)) {
        alert("Please enter a valid ZIP code (e.g., 90001 or 90001-1234).");
        return false;
    }

    // If all validations pass
    return true;
}

// Function to validate the form
function validateForm() {
    let name = document.getElementById("name").value.trim();
    let address = document.getElementById("address").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let email = document.getElementById("email").value.trim();
    let birthDate = document.getElementById("birthDate").value;
    let message = document.getElementById("message").value.trim();
    let security = document.getElementById("security").value.trim();

    // Validate Name
    if (name.split(' ').length < 2) {
        alert("Please enter both first and last names.");
        return false;
    }

    // Validate Address
    if (!validateAddress(address)) {
        return false;
    }

    // Validate Phone (Ensure it's in the (123) 456-7890 format)
    let phonePattern = /^\(\d{3}\) \d{3}-\d{4}$/;
    if (!phonePattern.test(phone)) {
        alert("Please enter a valid phone number in the format (123) 456-7890.");
        return false;
    }

    // Validate Email
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    // Validate Birth Date (cannot be in the future)
    let today = new Date();
    let birth = new Date(birthDate);
    if (birth > today) {
        alert("Birth date cannot be in the future.");
        return false;
    }

    // Validate Message
    if (message === "") {
        alert("Please enter a message.");
        return false;
    }

    // Validate Security Question
    if (security !== "5") {
        alert("Security question answer is incorrect.");
        return false;
    }
    
    const formData = {
        name: name,
        address: address,
        phone: phone,
        email: email,
        birthDate: birthDate,
        message: message,
        security: security
    };

    localStorage.setItem('formData', JSON.stringify(formData));

    window.location.href = 'confirmation.html';
    return false; // Prevent default form submission
}

// Real-time phone number formatting (input mask)
document.getElementById('phone').addEventListener('input', function(e) {
    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
});
    // If all validation passes, return true
  //-----> uncomment  return true;
// ----> }

// Real-time phone number formatting (input mask)
/* document.getElementById('phone').addEventListener('input', function(e) {
    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
});

// Attach the form validation to the form's submit event
document.getElementById('userForm').addEventListener('submit', function(event) {
    // Prevent default form submission
    event.preventDefault();

    // Validate form data
    if (!validateForm()) {
        return; // Stop the submission if validation fails
    }

    // If validation succeeds, gather form data and go to the confirmation page
    const formData = {
        name: document.getElementById("name").value,
        address: document.getElementById("address").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        birthDate: document.getElementById("birthDate").value,
        message: document.getElementById("message").value,
        security: document.getElementById("security").value
    };*/

    // Store form data in local storage for the confirmation page
   // localStorage.setItem('formData', JSON.stringify(formData));

    // Redirect to the confirmation page
   // window.location.href = 'confirmation.html';
//}); 




