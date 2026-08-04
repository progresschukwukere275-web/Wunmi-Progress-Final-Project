console.log("JAVASCRIPT IS CONNECTED");

// STEP 1: Get students from Local Storage
let students = JSON.parse(localStorage.getItem("students")) || [];

// STEP 2: Get the form
const form = document.querySelector("form");

// STEP 3: Get all the input fields
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const gender = document.getElementById("gender");
const age = document.getElementById("age");
const course = document.getElementById("course");
const passport = document.getElementById("passport");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

// STEP 4: Register student (only runs on register.html)
if (form) {

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const file = passport.files[0];

        if (file) {

            const reader = new FileReader();

            reader.onload = function() {

                const student = {
                    fullName: fullName.value,
                    email: email.value,
                    gender: gender.value,
                    age: age.value,
                    course: course.value,
                    passport: reader.result
                };

                students.push(student);
                localStorage.setItem("students", JSON.stringify(students));

                form.reset();

                window.location.href = "success.html";

            };

            reader.readAsDataURL(file);

        } else {

            const student = {
                fullName: fullName.value,
                email: email.value,
                gender: gender.value,
                age: age.value,
                course: course.value,
                passport: ""
            };

            students.push(student);
            localStorage.setItem("students", JSON.stringify(students));

            form.reset();

            window.location.href = "success.html";

        }

    });

}
// STEP 5: Read students from Local Storage
let savedStudents = JSON.parse(localStorage.getItem("students")) || [];
console.log(savedStudents);

// STEP 6: Display students on dashboard
const tableBody = document.getElementById("tableBody");

if (tableBody) {
    savedStudents.forEach(function(student, index) {
        tableBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>

                <td>
                    ${
                        student.passport
                            ? `<img src="${student.passport}" width="60" height="60" style="border-radius:50%; object-fit:cover;">`
                            : "No Image"
                    }
                </td>

                <td>${student.fullName}</td>
                <td>${student.email}</td>
                <td>${student.gender}</td>
                <td>${student.age}</td>
                <td>${student.course}</td>

                <td>
                    <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>
        `;

    });

}
//STEP 7: Connecting those 4 cards(in the dashbod) to registerd students data
 students = JSON.parse(localStorage.getItem("students")) || [];

let totalStudents = document.getElementById("totalStudents");
let maleStudents = document.getElementById("maleStudents");
let femaleStudents = document.getElementById("femaleStudents");
let totalCourse = document.getElementById("totalCourse");

let maleCount = 0;
let femaleCount = 0;

let courses = [];

students.forEach(function(student) {

    if (student.gender === "Male") {
        maleCount++;
    }

    if (student.gender === "Female") {
        femaleCount++;
    }

    if (!courses.includes(student.course)) {
        courses.push(student.course);
    }

});

totalStudents.textContent = students.length;
maleStudents.textContent = maleCount;
femaleStudents.textContent = femaleCount;
totalCourse.textContent = courses.length;

//DELETE BUTTON

function deleteStudent(index) {

    let confirmDelete = confirm("Are you sure you want to delete this student?");

    if (!confirmDelete) {
        return;
    }

    // Remove the selected student
    savedStudents.splice(index, 1);

    // Save the updated list
    localStorage.setItem("students", JSON.stringify(savedStudents));

    // Refresh the page
    location.reload();

}

// EDIT BUTTON
function editStudent(index) {

    let student = savedStudents[index];

    let fullName = prompt("Edit Full Name:", student.fullName);

    if (fullName === null) {
        return;
    }

    let email = prompt("Edit Email:", student.email);

    if (email === null) {
        return;
    }

    let gender = prompt("Edit Gender:", student.gender);

    if (gender === null) {
        return;
    }

    let age = prompt("Edit Age:", student.age);

    if (age === null) {
        return;
    }

    let course = prompt("Edit Course:", student.course);

    if (course === null) {
        return;
    }

    student.fullName = fullName;
    student.email = email;
    student.gender = gender;
    student.age = age;
    student.course = course;

    localStorage.setItem("students", JSON.stringify(savedStudents));

    location.reload();

}

// SEARCH STUDENT
// SEARCH FUNCTION
function searchStudent() {

    let input = document.getElementById("searchStudent").value.toLowerCase();

    let rows = document.querySelectorAll("#tableBody tr");

    rows.forEach(function(row) {

        let fullName = row.cells[2].textContent.toLowerCase();

        if (fullName.includes(input)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }

    });

}
