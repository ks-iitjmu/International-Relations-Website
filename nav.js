function toggleSidePanel() {
  const sidePanel = document.querySelector(".side-panel");
  const overlay = document.querySelector(".overlay");
  const hamburger = document.querySelector(".hamburger-kunal");

  sidePanel.classList.toggle("active");
  overlay.classList.toggle("active");
  hamburger.classList.toggle("active");
}

function closeSidePanel() {
  const sidePanel = document.querySelector(".side-panel");
  const overlay = document.querySelector(".overlay");
  const hamburger = document.querySelector(".hamburger-kunal");

  sidePanel.classList.remove("active");
  overlay.classList.remove("active");
  hamburger.classList.remove("active");
}

document.querySelectorAll(".side-panel-nav a").forEach((link) => {
  link.addEventListener("click", closeSidePanel);
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeSidePanel();
  }
});
document.querySelectorAll(".nav-item-kunal").forEach((navItem) => {
  const link = navItem.querySelector(".nav-link-kunal");
  const dropdown = navItem.querySelector(".nav-dropdown");
  if (!dropdown || !link) return;

  link.addEventListener("click", (e) => {
    e.preventDefault();
    navItem.classList.toggle("open");
  });

  document.addEventListener("click", (e) => {
    if (!navItem.contains(e.target)) {
      navItem.classList.remove("open");
    }
  });
});
