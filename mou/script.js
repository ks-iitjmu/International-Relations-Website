document.addEventListener("DOMContentLoaded", function () {
  const triggers = Array.from(document.querySelectorAll(".accordion-trigger"));
  function closeAllExcept(openTrigger) {
    triggers.forEach((t) => {
      if (t !== openTrigger) {
        t.setAttribute("aria-expanded", "false");
        const panel = document.getElementById(t.getAttribute("aria-controls"));
        panel.style.maxHeight = null;
        panel.classList.remove("open");
      }
    });
  }
  function toggle(trigger) {
    const expanded = trigger.getAttribute("aria-expanded") === "true";
    if (expanded) {
      trigger.setAttribute("aria-expanded", "false");
      const panel = document.getElementById(
        trigger.getAttribute("aria-controls")
      );
      panel.style.maxHeight = null;
      panel.classList.remove("open");
    } else {
      closeAllExcept(trigger);
      trigger.setAttribute("aria-expanded", "true");
      const panel = document.getElementById(
        trigger.getAttribute("aria-controls")
      );
      panel.classList.add("open");
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }
  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => toggle(trigger));
  });
});
