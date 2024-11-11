let totalCredits = 0;
let programData;

document.addEventListener("DOMContentLoaded", function () {
    const courseList = document.getElementById("courseList");
    const courseInfo = document.getElementById("courseInfo");

    fetch('/BSIT.json')
        .then(response => response.json())
        .then(data => {
            programData = data;

            if (programData.degreeRequirements && Array.isArray(programData.degreeRequirements)) {
                programData.degreeRequirements.forEach(requirement => {
                    console.log(`Category: ${requirement.category}`);
                    
                    if (requirement.courses && Array.isArray(requirement.courses)) {
                        requirement.courses.forEach(course => {
                            addCourseElement(course, courseList);
                        });
                    }

                    if (requirement.options && Array.isArray(requirement.options)) {
                        requirement.options.forEach(option => {
                            console.log(`Specialization: ${option.name}`);
                            
                            if (option.courses && Array.isArray(option.courses)) {
                                option.courses.forEach(specializationCourse => {
                                    console.log(`Specialization Course: ${specializationCourse.code} - ${specializationCourse.name}`);
                                    addCourseElement(specializationCourse, courseList);
                                });
                            }
                        });
                    }
                });

                updateCourseStates(); // Initial update to set disabled states based on prerequisites
            } else {
                console.error("degreeRequirements is undefined or not an array.");
            }
        })
        .catch(error => console.error("Error loading JSON:", error));
});

function addCourseElement(course, courseList) {
    const courseDiv = document.createElement("div");
    courseDiv.classList.add("course");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = course.code;
    checkbox.disabled = course.preReqs?.length > 0 && !arePreReqsMet(course.preReqs, course.orPreReqs);

    checkbox.addEventListener("change", () => {
        handleCourseSelection(course, checkbox.checked);
        updateCredits(checkbox, course.credits);
        updateCourseStates(); // Refresh states of all courses after each selection
    });

    const label = document.createElement("label");
    label.htmlFor = course.code;
    label.textContent = `${course.code} - ${course.name} (${course.credits} credits)`;

    courseDiv.appendChild(checkbox);
    courseDiv.appendChild(label);

    // Adding Prerequisites section
    if (course.preReqs?.length > 0 || course.orPreReqs?.length > 0) {
        const prereqDiv = document.createElement("div");
        prereqDiv.classList.add("prerequisites");

        let prerequisitesText = "Prerequisites: ";
        const prereqs = [];
        if (course.preReqs?.length > 0) {
            prereqs.push(...course.preReqs);
        }
        if (course.orPreReqs?.length > 0) {
            prereqs.push(...course.orPreReqs);
        }

        prerequisitesText += prereqs.join(", ");
        prereqDiv.textContent = prerequisitesText;

        courseDiv.appendChild(prereqDiv);
    }

    if (course.preReqs?.length > 0 || course.orPreReqs?.length > 0) {
        const infoDiv = document.createElement("div");
        infoDiv.classList.add("info");
        infoDiv.textContent = course.info;
        courseDiv.appendChild(infoDiv);
    }

    courseList.appendChild(courseDiv);
}

function handleCourseSelection(course, isSelected) {
    const courseInfo = document.getElementById("courseInfo");
    courseInfo.innerHTML = "";

    if (isSelected) {
        const info = document.createElement("div");
        info.textContent = `${course.name} selected. ${course.info}`;
        courseInfo.appendChild(info);
    }
}

function updateCredits(checkbox, credits) {
    if (checkbox.checked) {
        totalCredits += credits;
    } else {
        totalCredits -= credits;
    }
    document.getElementById("totalCredits").textContent = totalCredits;
}

function arePreReqsMet(preReqs, orPreReqs) {
    const allPreReqsMet = preReqs.every(preReq => document.getElementById(preReq)?.checked);
    const anyOrPreReqMet = orPreReqs && orPreReqs.some(orPreReq => document.getElementById(orPreReq)?.checked);
    return allPreReqsMet || anyOrPreReqMet;
}

// New function to update the enabled/disabled state of each course checkbox
function updateCourseStates() {
    programData.degreeRequirements.forEach(requirement => {
        requirement.courses.forEach(course => {
            const checkbox = document.getElementById(course.code);
            checkbox.disabled = course.preReqs?.length > 0 && !arePreReqsMet(course.preReqs, course.orPreReqs);
        });

        requirement.options?.forEach(option => {
            option.courses.forEach(specializationCourse => {
                const checkbox = document.getElementById(specializationCourse.code);
                checkbox.disabled = specializationCourse.preReqs?.length > 0 && !arePreReqsMet(specializationCourse.preReqs, specializationCourse.orPreReqs);
            });
        });
    });
}

