// DOM Elements
const switcher1 = document.querySelector(".switch-1");
const switcher2 = document.querySelector(".switch-2");
const html = document.querySelector("html");
const input = document.querySelector(".taskpulse-input input");
const textarea = document.querySelector(".taskpulse-input textarea");
const moreOption = document.getElementById("more-option");
const optionals = document.querySelector(".priority-container");
// const header = document.querySelector(".card-header");
// const card = document.querySelector(".card");
// const body = document.querySelector("body");

export function switchToLightTheme() {
  switcher2.classList.add("close-switch");
  input.classList.remove("input-dark");
  textarea.classList.remove("input-dark");
  switcher1.classList.add("show-switch");
  html.classList.remove("dark-theme");
  localStorage.setItem("theme", "light");
  // card.classList.replace("dark", "light");
  // header.classList.remove("card-header-dark");
  // body.classList.remove("dark-theme");
}

export function switchToDarkTheme() {
  switcher2.classList.remove("close-switch");
  switcher1.classList.remove("show-switch");
  input.classList.add("input-dark");
  html.classList.add("dark-theme");
  textarea.classList.add("input-dark");
  localStorage.setItem("theme", "dark");
  // body.classList.add("dark-theme");
  // header.classList.add("card-header-dark");
  // card.classList.replace("light", "dark");
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
  moreOption.classList.toggle("rotate");
});
