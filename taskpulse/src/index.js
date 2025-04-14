let switcher1 = document.querySelector(".switch-1");
let switcher2 = document.querySelector(".switch-2");
let card = document.querySelector(".card");
let header = document.querySelector(".card-header");
let input = document.querySelector(".taskpulse-input input");

switcher1.addEventListener("click", function () {
  switcher2.classList.toggle("close-switch");
  switcher1.classList.toggle("show-switch");
  card.classList.replace("dark", "light");
  header.classList.remove("card-header-dark");
  input.classList.remove("input-dark");
});

switcher2.addEventListener("click", function () {
  switcher2.classList.toggle("close-switch");
  switcher1.classList.toggle("show-switch");
  card.classList.replace("light", "dark");
  header.classList.add("card-header-dark");
  input.classList.add("input-dark");
});

const taskInput = document.querySelector("#task_input");
const addTaskBtn = document.querySelector("#add_button");
const taskList = document.querySelector(".task-container");

let tasks = JSON.parse(sessionStorage.getItem("tasks")) || [];

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
  taskInput.value = "";
  renderTasks();
});

// Save tasks to sessionStorage
function saveTasksToSessionStorage() {
  sessionStorage.setItem("tasks", JSON.stringify(tasks));
}
// Render All Tasks
// In your renderTasks function:
// In your renderTasks function:
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
          <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
          <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
        </div>
        <div class="edit-container" style="display: none;">
          <input type="text" class="edit-input" value="${task.text}">
          <button class="save-btn">Save</button>
          <button class="cancel-btn">Cancel</button>
        </div>
      </div>
    `;

    taskList.appendChild(taskItem);

    // Get all relevant elements
    const taskText = taskItem.querySelector(".task-text");
    const editBtn = taskItem.querySelector(".edit-btn");
    const deleteBtn = taskItem.querySelector(".delete-btn");
    const editContainer = taskItem.querySelector(".edit-container");
    const editInput = taskItem.querySelector(".edit-input");
    const saveBtn = taskItem.querySelector(".save-btn");
    const cancelBtn = taskItem.querySelector(".cancel-btn");

    // Edit button click handler
    editBtn.addEventListener("click", () => {
      taskText.style.display = "none";
      editContainer.style.display = "block";
      editInput.focus();
    });

    // Save button click handler
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

    // Cancel button click handler
    cancelBtn.addEventListener("click", () => {
      taskText.style.display = "block";
      editContainer.style.display = "none";
    });

    // Delete button click handler (unchanged)
    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      saveTasksToSessionStorage();
      renderTasks();
    });

    const checkbox = taskItem.querySelector("input[type='checkbox']");
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      taskText.classList.toggle("completed", task.completed);
      saveTasksToSessionStorage();
    });
  });
}

// Initial render
document.addEventListener("DOMContentLoaded", () => {
  renderTasks();
});
