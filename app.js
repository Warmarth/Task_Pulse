// Get elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Initialize tasks array
let tasks = [];

// To use the add task button
addTaskBtn.addEventListener('click', addTask);

 //To Make use of the Enter key to add tasks
    taskInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') {
            addTask()
        }
    })

// Function to add task
function addTask() {
    // Get task text
    const taskText = taskInput.value.trim();

    // Check if task text is not empty
    if (taskText !== '') {
        // Create task object
        const task = {
            text: taskText,
            id: Date.now()
        };

        // Add task to tasks array
        tasks.push(task);

        // Clear task input
        taskInput.value = '';

        // Display tasks
        renderTasks();
    }
};

// Function to render tasks
function renderTasks() {
    // Clear task list
    taskList.innerHTML = '';

    // Loop through tasks array
    tasks.forEach(task => {
        // Create task element
        const taskElement = document.createElement('li');
        taskElement.classList.add('task');
        taskElement.style.alignItems = 'center'

        // Create task text element
        const taskTextElement = document.createElement('span');
        taskTextElement.textContent = task.text;
        taskTextElement.style.fontSize = '18px'
        taskTextElement.style.marginRight = '5px'
        taskTextElement.style.alignSelf = 'center'


        // Create delete button element
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.style.marginLeft = '10px'
        const deleteIcon = document.createElement('i')
        deleteIcon.classList.add('fa', 'fa-times')
        deleteBtn.appendChild(deleteIcon)
        const deleteText = document.createElement('span')
        deleteText.textContent = 'Delete'
        // deleteText.style.display = 'none'
        deleteBtn.appendChild(deleteText)

        // Create uncompleted button element
        const uncompleteBtn = document.createElement('button');
        uncompleteBtn.classList.add('uncomplete-btn');
        uncompleteBtn.style.marginLeft = '5px'
        const uncompleteIcon = document.createElement('i')
        uncompleteIcon.classList.add('fa', 'fa-circle')
        uncompleteBtn.appendChild(uncompleteIcon)
        const uncompleteText = document.createElement('span')
        uncompleteText.textContent = 'Uncompleted'
        // uncompleteText.style.display = 'none'
        uncompleteBtn.appendChild(uncompleteText)
        

        // Create completed button element
        const completeBtn = document.createElement('button');
        completeBtn.classList.add('complete-btn');
        completeBtn.style.marginLeft = '10px'
        // completeBtn.textContent = 'Complete';
        const completeIcon = document.createElement('i')
        completeIcon.classList.add('fas', 'fa-check')
        completeBtn.appendChild(completeIcon)
        const completeText = document.createElement('span')
        completeText.textContent = 'Completed'
        // uncompleteText.style.display = 'none'
        completeBtn.appendChild(completeText)

        // Add event listener to delete button
        deleteBtn.addEventListener('click', () => {
            // Remove task from tasks array
            tasks = tasks.filter(t => t.id !== task.id);

            // Render tasks
            renderTasks();
        });

        // Append task text and delete button to task element
        taskElement.appendChild(taskTextElement);
        taskElement.appendChild(deleteBtn);
        taskElement.appendChild(completeBtn);
        taskElement.appendChild(uncompleteBtn);

        // Append task element to task list
        taskList.appendChild(taskElement);
    });
}

//Sidebar 
const closeMenuBtn = document.getElementById('ham-close')
const sidebar = document.querySelector('.sidebar')
const openMenuBtn = document.getElementById('ham-open')
const overlay = document.querySelector('.overlay')

openMenuBtn.addEventListener('click', () => {
    sidebar.classList.add('active')
    overlay.classList.add('active')
})

closeMenuBtn.addEventListener('click', () => {
    sidebar.classList.remove('active')
    overlay.classList.remove('active')
})

overlay.addEventListener('click', () => {
    sidebar.classList.remove('active')
    overlay.classList.remove('active')
})



