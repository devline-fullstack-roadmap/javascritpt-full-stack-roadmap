const students = [
    {
        id: 1,
        name: "Ali",
        age: 21,
        marks: 82,
        completed: false
    },
    {
        id: 2,
        name: "Sara",
        age: 22,
        marks: 65,
        completed: false
    },
    {
        id: 3,
        name: "Ahmed",
        age: 20,
        marks: 35,
        completed: false
    }
];

const studentForm = document.querySelector("#studentForm");
const nameInput = document.querySelector("#nameInput");
const ageInput = document.querySelector("#ageInput");
const marksInput = document.querySelector("#marksInput");
const message = document.querySelector("#message");
const studentList = document.querySelector("#studentList");
const totalCount = document.querySelector("#total");
const passedCount = document.querySelector("#passed");
const failedCount = document.querySelector("#failed");
const searchInput = document.querySelector("#searchInput");


function renderStudents(studentsArray) {

    studentList.replaceChildren();

    studentsArray.forEach(student => {

        const li = document.createElement("li");

        li.dataset.id = student.id;

        li.textContent =
            `Name: ${student.name}, Age: ${student.age}, Marks: ${student.marks}`;

        if (student.completed) {
            li.classList.add("completed");
        }

        const completeBtn = document.createElement("button");

        completeBtn.textContent = "Complete";
        completeBtn.type = "button";
        completeBtn.classList.add("complete");

        li.appendChild(completeBtn);


        const deleteBtn = document.createElement("button");

        deleteBtn.textContent = "Delete";
        deleteBtn.type = "button";
        deleteBtn.classList.add("delete");

        li.appendChild(deleteBtn);

        studentList.appendChild(li);
    });
}


studentForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const name = nameInput.value.trim();
    const age = Number(ageInput.value);
    const marks = Number(marksInput.value);

    if (!name || !ageInput.value || !marksInput.value) {
        message.textContent = "All fields are required";
        return;
    }

    if (age < 18 || age > 60) {
        message.textContent = "Age must be between 18 and 60";
        return;
    }

    if (marks < 0 || marks > 100) {
        message.textContent = "Marks must be between 0 and 100";
        return;
    }

    students.push({
        id: Date.now(),
        name,
        age,
        marks,
        completed: false
    });

    message.textContent = "Student added successfully";

    renderStudents(students);
    updateStudentStats();

    studentForm.reset();
});


studentList.addEventListener("click", (e) => {

    const li = e.target.closest("li");

    if (!li) return;

    const id = Number(li.dataset.id);

    if (e.target.classList.contains("delete")) {

        const index = students.findIndex(student => student.id === id);

        students.splice(index, 1);

        renderStudents(students);
        updateStudentStats();
    }


    if (e.target.classList.contains("complete")) {

        const student = students.find(student => student.id === id);

        student.completed = !student.completed;

        renderStudents(students);
    }
});


searchInput.addEventListener("input", (e) => {

    const search = e.target.value.toLowerCase();

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(search)
    );

    renderStudents(filteredStudents);
});


function updateStudentStats() {

    totalCount.textContent = students.length;

    const passedStudents =
        students.filter(student => student.marks >= 50);

    const failedStudents =
        students.filter(student => student.marks < 50);

    passedCount.textContent = passedStudents.length;
    failedCount.textContent = failedStudents.length;
}


renderStudents(students);
updateStudentStats();