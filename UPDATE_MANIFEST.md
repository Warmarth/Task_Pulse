# Update Log

## Changes Made from April 25, 2025, to April 30, 2025

## version 1.2.1

### **1. Timer Functionality Enhancements**

- **`getTimeRemaining` Function**:

  - Added properties `tenPercent` and `twentyPercent` to calculate specific time thresholds.
  - Enhanced the return object to include:
    - `isExpired`: Indicates if the timer has expired.
    - `formatted`: A human-readable time format (e.g., `1d 2h 3m 4s`).
    - `compact`: A compact format (e.g., `01:02:03`).

- **`startTimer` Function**:
  - Added logic to toggle CSS classes (`twenty-percent` and `ten-percent`) based on the remaining time.
  - Improved handling of expired timers:
    - Cleared intervals when the timer expired.
    - Updated the UI to reflect the expiration.

---

### **2. Task Deletion**

- **Delete Button**:
  - Added an event listener to delete tasks:
    - Clears the timer interval for the task (if it exists).
    - Removes the task from the `tasks` array.
    - Updates `localStorage` and re-renders the task list.

---

### **3. Checkbox for Task Completion**

- **Checkbox Functionality**:
  - Added a checkbox to mark tasks as completed.
  - Toggled the `completed` class on the task description based on the checkbox state.
  - Updated the `tasks` array and `localStorage` when the checkbox state changed.

---

### **4. UI Enhancements**

- **Highlighting Tasks**:
  - Added the `focusOnMainTask` function to scroll to and highlight a specific task.
  - Highlighted tasks are visually emphasized for a short duration.

```javascript
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
```

- **Vibration Alert**:
  - Added the `vibrateTask` function to vibrate the device and alert the user when a timer expires.

```javascript
window.vibrateTask = () => {
  if (navigator.vibrate) {
    setTimeout(() => {
      navigator.vibrate(1000);
      alert("your timer has expired!");
    }, 1000);
  }
};
```

---

### **5. local Storage Integration**

- **Centralized local Storage Updates**:
  - Added the `saveTasksToLocalStorage` function to save the `tasks` array to `localStorage`.

```javascript
export function saveTasksTolocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
```

- **Ensured All Updates Reflect in `localStorage`**:
  - Task additions, deletions, edits, and completion status changes now update `localStorage` consistently.

---

### **6. Added Priority Container Toggle**

- **`moreOption` Click Event**:
  - Added an event listener to the "More Options" button (`moreOption`) to toggle the visibility of the priority container (`optionals`).
  - This allows users to dynamically show or hide additional options in the UI.

```javascript
moreOption.addEventListener("click", () => {
  optionals.classList.toggle("show-priority-container");
});
```

---

### **7. Added Priority Container Styles**

- **`.priority-container`**:
  - Added styles for the priority container to position it absolutely, hide it by default, and style its appearance.

```css
.priority-container {
  position: absolute;
  top: 0;
  right: 0;
  background-color: #263035;
  display: none;
  flex-direction: column;
  align-items: center;
  border-radius: var(--radius-sm);
  gap: var(--gap-sm);
  padding: var(--gap-sm);
}
```

- **`.show-priority-container`**:
  - Added a class to display the priority container when toggled.

---

### **8. Added Timer Warning Styles**

- **`.ten-percent`**:
  - Added styles for tasks with less than 10% of their time remaining, including a pulsing animation.

```css
.ten-percent {
  color: rgb(206, 19, 19);
  animation: pulse 1s infinite;
}
```

- **`.twenty-percent`**:
  - Added styles for tasks with less than 20% of their time remaining, including a pulsing animation.

```css
.twenty-percent {
  color: rgb(236, 223, 33);
  animation: pulse 1ms infinite;
}
```

- **`@keyframes pulse`**:
  - Defined a pulsing animation for the timer warnings.

---

### **9. Added Highlighted Task Styles**

- **`.highlighted`**:
  - Added styles for highlighting a task when it is focused.

### Summary

These changes improve the functionality, user experience, and data persistence of the task manager application. Key features include:

1. Enhanced timer handling.
2. Task deletion and completion tracking.
3. UI improvements such as task highlighting and priority container toggling.
4. Centralized local storage management.
5. Improved styling for priority containers, timer warnings, and task highlighting.

# Update Log

## Changes Made from April 30, 2025, to May 3, 2025

## version 1.3.1

6. Drag-and-drop sorting of tasks with intuitive behavior
7. Persistent order and data, even after page reload, using localStorage
8. Dynamic UI updates when adding/editing/deleting tasks
9. Smooth DOM reordering logic that aligns UI with saved state
