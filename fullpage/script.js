var nextBtn = document.querySelector(".next-kunal"),
  prevBtn = document.querySelector(".prev-kunal"),
  carousel = document.querySelector(".carousel"),
  list = document.querySelector(".carousel-list"),
  item = document.querySelectorAll(".carousel-item"),
  runningTime = document.querySelector(".carousel .timeRunning");

let timeRunning = 3000;
let timeAutoNext = 7000;

nextBtn.onclick = function () {
  showSlider("next");
};

prevBtn.onclick = function () {
  showSlider("prev");
};

let runTimeOut;

let runNextAuto = setTimeout(() => {
  nextBtn.click();
}, timeAutoNext);

function resetTimeAnimation() {
  runningTime.style.animation = "none";
  runningTime.offsetHeight;
  runningTime.style.animation = null;
  runningTime.style.animation = "runningTime 7s linear 1 forwards";
}

function showSlider(type) {
  let sliderItemsDom = list.querySelectorAll(
    ".carousel .carousel-list .carousel-item"
  );
  if (type === "next") {
    list.appendChild(sliderItemsDom[0]);
    carousel.classList.add("next-kunal");
  } else {
    list.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
    carousel.classList.add("prev-kunal");
  }

  clearTimeout(runTimeOut);

  runTimeOut = setTimeout(() => {
    carousel.classList.remove("next-kunal");
    carousel.classList.remove("prev-kunal");
  }, timeRunning);

  clearTimeout(runNextAuto);
  runNextAuto = setTimeout(() => {
    nextBtn.click();
  }, timeAutoNext);

  resetTimeAnimation();
}
resetTimeAnimation();

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

const flagItems = [
  { svg: "svg/italy.svg", name: "Italy" },
  { svg: "svg/brazil.svg", name: "Brazil" },
  { svg: "svg/france.svg", name: "France" },
  { svg: "svg/us.svg", name: "United States" },
  { svg: "svg/taiwan.svg", name: "Taiwan" },
  { svg: "svg/norway.svg", name: "Norway" },
  { svg: "svg/finland.svg", name: "Finland" },
  { svg: "svg/england.svg", name: "United Kingdom" },
  { svg: "svg/japan.svg", name: "Japan" },
  { svg: "svg/germany.svg", name: "Germany" },
  { svg: "svg/canada.svg", name: "Canada" },
];

function makeFlagHtml(item) {
  if (item.svg) {
    return `<img src="${item.svg}" alt="${item.name || ""}" title="${
      item.name || ""
    }" loading="lazy"/>`;
  }
  return "";
}

function fillFlags() {
  const marquee = document.querySelector(".flag-marquee");
  if (!marquee) return;
  const spans = marquee.querySelectorAll(".flags");
  spans.forEach((span) => {
    let repeated = "";
    const temp = document.createElement("span");
    temp.className = "flags";
    temp.style.visibility = "hidden";
    temp.style.position = "absolute";
    temp.style.whiteSpace = "nowrap";
    document.body.appendChild(temp);
    let count = 0;
    while (true) {
      let seqHtml = flagItems.map(makeFlagHtml).join(" ");
      temp.innerHTML = repeated + seqHtml;
      if (temp.offsetWidth > window.innerWidth * 2) break;
      repeated += seqHtml + " ";
      count++;
      if (count > 100) break;
    }
    span.innerHTML = repeated.trim();
    document.body.removeChild(temp);
  });
}
window.addEventListener("DOMContentLoaded", fillFlags);
window.addEventListener("resize", fillFlags);
