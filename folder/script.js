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
