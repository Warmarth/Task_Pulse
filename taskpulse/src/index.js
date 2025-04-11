// Get elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const completedTaskList = document.getElementById('completed-tasks-list');
const uncompletedTaskList = document.getElementById('uncompleted-tasks-list');

// Initialize tasks array
let tasks = [];
let completedTasks = [];
let uncompletedTasks = [];

// To use the add task button
addTaskBtn.addEventListener('click', addTask);

// To Make use of the Enter key to add tasks
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Function to add task
function addTask() {
    // Get task text
    const taskText = taskInput.value.trim();

    // Check if task text is not empty
    if (taskText !== '') {
        // Create task object
        const task = {
            text: taskText,
            id: crypto.randomUUID(), // Generate a unique ID for the task
            date: new Date().toLocaleDateString(), // Get current date
            time: new Date().toLocaleTimeString(), // Get current time
            completed: false, // Initial state
        };

        // Add task to tasks array
        tasks.push(task);

        // Clear task input
        taskInput.value = '';

        // Display tasks
        renderTasks();
        console.log(tasks);
        console.log(completedTasks);
        console.log(uncompletedTasks);
    }
}

// Function to render tasks
function renderTasks() {
    // Clear task list
    taskList.innerHTML = '';

    // Loop through tasks array
    tasks.forEach((task) => {
        // Create task element
        const taskElement = document.createElement('li');
        taskElement.classList.add('task');
        taskElement.style.alignItems = 'center';

        // Create task text element
        const taskTextElement = document.createElement('span');
        const words = task.text.split(' ');
        if (words.length > 5) {
            taskTextElement.textContent = words.slice(0, 5).join(' ') + '\n' + words.slice(5).join(' ');
            taskTextElement.style.whiteSpace = 'pre-line'; // Enable line breaks
        } else {
            taskTextElement.textContent = task.text;
        }
        taskTextElement.style.fontSize = '18px';
        taskTextElement.style.marginRight = '5px';
        taskTextElement.style.wordWrap = 'break-word';
        taskTextElement.style.maxWidth = 'calc(100% - 180px)';

        // Create delete button element
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.style.marginLeft = '10px';
        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fa', 'fa-times');
        deleteBtn.appendChild(deleteIcon);
        const deleteText = document.createElement('span');
        deleteText.textContent = 'Delete';
        deleteBtn.appendChild(deleteText);

        // Create uncompleted button element
        const uncompleteBtn = document.createElement('button');
        uncompleteBtn.classList.add('uncomplete-btn');
        uncompleteBtn.style.marginLeft = '5px';
        const uncompleteIcon = document.createElement('i');
        uncompleteIcon.classList.add('fa', 'fa-circle');
        uncompleteBtn.appendChild(uncompleteIcon);
        const uncompleteText = document.createElement('span');
        uncompleteText.textContent = 'Uncompleted';
        uncompleteBtn.appendChild(uncompleteText);

        // Create completed button element
        const completeBtn = document.createElement('button');
        completeBtn.classList.add('complete-btn');
        completeBtn.style.marginLeft = '10px';
        const completeIcon = document.createElement('i');
        completeIcon.classList.add('fas', 'fa-check');
        completeBtn.appendChild(completeIcon);
        const completeText = document.createElement('span');
        completeText.textContent = 'Completed';
        completeBtn.appendChild(completeText);

        // Add event listener to delete button
        deleteBtn.addEventListener('click', () => {
            // Remove task from tasks array
            tasks = tasks.filter((t) => t.id !== task.id);
            completedTasks = completedTasks.filter((t) => t.id !== task.id);
            uncompletedTasks = uncompletedTasks.filter((t) => t.id !== task.id);

            // Render tasks
            renderTasks();
            renderCompletedTasks();
            renderUncompletedTasks();
        });

        // Add event listener to complete button
        completeBtn.addEventListener('click', () => {
            task.completed = true;
            completedTasks.push(task);
            tasks = tasks.filter((t) => t.id !== task.id);
            renderTasks();
            renderCompletedTasks();
        });

        // Add event listener to uncomplete button
        uncompleteBtn.addEventListener('click', () => {
            task.completed = false;
            uncompletedTasks.push(task);
            tasks = tasks.filter((t) => t.id !== task.id);
            renderTasks();
            renderUncompletedTasks();
        });

        // Append task text and buttons to task element
        taskElement.appendChild(taskTextElement);
        taskElement.appendChild(deleteBtn);
        taskElement.appendChild(completeBtn);
        taskElement.appendChild(uncompleteBtn);

        // Append task element to task list
        taskList.appendChild(taskElement);
    });
}

// Function to render completed tasks
function renderCompletedTasks() {
    completedTaskList.innerHTML = '';
    completedTasks.forEach((task) => {
        const taskElement = document.createElement('li');
        const words = task.text.split(' ');
        let displayText = task.text;
        if (words.length > 3) {
          displayText = words.slice(0, 2).join(' ') + '...';
        }
        taskElement.textContent = displayText;
        taskElement.style.whiteSpace = 'nowrap';
        taskElement.style.overflow = 'hidden';
        taskElement.style.textOverflow = 'ellipsis';
        taskElement.style.maxWidth = 'calc(100% - 100px)';
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.style.marginLeft = '5px';
        deleteBtn.style.width = '80px';
        deleteBtn.style.flexShrink = '0';
        deleteBtn.addEventListener('click', () => {
            completedTasks = completedTasks.filter((t) => t.id !== task.id);
            renderCompletedTasks();
        });
        taskElement.appendChild(deleteBtn);
        completedTaskList.appendChild(taskElement);
    });
}

// Function to render uncompleted tasks
function renderUncompletedTasks() {
    uncompletedTaskList.innerHTML = '';
    uncompletedTasks.forEach((task) => {
        const taskElement = document.createElement('li');
        const words = task.text.split(' ');
        let displayText = task.text;
        if (words.length > 2) {
          displayText = words.slice(0, 2).join(' ') + '...';
        }
        taskElement.textContent = displayText;
        taskElement.style.whiteSpace = 'nowrap';
        taskElement.style.overflow = 'hidden';
        taskElement.style.textOverflow = 'ellipsis';
        taskElement.style.maxWidth = 'calc(100% - 100px)';
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.style.marginLeft = '5px';
        deleteBtn.style.width = '80px';
        deleteBtn.style.flexShrink = '0';
        deleteBtn.addEventListener('click', () => {
            uncompletedTasks = uncompletedTasks.filter((t) => t.id !== task.id);
            renderUncompletedTasks();
        });
        taskElement.appendChild(deleteBtn);
        uncompletedTaskList.appendChild(taskElement);
    });
  }

  // Sidebar
  const closeMenuBtn = document.getElementById('ham-close');
const sidebar = document.querySelector('.sidebar');
const openMenuBtn = document.getElementById('ham-open');
const overlay = document.querySelector('.overlay');

openMenuBtn.addEventListener('click', () => {
    sidebar.classList.add('active');
    overlay.classList.add('active');
});

closeMenuBtn.addEventListener('click', () => {
  sidebar.classList.remove('active');
    overlay.classList.remove('active');
  });

  overlay.addEventListener('click', () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
  });
  console.log(tasks);