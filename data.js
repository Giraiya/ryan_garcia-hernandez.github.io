const programData = {
  program: "Information Technology - BSIT, B.S",
  degreeRequirements: [
    {
      category: "Programming Foundations",
      courses: [
        { code: "COP1000", name: "Intro to Programming", completed: false },
        { code: "COP2220", name: "C++ Programming", completed: false, alternate: ["COP2360", "COP2800"] }
      ],
      notes: "Two semesters of programming required."
    },
    {
      category: "Mathematics",
      courses: [
        { code: "STA2023", name: "Statistics", completed: false },
        { code: "MAC2311C", name: "Calculus", completed: false }
      ]
    },
    {
      category: "Program-Specific Courses",
      creditHours: 39,
      courses: [
        { code: "COP3530", name: "Data Structures", credits: 3, completed: false },
        { code: "COP4610", name: "Operating Systems", credits: 3, completed: false },
        { code: "CNT3104", name: "Introduction to Telecommunications", credits: 2, completed: false },
        { code: "CIS4250", name: "Ethical Issues in IT", credits: 1, completed: false },
        { code: "CNT4007", name: "Data and Computer Communications", credits: 3, completed: false },
        { code: "CIS4360", name: "Applied Cybersecurity", credits: 3, completed: false },
        { code: "COP4813", name: "Web Systems I", credits: 3, completed: false },
        { code: "CDA4101", name: "Computer Organization and Design", credits: 3, completed: false },
        { code: "CNT4703", name: "Voice and Data Network Design", credits: 3, completed: false },
        { code: "COP4708", name: "Applied Database I", credits: 3, completed: false },
        { code: "CEN4010", name: "Software Engineering", credits: 3, completed: false },
        { code: "CEN4801", name: "Systems Integration", credits: 3, completed: false },
        { code: "CEN3722", name: "Human Computer Interfaces", credits: 3, completed: false },
        { code: "CIS4510", name: "IT Project Management", credits: 3, completed: false }
      ]
    },
    {
      category: "Technical Writing Requirement",
      courses: [
        { code: "GEB3213", name: "Business Writing", credits: 3, completed: false }
      ],
      notes: "Students who have taken ENC2210 may use that course, requiring an additional 3-hour upper-level technical elective."
    },
    {
      category: "Specializations",
      notes: "Students must complete 6 credit hours in one specialization area.",
      options: [
        {
          name: "Web Systems Programming",
          courses: [
            { code: "COP4709", name: "Applied Database II", credits: 3, completed: false },
            { code: "COP4834", name: "Web Systems II", credits: 3, completed: false }
          ]
        },
        {
          name: "Cybersecurity and Cyberforensics",
          courses: [
            { code: "CET4860", name: "Introduction to Digital Forensics", credits: 3, completed: false },
            { code: "CET4861", name: "Advanced Digital Forensics", credits: 3, completed: false },
            { code: "CET4862", name: "Network Forensics and Incident Response", credits: 3, completed: false },
            { code: "CET4884", name: "Security Methods and Practice", credits: 3, completed: false }
          ]
        }
      ],
      creditHours: 6
    },
    {
      category: "Sample Program of Study",
      notes: "Suggested program layout over five semesters.",
      semesters: [
        {
          semester: "1st Semester",
          courses: [
            { code: "CEN3722", name: "Human Computer Interfaces", credits: 3, completed: false },
            { code: "CNT3104", name: "Introduction to Telecommunications", credits: 2, completed: false },
            { code: "GEB3213", name: "Business Writing", credits: 3, completed: false },
            { code: "COP4610", name: "Operating Systems", credits: 3, completed: false },
            { code: "Elective", name: "General Education or Technical Elective", credits: 3, completed: false }
          ],
          totalCredits: 14
        },
        {
          semester: "2nd Semester",
          courses: [
            { code: "COP3530", name: "Data Structures", credits: 3, completed: false },
            { code: "CIS4360", name: "Applied Cybersecurity", credits: 3, completed: false },
            { code: "COP4708", name: "Applied Database I", credits: 3, completed: false },
            { code: "Elective", name: "General Education or Technical Elective", credits: 3, completed: false }
          ],
          totalCredits: 12
        },
        {
          semester: "3rd Semester",
          courses: [
            { code: "CDA4101", name: "Computer Organization and Design", credits: 3, completed: false },
            { code: "CIS4250", name: "Ethical Issues in IT", credits: 1, completed: false },
            { code: "CEN4801", name: "Systems Integration", credits: 3, completed: false },
            { code: "Elective", name: "General Education or Technical Elective", credits: 4, completed: false },
            { code: "CEN4010", name: "Software Engineering", credits: 3, completed: false }
          ],
          totalCredits: 14
        },
        {
          semester: "4th Semester",
          courses: [
            { code: "CNT4007", name: "Data and Computer Communications", credits: 3, completed: false },
            { code: "COP4813", name: "Web Systems I", credits: 3, completed: false },
            { code: "Specialization", name: "Specialization Elective", credits: 3, completed: false },
            { code: "Specialization", name: "Specialization Elective", credits: 3, completed: false }
          ],
          totalCredits: 12
        },
        {
          semester: "5th Semester",
          courses: [
            { code: "CNT4703", name: "Voice and Data Network Design", credits: 3, completed: false },
            { code: "CIS4510", name: "IT Project Management", credits: 3, completed: false }
          ],
          totalCredits: 6
        }
      ]
    }
  ]
};
