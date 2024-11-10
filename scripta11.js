// Ensure DOM is loaded before running scripts
document.addEventListener("DOMContentLoaded", function () {
    const courseList = document.getElementById("courseList");

    console.log(courseList); // Debugging: Ensure element is present in DOM
    
    // Verify programData exists and is structured correctly
    if (typeof programData === "undefined" || !Array.isArray(programData.degreeRequirements)) {
        console.error("programData or programData.degreeRequirements is not defined or improperly structured.");
        return;
    }
    console.log("programData loaded:", programData); // Debugging: Confirm data loaded

    // Function to populate courses dynamically based on program data
    function populateCourses(data) {
        data.degreeRequirements.forEach(requirement => {
            const categoryDiv = document.createElement("div");
            categoryDiv.classList.add("course-category");

            const categoryHeader = document.createElement("h2");
            categoryHeader.innerText = requirement.category;
            categoryDiv.appendChild(categoryHeader);

            // Display category notes if they exist
            if (requirement.notes) {
                const notesParagraph = document.createElement("p");
                notesParagraph.innerText = requirement.notes;
                categoryDiv.appendChild(notesParagraph);
            }

            // Set courses to an empty array if missing or invalid
            const coursesArray = Array.isArray(requirement.courses) ? requirement.courses : [];
            if (!coursesArray.length) {
                console.warn(`No courses found in category: ${requirement.category}`);
            }

            coursesArray.forEach(course => {
                const courseDiv = document.createElement("div");
                courseDiv.classList.add("course");

                const courseCheckbox = document.createElement("input");
                courseCheckbox.type = "checkbox";
                courseCheckbox.id = course.code;
                courseCheckbox.addEventListener("change", () => handleCourseSelection(course));

                const courseLabel = document.createElement("label");
                courseLabel.setAttribute("for", course.code);
                courseLabel.innerText = `${course.code}: ${course.name}`;

                // Disable checkbox if prerequisites are not met
                courseCheckbox.disabled = !checkPrerequisites(course);

                courseDiv.appendChild(courseCheckbox);
                courseDiv.appendChild(courseLabel);
                categoryDiv.appendChild(courseDiv);
            });

            courseList.appendChild(categoryDiv);
        });
    }

    // Function to check if prerequisites are met for a course
    function checkPrerequisites(course) {
        if (!course.prerequisites) return true;

        return course.prerequisites.every(prereq => {
            if (Array.isArray(prereq)) {
                return prereq.some(courseCode => isCourseCompleted(courseCode));
            } else {
                return isCourseCompleted(prereq);
            }
        });
    }

    // Function to check if a course is completed
    function isCourseCompleted(courseCode) {
        const course = findCourseByCode(courseCode);
        return course && course.completed;
    }

    // Function to locate a course by its code
    function findCourseByCode(courseCode) {
        for (let requirement of programData.degreeRequirements) {
            const course = requirement.courses?.find(c => c.code === courseCode);
            if (course) return course;
        }
        return null;
    }

    // Handle course selection, toggling completion status and updating prerequisites
    function handleCourseSelection(course) {
        course.completed = !course.completed;
        console.log(`Course ${course.code} completed status:`, course.completed); // Debugging

        // Update eligibility of each course based on prerequisites
        document.querySelectorAll("input[type='checkbox']").forEach(checkbox => {
            const course = findCourseByCode(checkbox.id);
            if (course) checkbox.disabled = !checkPrerequisites(course);
        });

        // Disable alternate courses if one is completed
        if (course.alternate) {
            course.alternate.forEach(altCourseCode => {
                const altCourseCheckbox = document.getElementById(altCourseCode);
                if (altCourseCheckbox) {
                    altCourseCheckbox.disabled = course.completed;
                }
            });
        }
    }

    // Populate UI with courses from programData
    populateCourses(programData);
});
