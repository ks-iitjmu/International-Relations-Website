document.addEventListener("DOMContentLoaded", function () {
  const accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach((item) => {
    const button = item.querySelector(".accordion-button");
    const content = item.querySelector(".accordion-content");

    button.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      accordionItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
          otherItem
            .querySelector(".accordion-content")
            .classList.remove("active");
        }
      });

      if (!isActive) {
        item.classList.add("active");
        content.classList.add("active");
      } else {
        item.classList.remove("active");
        content.classList.remove("active");
      }
    });

    button.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        button.click();
      }
    });
  });
});
