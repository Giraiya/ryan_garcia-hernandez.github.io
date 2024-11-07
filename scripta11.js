// scripta11.js

document.addEventListener("DOMContentLoaded", function() {
    const courseList = document.getElementById("courseList");

    if (!programData) {
        console.error("programData is not defined. Check data.js.");
        return;
    }

    console.log("programData loaded:", programData); // Confirm data loaded

    // Populate courses dynamically based on program data
    function populateCourses(data) {
        data.degreeRequirements.forEach(requirement => {
            const categoryDiv = document.createElement("div");
            categoryDiv.classList.add("course-category");

            const categoryHeader = document.createElement("h2");
            categoryHeader.innerText = requirement.category;
            categoryDiv.appendChild(categoryHeader);

            // Display any category notes
            if (requirement.notes) {
                const notesParagraph = document.createElement("p");
                notesParagraph.innerText = requirement.notes;
                categoryDiv.appendChild(notesParagraph);
            }

            // Create checkbox for each course
            requirement.courses.forEach(course => {
                const courseDiv = document.createElement("div");
                courseDiv.classList.add("course");

                const courseCheckbox = document.createElement("input");
                courseCheckbox.type = "checkbox";
                courseCheckbox.id = course.code;
                courseCheckbox.addEventListener("change", () => handleCourseSelection(course));

                const courseLabel = document.createElement("label");
                courseLabel.setAttribute("for", course.code);
                courseLabel.innerText = `${course.code}: ${course.name}`;

                courseDiv.appendChild(courseCheckbox);
                courseDiv.appendChild(courseLabel);
                categoryDiv.appendChild(courseDiv);
            });

            courseList.appendChild(categoryDiv);
        });
    }

    // Handles the selection of a course and updates eligibility based on prerequisites
    function handleCourseSelection(course) {
        course.completed = !course.completed;
        console.log(`Course ${course.code} completed status:`, course.completed); // Debugging

        if (course.alternate) {
            course.alternate.forEach(altCourseCode => {
                const altCourseCheckbox = document.getElementById(altCourseCode);
                altCourseCheckbox.disabled = course.completed;
            });
        }
    }

    // Initialize the UI with the courses from the JSON data
    populateCourses(programData);
});
