class Task {
  constructor(id, text, icons) {
    this.id = id;
    this.text = text;

    this.icons = icons || [
      { className: "fa-solid fa-edit", iconFunction: "editTask" },
      { className: "fa-solid fa-trash", iconFunction: "deleteTask" },
      { className: "fa-solid fa-check", iconFunction: "completeTask" },
    ];
  }
}

document.addEventListener("DOMContentLoaded", displayTasks);

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

form.addEventListener("submit", addTask);

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask(e) {
  e.preventDefault();
  const taskText = input.value.trim();

  if (taskText === "") return;

  const taskId = Date.now().toString();
  const icons = [
    { className: "fa-solid fa-edit", iconFunction: "editTask" },
    { className: "fa-solid fa-trash", iconFunction: "deleteTask" },
    { className: "fa-solid fa-check", iconFunction: "completeTask" },
  ];
  const task = new Task(taskId, taskText, icons);
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  displayTasks();
  input.value = "";
}

function displayTasks() {
  list.innerHTML = "";

  tasks.forEach((task) => {
    task.icons = task.icons || [
      { className: "fa-solid fa-edit", iconFunction: "editTask" },
      { className: "fa-solid fa-trash", iconFunction: "deleteTask" },
      { className: "fa-solid fa-check", iconFunction: "completeTask" },
    ];

    const li = document.createElement("li");

    const iconButtons = task.icons
      .map((icon) => {
        return ` <button class="" onclick="${icon.iconFunction}" ><i class="${icon.className}"></i></button>`;
      })
      .join("");

    li.innerHTML = `${task.text}
    <div class="icon-buttons">
    ${iconButtons}
    </div>
    `;

    list.appendChild(li);
  });
}

function completeTask() {
  console.log("Completed Function");
}
