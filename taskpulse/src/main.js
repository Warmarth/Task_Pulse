import { initializeTheme } from "./theme-manager.js";
import { addTask, renderTasks } from "./task-manager.js";
import { startSearch } from "./search.js";

// DOM Elements
const taskInput = document.querySelector("#task_input");
const tasktextarea = document.querySelector("#task_descrip");
const addTaskBtn = document.querySelector("#add_button");
const searchBtn = document.querySelector("#filterButton");

// Initialize the application
document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();

  initializeTheme();
  renderTasks();

  // Focus the input field on load
  taskInput.focus();

  // Add task on button click
  addTaskBtn.addEventListener("click", addTask);
  searchBtn.addEventListener("click", startSearch);

  // Add task on Enter key in textarea
  tasktextarea.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      addTask();
    }
  });
});
