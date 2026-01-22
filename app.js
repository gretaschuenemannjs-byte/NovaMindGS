// DOM Elemente
const loginScreen = document.getElementById("login-screen");
const homeScreen = document.getElementById("home-screen");
const settingsScreen = document.getElementById("settings-screen");
const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");
const logoutBtn = document.getElementById("logout-btn");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const homeCardsContainer = document.getElementById("home-cards");
const currentDateEl = document.getElementById("current-date");

const navButtons = document.querySelectorAll(".nav-btn");

// Simulierter Login-Status
let isLoggedIn = false;

// Datenstruktur für Home-Kacheln
let homeCardsData = [
  {
    type: "tasks",
    title: "ToDos",
    tasks: [
      { text: "E-Mail beantworten", done: false },
      { text: "Meeting vorbereiten", done: true }
    ]
  },
  {
    type: "routines",
    title: "Routinen",
    tasks: [
      { text: "Meditation", done: false },
      { text: "Workout", done: false }
    ]
  },
  {
    type: "calendar",
    title: "Kalender",
    tasks: [
      { text: "Projektbesprechung 10:00", done: false },
      { text: "Arzttermin 15:30", done: false }
    ]
  },
  {
    type: "motivation",
    title: "Motivation",
    quote: "Du schaffst alles, was du dir vornimmst!"
  }
];

// Funktion: Datum anzeigen
function updateDate() {
  const now = new Date();
  currentDateEl.textContent = now.toLocaleDateString("de-DE", { weekday:"long", day:"numeric", month:"long"});
}

// Funktion: Home-Kacheln rendern
function renderHomeCards() {
  homeCardsContainer.innerHTML = "";
  homeCardsData.forEach((card, index) => {
    const div = document.createElement("div");
    div.classList.add("home-card");
    div.dataset.index = index;

    const title = document.createElement("div");
    title.classList.add("card-title");
    title.textContent = card.title;
    div.appendChild(title);

    const content = document.createElement("div");
    content.classList.add("card-content");

    if(card.type === "motivation") {
      content.classList.add("motivation-card");
      content.textContent = card.quote;
    } else {
      card.tasks.forEach((task, tIndex) => {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("card-task");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.done;
        checkbox.addEventListener("change", () => {
          task.done = checkbox.checked;
        });

        const label = document.createElement("label");
        label.textContent = task.text;

        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(label);
        content.appendChild(taskDiv);
      });
    }

    div.appendChild(content);

    // Klick → Detailansicht (optional)
    div.addEventListener("click", () => {
      alert(`Detailansicht für "${card.title}" (hier kann bearbeitet werden)`);
    });

    homeCardsContainer.appendChild(div);
  });
}

// Navigation
navButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    const target = document.getElementById(btn.dataset.target);
    if(target) target.classList.add("active");
    navButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

// UI updaten
function updateUI() {
  if(isLoggedIn) {
    loginScreen.style.display = "none";
    homeScreen.classList.add("active");
    document.querySelector(".bottom-nav").style.display = "flex";

    // Accent-Farbe automatisch an Hintergrund (leicht transparent)
    const bgColor = window.getComputedStyle(document.body).backgroundColor;
    document.documentElement.style.setProperty('--glass-bg', 'rgba(255,255,255,0.18)');

    updateDate();
    renderHomeCards();
  } else {
    loginScreen.style.display = "flex";
    loginScreen.style.opacity = 1;
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.querySelector(".bottom-nav").style.display = "none";
  }
}

// Login/Register
loginBtn.addEventListener("click", () => {
  isLoggedIn = true;
  updateUI();
});
registerBtn.addEventListener("click", () => {
  isLoggedIn = true;
  updateUI();
});

// Logout
logoutBtn.addEventListener("click", () => {
  isLoggedIn = false;
  updateUI();
});

// Initial UI
updateUI();
