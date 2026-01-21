// app.js
// Ab jetzt NUR App-Logik – KEIN Firebase Init, KEIN Login

console.log("App.js geladen");

// Navigation
const buttons = document.querySelectorAll(".bottom-nav button");
const screens = document.querySelectorAll(".screen");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    screens.forEach(s => s.classList.remove("active"));
    document
      .getElementById(btn.dataset.screen + "-screen")
      .classList.add("active");
  });
});
