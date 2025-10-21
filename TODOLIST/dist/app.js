class TodoApp {
    constructor() {
        this.tasks = [];
        this.taskInput = document.getElementById("taskInput");
        this.taskList = document.getElementById("taskList");
        this.addTaskBtn = document.getElementById("addTaskBtn");
        this.addTaskBtn.addEventListener("click", () => this.addTask());
        this.renderTasks();
    }
    addTask() {
        const title = this.taskInput.value.trim();
        if (!title)
            return;
        const newTask = {
            id: Date.now(),
            title,
            completed: false
        };
        this.tasks.push(newTask);
        this.taskInput.value = "";
        this.renderTasks();
    }
    toggleTask(id) {
        this.tasks = this.tasks.map(task => task.id === id ? Object.assign(Object.assign({}, task), { completed: !task.completed }) : task);
        this.renderTasks();
    }
    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.renderTasks();
    }
    renderTasks() {
        this.taskList.innerHTML = "";
        this.tasks.forEach(task => {
            const li = document.createElement("li");
            li.textContent = task.title;
            if (task.completed)
                li.classList.add("completed");
            const toggleBtn = document.createElement("button");
            toggleBtn.textContent = task.completed ? "Undo" : "Done";
            toggleBtn.addEventListener("click", () => this.toggleTask(task.id));
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", () => this.deleteTask(task.id));
            li.appendChild(toggleBtn);
            li.appendChild(deleteBtn);
            this.taskList.appendChild(li);
        });
    }
}
new TodoApp();
export {};
//# sourceMappingURL=app.js.map