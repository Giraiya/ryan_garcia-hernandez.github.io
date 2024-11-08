// scripta11.js

document.addEventListener("DOMContentLoaded", function () {
    const courseList = document.getElementById("courseList");

    console.log(courseList); // Debugging: Ensure element is present in DOM
    if (!programData) {
        console.error("programData is not defined. Check data.js.");
        return;
    }
    console.log("programData loaded:", programData); // Debugging: Confirm data loaded

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

                // Disable checkbox if prerequisites are not met
                courseCheckbox.disabled = !checkPrerequisites(course);

                courseDiv.appendChild(courseCheckbox);
                courseDiv.appendChild(courseLabel);
                categoryDiv.appendChild(courseDiv);
            });

            courseList.appendChild(categoryDiv);
        });
    }

    // Check if prerequisites are completed for a course
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

    // Check if a specific course is completed
    function isCourseCompleted(courseCode) {
        const course = findCourseByCode(courseCode);
        return course && course.completed;
    }

    // Locate a course by its code
    function findCourseByCode(courseCode) {
        for (let requirement of programData.degreeRequirements) {
            const course = requirement.courses.find(c => c.code === courseCode);
            if (course) return course;
        }
        return null;
    }

    // Handle selection of a course, update prerequisites
    function handleCourseSelection(course) {
        course.completed = !course.completed;
        console.log(`Course ${course.code} completed status:`, course.completed); // Debugging

        // Refresh eligibility of each course based on prerequisites
        document.querySelectorAll("input[type='checkbox']").forEach(checkbox => {
            const course = findCourseByCode(checkbox.id);
            if (course) checkbox.disabled = !checkPrerequisites(course);
        });

        // Handle disabling alternates if course is completed
        if (course.alternate) {
            course.alternate.forEach(altCourseCode => {
                const altCourseCheckbox = document.getElementById(altCourseCode);
                altCourseCheckbox.disabled = course.completed;
            });
        }
    }

    // Initialize the UI with the courses from programData
    populateCourses(programData);
});
