interface Task {
  id: number;
  title: string;
  completed: boolean;
}

class TodoApp {
  private tasks: Task[] = [];
  private taskInput = document.getElementById("taskInput") as HTMLInputElement;
  private taskList = document.getElementById("taskList") as HTMLUListElement;
  private addTaskBtn = document.getElementById("addTaskBtn") as HTMLButtonElement;

  constructor() {
    this.addTaskBtn.addEventListener("click", () => this.addTask());
    this.renderTasks();
  }

  private addTask(): void {
    const title = this.taskInput.value.trim();
    if (!title) return;

    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false
    };

    this.tasks.push(newTask);
    this.taskInput.value = "";
    this.renderTasks();
  }

  private toggleTask(id: number): void {
    this.tasks = this.tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    this.renderTasks();
  }

  private deleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.renderTasks();
  }

  private renderTasks(): void {
    this.taskList.innerHTML = "";

    this.tasks.forEach(task => {
      const li = document.createElement("li");
      li.textContent = task.title;
      if (task.completed) li.classList.add("completed");

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
