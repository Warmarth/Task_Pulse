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

# **Task Manager Update Manifest**

**Version**: 1.2.0  
**Release Date**: _[25-4-2025]_

---

## **1. New Features**

### **A. Time Management System**

- ✅ Time tracking with live countdown timers
- **Features**:  
  | Feature | Location | Description |  
  |----------------------|-------------------|-----------------------------------------------|  
  | `getTimeRemaining()` | `task-manager.js` | Calculates days/hours/minutes remaining until deadline |  
  | `startTimer()` | `task-manager.js` | Live countdown timer with visual urgency states |  
  | Deadline Highlighting | CSS | Color-coded warnings for nearing/expired tasks (in progress) |

- **Example Output**:
  ```
  3d 05h 12m remaining (normal)
  00h 59m remaining (red highlight)
  Time expired (grayed out)
  ```

---

### **B. Enhanced Search**

- ✅ Enhanced search with priority filtering
- **Features**:  
  | Feature | Location | Description |  
  |----------------------|-------------------|-----------------------------------------------|  
  | `startSearch()` | `search.js` | Real-time search overlay with priority filtering |  
  | Task Navigation | `focusOnMainTask()` | Clicking search results scrolls to and highlights the task |

- **Key Improvements**:
  - Searches both titles **and** priorities
  - Case-insensitive matching

---

### **C. Data Formatting Utilities**

- ✅ Cross-component task navigation
- **Functions**:  
  | Function | Location | Input → Output |  
  |---------------------|-------------------|-----------------------------------------------|  
  | `formatDate()` | `task-manager.js` | `Date` → `YYYY-MM-DD` |  
  | `addNewLine()` | `task-manager.js` | `"Line1\nLine2"` → `"Line1<br>Line2"` |

---

## **2. Modified Components**

| File              | Changes                                                           |
| ----------------- | ----------------------------------------------------------------- |
| `task-manager.js` | Added timer logic, deadline handling                              |
| `search.js`       | Implemented cross-component navigation                            |
| CSS               | Added `.highlighted`, `.urgent`, `.expired` classes (in progress) |

---

## **3. Breaking Changes**

- **Required DOM Structure**:
  ```html
  <div class="todo-card" data-task-id="...">
    <!-- Now mandatory -->
    <span class="duetime"></span>
    <!-- For timer display -->
  </div>
  ```

---

## **4. Upgrade Instructions**

### **A. For Developers**

1. Merge new dependencies:
   ```bash
   npm install --save date-fns
   ```
2. Update HTML:
   ```html
   <!-- Add to <head> -->
   <link rel="stylesheet" href="css/timer.css" />
   ```

### **B. For Users**

- Existing tasks will auto-migrate
- New "Time Remaining" column visible for dated tasks
- descrption text breaks after editing and aligns in the center

```
'task1<br>task2<br>'
```

---

## **5. Known Issues**

| Issue                       | Workaround                           |
| --------------------------- | ------------------------------------ |
| Timezone handling in timers | Use UTC (`new Date().toISOString()`) |
| Duplicate timer intervals   | Fixed in v1.2.1                      |

---

## **6. Pending Features**

- [ ] Recurring tasks
- [ ] Task categories in search
- [ ] Timer pause/resume

---

## **7. Approval**

| Role           | Name      | Signature | Date |
| -------------- | --------- | --------- | ---- |
| Lead Developer | _[cobby]_ |           |      |
| QA Engineer    | [godson]  |           |      |

---

## **8. Supplementary Files**

### **A. JSON Changelog**

**Filename**: `changelog.json`

```json
{
  "version": "1.2.0",
  "features": [
    {
      "name": "Time Management",
      "components": ["getTimeRemaining()", "startTimer()"],
      "impact": "high"
    }
  ],
  "compatibility": {
    "minNodeVersion": "16.x",
    "browsers": ["Chrome 90+", "Firefox 88+"]
  }
}
```

---

### **B. HTML Release Notes**

**Filename**: `release_notes.html`

```html
<!DOCTYPE html>
<html>
  <head>
    <title>v1.2.0 Update</title>
    <style>
      .feature {
        color: #2ecc71;
      }
    </style>
  </head>
  <body>
    <h1>What's New</h1>
    <ul>
      <li class="feature">Real-time task deadlines</li>
      <li class="feature">Improved search accuracy</li>
    </ul>
  </body>
</html>
```

---

### **C. Excel Compatibility Matrix**

**Filename**: `compatibility_matrix.xlsx`

| Feature         | Chrome | Firefox | Safari | Edge | UC Browser |
| --------------- | ------ | ------- | ------ | ---- | ---------- |
| Time Tracking   | ✔      | ✔       | ✔      | ✔    | ⚠\*      |
| Priority Search | ✔      | ✔       | ⚠\*    | ✔    | ⚠\*      |

_\* Requires polyfill_

---
