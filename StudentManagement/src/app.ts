
interface Student {
  id: number;
  name: string;
  age: number;
  course: string;
}

class StudentManager {
  private students: Student[] = [];
  private tableBody: HTMLElement | null = document.querySelector("#studentTable tbody");

  constructor() {
    this.loadStudents();
    const addBtn = document.getElementById("addBtn");
    addBtn?.addEventListener("click", () => this.addStudent());
  }

  private loadStudents() {
    const stored = localStorage.getItem("students");
    this.students = stored ? JSON.parse(stored) : [];
    this.renderTable();
  }

  private saveStudents() {
    localStorage.setItem("students", JSON.stringify(this.students));
  }

  private renderTable() {
    const tableBody = this.tableBody;
    if (!tableBody) return;
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

  private addStudent() {
    const nameInput = document.getElementById("name") as HTMLInputElement;
    const ageInput = document.getElementById("age") as HTMLInputElement;
    const courseInput = document.getElementById("course") as HTMLInputElement;

    if (!nameInput.value || !ageInput.value || !courseInput.value) {
      alert("Please fill all fields!");
      return;
    }

    const newStudent: Student = {
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

  private addDeleteEventListeners() {
    const deleteButtons = document.querySelectorAll(".deleteBtn");
    deleteButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = (e.target as HTMLElement).getAttribute("data-id");
        if (id) this.deleteStudent(Number(id));
      });
    });
  }

  private deleteStudent(id: number) {
    this.students = this.students.filter((s) => s.id !== id);
    this.saveStudents();
    this.renderTable();
  }
}

// Initialize
new StudentManager();
