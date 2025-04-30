const taskInput = document.querySelector("#task_input");
const tasktextarea = document.querySelector("#task_descrip");
const allInput = document.querySelectorAll("input");
const taskList = document.querySelector(".task-container");
const priority = document.querySelector("#priority");
const dueDate = document.querySelector("#date");
const dueTime = document.querySelector("#time");

let tasks = JSON.parse(sessionStorage.getItem("tasks")) || [];

export function saveTasksToSessionStorage() {
  sessionStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTimeRemaining(endtime) {
  const now = new Date();
  const total = endtime - now;

  if (total <= 0) {
    return {
      total: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      tenPercent: 0,
      twentyPercent: 0,
      // Adjusted to return 0 for all time components
      isExpired: true,
      formatted: "Time expired",
      compact: "00:00:00",
    };
  }

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const tenPercent = Math.floor(total / (1000 * 60 * 60 * 24 * 10));
  const twentyPercent = Math.floor(total / (1000 * 60 * 60 * 24 * 5));

  return {
    total,
    days,
    hours,
    minutes,
    seconds,
    tenPercent,
    twentyPercent,
    isExpired: false,
    formatted: `${days}d ${hours}h ${minutes}m ${seconds}s`,
    compact: `${String(days).padStart(2, "0")}:${String(hours).padStart(
      2,
      "0"
    )}:${String(minutes).padStart(2, "0")}`,
  };
}
export function addTask() {
  // Get and validate input values

  const taskText = taskInput.value.trim();
  const taskDescript = tasktextarea.value.trim();
  const dueDateValue = dueDate.value;
  const dueTimeValue = dueTime.value;

  if (!taskText || !taskDescript) {
    alert("Please enter both a task title and description.");
    return;
  }

  // Create base task object
  const now = new Date();

  const currentTime = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const newTask = {
    id: crypto.randomUUID(),
    title: taskText,
    description: addNewLine(taskDescript),
    priority: priority.value,
    dueDate: !dueDateValue ? formatDate(now) : dueDateValue,
    dueTime: !dueTimeValue ? currentTime : dueTimeValue,
    timerInterval: null,
    date: {
      day: now.getDate(),
      month: now.toLocaleString("default", { month: "short" }),
    },
    time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    completed: false,
  };

  // Update application state
  tasks.unshift(newTask);
  saveTasksToSessionStorage();

  // Reset form fields
  taskInput.value = "";
  tasktextarea.value = "";
  priority.value = "";
  dueDate.value = "";
  dueTime.value = "00:00";

  // Update UI
  renderTasks();
  taskInput.focus();
}

function addNewLine(dateString) {
  return dateString.replace(/\n+/g, "<br>");
}
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`; // Returns YYYY-MM-DD
}

function startTimer(taskItem, timerDisplay) {
  if (!timerDisplay) return;
  if (taskItem.timerInterval) {
    clearInterval(taskItem.timerInterval);
  }
  const endTime = new Date(`${taskItem.dueDate}T${taskItem.dueTime}`);

  updateTimer();
  taskItem.timerInterval = setInterval(updateTimer, 1000);
  function updateTimer() {
    const { total, days, hours, isExpired, formatted, minutes, seconds } =
      getTimeRemaining(endTime);
    if (total <= 0) {
      clearInterval(taskItem.timerInterval);
      timerDisplay.textContent = "";
      taskItem.timerInterval = null;
      if (!taskItem.completed) {
        saveTasksToSessionStorage();
      }
      return;
    }

    minutes >= 5 && minutes < 10 && hours < 1 && days < 1
      ? timerDisplay.classList.toggle("twenty-percent")
      : timerDisplay.classList.remove("twenty-percent");

    seconds >= 0 && minutes < 5 && hours < 1 && days < 1
      ? timerDisplay.classList.add("ten-percent")
      : timerDisplay.classList.remove("ten-percent");
    timerDisplay.textContent = `${formatted}`;
  }
}

export function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const taskItem = document.createElement("div");
    taskItem.className = "task-item";
    taskItem.dataset.id = task.id;

    taskItem.innerHTML = `
      <div class="todo-card" data-task-id="${task.id}">
        <div class="date-box">
          <p class="day">${task.date.day}</p>
          <p class="month">${task.date.month}</p>
          <p class="time">${task.time}</p>
        </div>
        <div class='task-content'>
        <p class="task-text title">${task.title} </p>
        <p class="task-text description ${task.completed ? "completed" : ""}">${
      task.description
    }</p>
    </div>
    <div class='duecheck'>
    <span class="duedate"> ${task.dueDate}</span>
    <span class="duetime" data-task-id="${task.id}"></span>

    <span class=" ${
      task.priority === "high"
        ? "high-priority"
        : task.priority === "medium"
        ? "medium-priority"
        : task.priority === "low"
        ? "low-priority"
        : ""
    }"> ${task.priority}</span>
  
    <div class="checkbox-container">
    <label class="checkbox">
    <input type="checkbox" ${task.completed ? "checked" : ""}>
    </label>
    <button class="edit-btn" aria-label="Edit task"><i class="fa-solid fa-pen"></i></button>
    <button class="delete-btn" aria-label="Delete task"><i class="fa-solid fa-trash"></i></button>
    </div>
    </div>
        <div class="edit-container" style='display: none'>
          <input type="text" class="edit-input title" value="${task.title}">
          <input type="text" class="edit-input description" value="${
            task.description
          }">
          <button class="save-btn">Save</button>
          <button class="cancel-btn">Cancel</button>
        </div>
      </div>
    `;

    let timershow = taskItem.querySelector(".duetime");
    if (task.dueDate && !task.completed) {
      startTimer(task, timershow);
    }

    taskList.appendChild(taskItem);
    setupTaskEventListeners(taskItem, task);
  });
}

window.focusOnMainTask = (taskId) => {
  const mainTask = document.querySelector(
    `.todo-card[data-task-id="${taskId}"]`
  );
  if (mainTask) {
    mainTask.scrollIntoView({ behavior: "smooth", block: "start" });
    mainTask.classList.add("highlighted");
    mainTask.style.transition = "background-color 0.5s ease-in-out";
    setTimeout(() => {
      mainTask.classList.remove("highlighted");
    }, 1000);
  }
};

window.vibrateTask = () => {
  if (navigator.vibrate) {
    setTimeout(() => {
      navigator.vibrate(1000);
      alert("your timer has expired!");
    }, 1000);
  }
};

function setupTaskEventListeners(taskItem, task) {
  const taskTitle = taskItem.querySelector(".task-content .title");
  const taskDescription = taskItem.querySelector(".task-content .description");
  const editBtn = taskItem.querySelector(".edit-btn");
  const deleteBtn = taskItem.querySelector(".delete-btn");
  const editContainer = taskItem.querySelector(".edit-container");
  const editTitleInput = taskItem.querySelector(".edit-input.title");
  const editDescInput = taskItem.querySelector(".edit-input.description");
  const saveBtn = taskItem.querySelector(".save-btn");
  const cancelBtn = taskItem.querySelector(".cancel-btn");
  const checkbox = taskItem.querySelector("input[type='checkbox']");
  const taskContent = taskItem.querySelector(".task-content");
  const checkboxContainer = taskItem.querySelector(".checkbox-container");

  editBtn.addEventListener("click", () => {
    editTitleInput.value = task.title;
    editDescInput.value = task.description;
    taskContent.style.display = "none";
    checkboxContainer.style.display = "none";
    editContainer.style.display = "flex";
    editTitleInput.focus();
  });

  saveBtn.addEventListener("click", () => {
    const newTitle = editTitleInput.value.trim();
    const newDescription = editDescInput.value.trim();

    if (newTitle && newDescription) {
      task.title = newTitle;
      task.description = newDescription;
      taskTitle.textContent = newTitle;
      taskDescription.textContent = newDescription;
      saveTasksToSessionStorage();
    }

    taskContent.style.display = "flex";
    checkboxContainer.style.display = "flex";
    editContainer.style.display = "none";
  });

  cancelBtn.addEventListener("click", () => {
    taskContent.style.display = "flex";
    checkboxContainer.style.display = "flex";
    editContainer.style.display = "none";
  });

  deleteBtn.addEventListener("click", () => {
    clearInterval(task.timerInterval); // Clear timer if it exists
    tasks = tasks.filter((t) => t.id !== task.id);
    saveTasksToSessionStorage();
    renderTasks();
  });

  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    taskDescription.classList.toggle("completed", task.completed);
    saveTasksToSessionStorage();
  });

  editTitleInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      saveBtn.click();
    }
  });

  editDescInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      saveBtn.click();
    } else if (e.key === "Escape") {
      cancelBtn.click();
    }
  });
}
