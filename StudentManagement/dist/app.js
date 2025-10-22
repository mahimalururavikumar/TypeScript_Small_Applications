class StudentManager {
    constructor() {
        this.students = [];
        this.tableBody = document.querySelector("#studentTable tbody");
        this.loadStudents();
        const addBtn = document.getElementById("addBtn");
        addBtn === null || addBtn === void 0 ? void 0 : addBtn.addEventListener("click", () => this.addStudent());
    }
    loadStudents() {
        const stored = localStorage.getItem("students");
        this.students = stored ? JSON.parse(stored) : [];
        this.renderTable();
    }
    saveStudents() {
        localStorage.setItem("students", JSON.stringify(this.students));
    }
    renderTable() {
        const tableBody = this.tableBody;
        if (!tableBody)
            return;
        tableBody.innerHTML = "";
        this.students.forEach((student) => {
            const row = document.createElement("tr");
            row.innerHTML = `
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.course}</td>
        <td>
          <button class="deleteBtn" data-id="${student.id}">Delete</button>
        </td>
      `;
            tableBody.appendChild(row);
        });
        this.addDeleteEventListeners();
    }
    addStudent() {
        const nameInput = document.getElementById("name");
        const ageInput = document.getElementById("age");
        const courseInput = document.getElementById("course");
        if (!nameInput.value || !ageInput.value || !courseInput.value) {
            alert("Please fill all fields!");
            return;
        }
        const newStudent = {
            id: Date.now(),
            name: nameInput.value,
            age: Number(ageInput.value),
            course: courseInput.value,
        };
        this.students.push(newStudent);
        this.saveStudents();
        this.renderTable();
        // clear inputs
        nameInput.value = "";
        ageInput.value = "";
        courseInput.value = "";
    }
    addDeleteEventListeners() {
        const deleteButtons = document.querySelectorAll(".deleteBtn");
        deleteButtons.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const id = e.target.getAttribute("data-id");
                if (id)
                    this.deleteStudent(Number(id));
            });
        });
    }
    deleteStudent(id) {
        this.students = this.students.filter((s) => s.id !== id);
        this.saveStudents();
        this.renderTable();
    }
}
// Initialize
new StudentManager();
export {};
//# sourceMappingURL=app.js.map