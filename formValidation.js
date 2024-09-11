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
    if (address === "") {
        alert("Please enter a valid address.");
        return false;
    }

    // Validate Phone
    let phonePattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
    if (!phonePattern.test(phone)) {
        alert("Please enter a valid phone number in the format 123-456-7890.");
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

    // If all validation passes, show confirmation page or alert
    alert("Form submitted successfully!");
    return true;
}
