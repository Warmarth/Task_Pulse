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

let taskInput = document.querySelector("#task_input");
let addtaskBtn = document.querySelector("#add_button");

addtaskBtn.addEventListener("click", function () {
  let taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task.");
  } else {
    const day = new Date().getDate();
    const month = new Date().toLocaleString("default", { month: "long" });

    let newTask = {
      id: crypto.randomUUID(),
      text: taskText,
      date: { day, month },
      time: new Date().toLocaleTimeString(),
      completed: false,
    };

    addTask(newTask);

    let tasks =
      sessionStorage.setItem(newTask.id, JSON.stringify(newTask)) || [];

    tasks.push(newTask);
    sessionStorage.setItem("tasks", JSON.stringify(tasks));

    renderTasks(newTask);

    taskInput.value = "";
  }
});

let taskList = document.querySelector(".task-container");
function addTask(taskText) {
  let taskItem = document.createElement("div");
  taskItem.className = "todo-card";
  taskItem.innerHTML = `
  <div class="todo-card">
  <div class="date-box">
  <p class="day">${taskText.date["day"]}</p>
  <p class="month">${taskText.date["month"]}</p>
  <p class="time">${taskText.time}</p>
  </div>
  <p class="task-text">
              ${taskText.text}
            </p>
            <div class="checkbox"><input type="checkbox" /></div>
            </div>
  `;
  taskList.appendChild(taskItem);
  taskItem.scrollIntoView({ behavior: "smooth" });
}

const renderTasks = (newTasks) => {
  let task_Items = taskList.children;
  for (let i = 0; i < task_Items.length; i++) {
    const checkbox = task_Items[i].querySelector("input[type='checkbox']");
    const taskText = task_Items[i].querySelector(".task-text");
    checkbox.addEventListener("click", function () {
      if (checkbox.checked) {
        taskText.classList.add("completed");

        newTasks.completed = true;
        sessionStorage.setItem(newTasks.id, JSON.stringify(newTasks));
      } else {
        taskText.classList.remove("completed");
        newTasks.completed = false;
        sessionStorage.setItem(newTasks.id, JSON.stringify(newTasks));
      }
    });
  }
};
