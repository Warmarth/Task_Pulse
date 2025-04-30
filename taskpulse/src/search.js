const container = document.querySelector(".card-content");

const tab = JSON.parse(sessionStorage.getItem("tasks")) || [];

export function startSearch() {
  const searchContainer = document.createElement("section");
  searchContainer.classList.add("search-container");

  searchContainer.innerHTML = `
  <div class= "findHeader">
  <div class="search-bar">
  <span class='fa-search'><i class="fa-solid fa-search"></i></span>
  <label class="search-label">
  <input type="text" id="task_input" placeholder="search ....."/></label>
  </label>
  </div>
  <button class='fa-closeBtn'><i class="fa-solid fa-close"></i></button>
  </div>
  <article id='resultList' class='result-container'></article>
  `;

  container.appendChild(searchContainer);

  const closeButton = searchContainer.querySelector(".fa-closeBtn");
  closeButton?.addEventListener("click", () => {
    searchContainer.remove();
  });

  const input = searchContainer.querySelector("#task_input");
  input.addEventListener("input", (e) => {
    e.preventDefault();
    let query = e.target.value.trim().toLowerCase();
    console.log(query);
    if (!query) {
      renderResult([]);
    } else {
      const newTab = tab?.filter(
        (tabContent) =>
          tabContent.title.toLowerCase().includes(query) ||
          tabContent.priority.toLowerCase().includes(query)
      );
      renderResult(newTab);
    }
  });

  function renderResult(itemRendered) {
    const resultList = searchContainer.querySelector("#resultList");
    resultList.innerHTML = itemRendered.length
      ? itemRendered
          .map(
            (task) => `
            <div key="${task.id}" data-task-id="${task.id}" class="found-card">
            <h5>${task.title}</h5>
              <p>${task.description}</p>
            </div>
          `
          )
          .join(" ")
      : "<p>No results found</p>";

    const resultItems = resultList.querySelectorAll(".found-card");
    resultItems.forEach((taskitem) =>
      taskitem.addEventListener("click", (event) => {
        const taskId = event.currentTarget.getAttribute("data-task-id");
        window.focusOnMainTask(taskId);
      })
    );
  }
}
