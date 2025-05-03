window.saveSort = () => {
  const savedTask = Array.from(document.querySelectorAll(".task-item"));
  const order = savedTask.map((item) => item.dataset.id);
  localStorage.setItem("savesort", JSON.stringify(order));
};

export const dragFunction = () => {
  const taskContainer = document.querySelector(".task-container");
  const tasks = [...taskContainer.querySelectorAll(".task-item")];
  tasks.forEach((task) => {
    task.addEventListener("dragstart", (e) => {
      setTimeout(() => task.classList.add("dragging"), 0);
    });
    task.addEventListener("dragend", () => {
      task.classList.remove("dragging");
      saveSort();
    });
  });

  function containTask(e) {
    e.preventDefault();
    const draggingItem = document.querySelector(".dragging");
    let siblings = [
      ...taskContainer.querySelectorAll(".task-item:not(.dragging)"),
    ];
    let nextSibling = siblings.find((sibling) => {
      const elementRect = sibling.getBoundingClientRect();
      return e.clientY <= elementRect.top + elementRect.height / 2;
    });
    const ref = siblings.length > 0 ? siblings[siblings.length - 1] : null;
    if (ref) {
      taskContainer.insertBefore(draggingItem, nextSibling);
    } else {
      taskContainer.appendChild(draggingItem);
    }
  }
  taskContainer.addEventListener("dragover", containTask);
  taskContainer.addEventListener("dragenter", (e) => {
    e.preventDefault();
  });
};
// const isAbove = (e, sibling) => {
//   const elementRect = sibling.getBoundingClientRect();
//   return (
//     e.clientY <= elementRect.top + elementRect.height / 2 && 
//     e.clientY >= elementRect.top - elementRect.height / 2
//   ); 
// return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
// return e.pageY < sibling.offsetTop;
