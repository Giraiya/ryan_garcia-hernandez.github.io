let totalCredits = 0;
let programData;

document.addEventListener("DOMContentLoaded", function () {
    const courseList = document.getElementById("courseList");
    const courseInfo = document.getElementById("courseInfo");

    fetch('/BSIT.json')
        .then(response => response.json())
        .then(data => {
            programData = data;

            // Check if degreeRequirements exists and is an array
            if (programData.degreeRequirements && Array.isArray(programData.degreeRequirements)) {
                programData.degreeRequirements.forEach(requirement => {
                    console.log(`Category: ${requirement.category}`);
                    
                    // Check if 'courses' is an array before looping through it
                    if (requirement.courses && Array.isArray(requirement.courses)) {
                        requirement.courses.forEach(course => {
                            const courseDiv = document.createElement("div");
                            courseDiv.classList.add("course");

                            const checkbox = document.createElement("input");
                            checkbox.type = "checkbox";
                            checkbox.id = course.code;
                            checkbox.disabled = course.preReqs?.length > 0 && !arePreReqsMet(course.preReqs, course.orPreReqs);

                            checkbox.addEventListener("change", () => {
                                handleCourseSelection(course, checkbox.checked);
                                updateCredits(checkbox, course.credits);
                            });

                            const label = document.createElement("label");
                            label.htmlFor = course.code;
                            label.textContent = `${course.code} - ${course.name} (${course.credits} credits)`;

                            courseDiv.appendChild(checkbox);
                            courseDiv.appendChild(label);

                            if (course.preReqs?.length > 0 || course.orPreReqs?.length > 0) {
                                const infoDiv = document.createElement("div");
                                infoDiv.classList.add("info");
                                infoDiv.textContent = course.info;
                                courseDiv.appendChild(infoDiv);
                            }

                            courseList.appendChild(courseDiv);
                        });
                    }

                    // Special handling for specialization options
                    if (requirement.options && Array.isArray(requirement.options)) {
                        requirement.options.forEach(option => {
                            console.log(`Specialization: ${option.name}`);
                            
                            if (option.courses && Array.isArray(option.courses)) {
                                option.courses.forEach(specializationCourse => {
                                    console.log(`Specialization Course: ${specializationCourse.code} - ${specializationCourse.name}`);
                                    
                                    const courseDiv = document.createElement("div");
                                    courseDiv.classList.add("course");

                                    const checkbox = document.createElement("input");
                                    checkbox.type = "checkbox";
                                    checkbox.id = specializationCourse.code;
                                    checkbox.disabled = specializationCourse.preReqs?.length > 0 && !arePreReqsMet(specializationCourse.preReqs, specializationCourse.orPreReqs);

                                    checkbox.addEventListener("change", () => {
                                        handleCourseSelection(specializationCourse, checkbox.checked);
                                        updateCredits(checkbox, specializationCourse.credits);
                                    });

                                    const label = document.createElement("label");
                                    label.htmlFor = specializationCourse.code;
                                    label.textContent = `${specializationCourse.code} - ${specializationCourse.name} (${specializationCourse.credits} credits)`;

                                    courseDiv.appendChild(checkbox);
                                    courseDiv.appendChild(label);

                                    if (specializationCourse.preReqs?.length > 0 || specializationCourse.orPreReqs?.length > 0) {
                                        const infoDiv = document.createElement("div");
                                        infoDiv.classList.add("info");
                                        infoDiv.textContent = specializationCourse.info;
                                        courseDiv.appendChild(infoDiv);
                                    }

                                    courseList.appendChild(courseDiv);
                                });
                            }
                        });
                    }
                });
            } else {
                console.error("degreeRequirements is undefined or not an array.");
            }
        })
        .catch(error => console.error("Error loading JSON:", error));
});

// Existing functions remain the same
function handleCourseSelection(course, isSelected) {
    const courseInfo = document.getElementById("courseInfo");
    courseInfo.innerHTML = "";

    if (isSelected) {
        const info = document.createElement("div");
        info.textContent = `${course.name} selected. ${course.info}`;
        courseInfo.appendChild(info);

        programData.degreeRequirements.forEach(requirement => {
            requirement.courses.forEach(c => {
                if (c.preReqs.includes(course.code) || (c.orPreReqs && c.orPreReqs.includes(course.code))) {
                    document.getElementById(c.code).disabled = false;
                }
            });
        });
    } else {
        programData.degreeRequirements.forEach(requirement => {
            requirement.courses.forEach(c => {
                if (c.preReqs.includes(course.code)) {
                    document.getElementById(c.code).disabled = true;
                    document.getElementById(c.code).checked = false;
                }
            });
        });
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
    const anyOrPreReqMet = orPreReqs.some(orPreReq => document.getElementById(orPreReq)?.checked);
    return allPreReqsMet || anyOrPreReqMet;
}

