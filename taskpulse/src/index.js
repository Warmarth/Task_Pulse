// DOM Elements
const switcher1 = document.querySelector(".switch-1");
const switcher2 = document.querySelector(".switch-2");
const card = document.querySelector(".card");
const header = document.querySelector(".card-header");
const input = document.querySelector(".taskpulse-input input");
const body = document.body;
const taskInput = document.querySelector("#task_input");
const addTaskBtn = document.querySelector("#add_button");
const taskList = document.querySelector(".task-container");

// Initialize tasks from sessionStorage
let tasks = JSON.parse(sessionStorage.getItem("tasks")) || [];

// Theme Management
function switchToLightTheme() {
  switcher2.classList.add("close-switch");
  switcher1.classList.add("show-switch");
  card.classList.replace("dark", "light");
  header.classList.remove("card-header-dark");
  input.classList.remove("input-dark");
  body.classList.remove("dark-theme");
  localStorage.setItem("theme", "light");
}

function switchToDarkTheme() {
  switcher2.classList.remove("close-switch");
  switcher1.classList.remove("show-switch");
  card.classList.replace("light", "dark");
  header.classList.add("card-header-dark");
  input.classList.add("input-dark");
  body.classList.add("dark-theme");
  localStorage.setItem("theme", "dark");
}

function initializeTheme() {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    switchToDarkTheme();
  } else {
    switchToLightTheme();
  }
}

// Event Listeners for Theme Switching
switcher1.addEventListener("click", switchToDarkTheme);
switcher2.addEventListener("click", switchToLightTheme);

// System Theme Change Detection
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      e.matches ? switchToDarkTheme() : switchToLightTheme();
    }
  });

// Task Management
addTaskBtn.addEventListener("click", function () {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  const now = new Date();
  const newTask = {
    id: crypto.randomUUID(),
    text: taskText,
    date: {
      day: now.getDate(),
      month: now.toLocaleString("default", { month: "short" }),
    },
    time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    completed: false,
  };

  tasks.unshift(newTask);
  saveTasksToSessionStorage();
  taskInput.value = "";
  renderTasks();
  taskInput.focus();
});

function saveTasksToSessionStorage() {
  sessionStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const taskItem = document.createElement("div");
    taskItem.className = "task-item";
    taskItem.dataset.id = task.id;

    taskItem.innerHTML = `
      <div class="todo-card">
        <div class="date-box">
          <p class="day">${task.date.day}</p>
          <p class="month">${task.date.month}</p>
          <p class="time">${task.time}</p>
        </div>
        <p class="task-text ${task.completed ? "completed" : ""}">${
      task.text
    }</p>
        <div class="checkbox-container">
          <label class="checkbox">
            <input type="checkbox" ${task.completed ? "checked" : ""}>
            <span class="checkmark"></span>
          </label>
          <button class="edit-btn" aria-label="Edit task"><i class="fa-solid fa-pen"></i></button>
          <button class="delete-btn" aria-label="Delete task"><i class="fa-solid fa-trash"></i></button>
        </div>
        <div class="edit-container" style="display: none;">
          <input type="text" class="edit-input" value="${task.text}">
          <button class="save-btn">Save</button>
          <button class="cancel-btn">Cancel</button>
        </div>
      </div>
    `;

    taskList.appendChild(taskItem);
    setupTaskEventListeners(taskItem, task);
  });
}

function setupTaskEventListeners(taskItem, task) {
  const taskText = taskItem.querySelector(".task-text");
  const editBtn = taskItem.querySelector(".edit-btn");
  const deleteBtn = taskItem.querySelector(".delete-btn");
  const editContainer = taskItem.querySelector(".edit-container");
  const editInput = taskItem.querySelector(".edit-input");
  const saveBtn = taskItem.querySelector(".save-btn");
  const cancelBtn = taskItem.querySelector(".cancel-btn");
  const checkbox = taskItem.querySelector("input[type='checkbox']");

  // Edit functionality
  editBtn.addEventListener("click", () => {
    taskText.style.display = "none";
    editContainer.style.display = "flex";
    editInput.focus();
  });

  // Save edited task
  saveBtn.addEventListener("click", () => {
    const newText = editInput.value.trim();
    if (newText) {
      task.text = newText;
      taskText.textContent = newText;
      saveTasksToSessionStorage();
    }
    taskText.style.display = "block";
    editContainer.style.display = "none";
  });

  // Cancel edit
  cancelBtn.addEventListener("click", () => {
    editInput.value = task.text;
    taskText.style.display = "block";
    editContainer.style.display = "none";
  });

  // Delete task
  deleteBtn.addEventListener("click", () => {
    tasks = tasks.filter((t) => t.id !== task.id);
    saveTasksToSessionStorage();
    renderTasks();
  });

  // Toggle task completion
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    taskText.classList.toggle("completed", task.completed);
    saveTasksToSessionStorage();
  });

  // Keyboard support for edit actions
  editInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      saveBtn.click();
    } else if (e.key === "Escape") {
      cancelBtn.click();
    }
  });
}

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  initializeTheme();
  renderTasks();

  // Focus the input field on load
  taskInput.focus();
});
