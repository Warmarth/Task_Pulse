# TaskPulse - Smart To-Do Manager

## 1. Project Title

TASKPULSE

**TaskPulse** – A lightweight, theme-aware to-do application with task scheduling and session-based persistence.
TaskPulse

## 2. Brief Description

TaskPulse is a simple, browser-based task manager that allows users to add, complete, and visually track tasks. The app supports a light/dark theme toggle and displays timestamps for each task, storing them temporarily using session storage.

## 3. Team Members and Advisors

- **Team Members:**
  Cobby Franky **[cobbyfranky@outlook.com](mailto:cobbyfranky@outlook.com)**.
  Gospel33 **[gospelsomtochim22@gmail.com](mailto:gospelsomtochim22@gmail.com)**.
  Precious-chinecherem **[chinecheremifeanyi924@gmail.com](mailto:chinecheremifeanyi924@gmail.com)**.
  Okoronkwo Michael **[okoronkwomikec@gmail.com](mailto:okoronkwomikec@gmail.com)**.
- **Advisors:**
  - PADIO

## 4. Tech Used

- **Frontend:** HTML, CSS, JavaScript
- **Storage:** `sessionStorage` (for temporary data persistence)
- **Icons & Fonts:** (optional, if used in UI)
- **Theme:** CSS Variables for theming
- **Rendrring:** DOM Manipulation for dynamic task rendering
- **UUID:** (crypto.randomUUID) for unique task identification

## 5. Challenges and Solutions

- **Task Persistence:**  
  _Challenge:_ Ensuring tasks persist temporarily across views during a session.  
  _Solution:_ Implemented `sessionStorage` to save tasks by unique IDs and track completion status.

- **Theme Toggle:**  
  _Challenge:_ Creating an intuitive theme switch.  
  _Solution:_ Added two toggles with dynamic class replacement to switch between light and dark themes.

- **Form Validation:**  
  _Challenge:_ Preventing empty task submissions.  
  _Solution:_ Added input validation with user feedback via `alert()`.

## 6. Feature Plans

- [#] Persistent storage using `localStorage` or backend integration (e.g., Firebase)
- [#] Drag-and-drop task reordering
- [ ] Task category filtering (e.g., Work, Personal)
- [ ] Responsive design for mobile view
- [ ] Daily/weekly reminders
- [#] Add edit/delete functionality for tasks.
