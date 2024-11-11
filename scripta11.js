let totalCredits = 0;
let programData;

document.addEventListener("DOMContentLoaded", function () {
    const courseList = document.getElementById("courseList");
    const courseInfo = document.getElementById("courseInfo");

    fetch('/BSIT.json')
        .then(response => response.json())
        .then(data => {
            programData = data;

            programData.courses.forEach(course => {
                const courseDiv = document.createElement("div");
                courseDiv.classList.add("course");

                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.id = course.courseCode;
                checkbox.disabled = course.preReqs.length > 0 && !arePreReqsMet(course.preReqs, course.orPreReqs);

                checkbox.addEventListener("change", () => {
                    handleCourseSelection(course, checkbox.checked);
                    updateCredits(checkbox, course.credits);
                });

                const label = document.createElement("label");
                label.htmlFor = course.courseCode;
                label.textContent = `${course.courseCode} - ${course.courseName} (${course.credits} credits)`;

                courseDiv.appendChild(checkbox);
                courseDiv.appendChild(label);

                if (course.preReqs.length > 0 || course.orPreReqs.length > 0) {
                    const infoDiv = document.createElement("div");
                    infoDiv.classList.add("info");
                    infoDiv.textContent = course.info;
                    courseDiv.appendChild(infoDiv);
                }

                courseList.appendChild(courseDiv);
            });
        });
});

function handleCourseSelection(course, isSelected) {
    const courseInfo = document.getElementById("courseInfo");
    courseInfo.innerHTML = "";

    if (isSelected) {
        const info = document.createElement("div");
        info.textContent = `${course.courseName} selected. ${course.info}`;
        courseInfo.appendChild(info);

        programData.courses.forEach(c => {
            if (c.preReqs.includes(course.courseCode) || (c.orPreReqs && c.orPreReqs.includes(course.courseCode))) {
                document.getElementById(c.courseCode).disabled = false;
            }
        });
    } else {
        programData.courses.forEach(c => {
            if (c.preReqs.includes(course.courseCode)) {
                document.getElementById(c.courseCode).disabled = true;
                document.getElementById(c.courseCode).checked = false;
            }
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

