// DOM Elements
const switcher1 = document.querySelector(".switch-1");
const switcher2 = document.querySelector(".switch-2");
const card = document.querySelector(".card");
const header = document.querySelector(".card-header");
const input = document.querySelector(".taskpulse-input input");
const textarea = document.querySelector(".taskpulse-input textarea");
const moreOption = document.getElementById("more-option");
const optionals = document.querySelector(".priority-container");

const body = document.body;

export function switchToLightTheme() {
  switcher2.classList.add("close-switch");
  switcher1.classList.add("show-switch");
  card.classList.replace("dark", "light");
  header.classList.remove("card-header-dark");
  input.classList.remove("input-dark");
  textarea.classList.remove("input-dark");
  body.classList.remove("dark-theme");
  localStorage.setItem("theme", "light");
}

export function switchToDarkTheme() {
  switcher2.classList.remove("close-switch");
  switcher1.classList.remove("show-switch");
  card.classList.replace("light", "dark");
  header.classList.add("card-header-dark");
  input.classList.add("input-dark");
  textarea.classList.add("input-dark");
  body.classList.add("dark-theme");
  localStorage.setItem("theme", "dark");
}

export function initializeTheme() {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    switchToDarkTheme();
  } else {
    switchToLightTheme();
  }
}

// Event Listeners for Theme Switching
switcher1.addEventListener("click", switchToDarkTheme);
switcher2.addEventListener("click", switchToLightTheme);

moreOption.addEventListener("click", () => {
  optionals.classList.toggle("show-priority-container");
});

// System Theme Change Detection
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      e.matches ? switchToDarkTheme() : switchToLightTheme();
    }
  });
