// Function to validate address
function validateAddress(address) {
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

    // Phone Input Mask (Real-time formatting)
document.getElementById('phone').addEventListener('input', function(e) {
    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
});

// Attach the form validation to the form's submit event
document.getElementById('userForm').addEventListener('submit', function(event) {
    if (!validateForm()) {
        event.preventDefault(); // Prevent form submission if validation fails
    }
});

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

    // If all validation passes, show confirmation page or alert
    alert("Form submitted successfully!");
    return true;
}

// Attach the form validation to the form's submit event
document.getElementById('myForm').addEventListener('submit', function(event) {
    if (!validateForm()) {
        event.preventDefault(); // Prevent form submission if validation fails
    }
});


