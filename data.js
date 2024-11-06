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
      category: "Specialization",
      creditHours: 6,
      notes: "Students must complete 6 hours in one specialization area."
    }
  ]
};
