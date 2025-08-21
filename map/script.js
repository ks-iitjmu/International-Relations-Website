const highlightCountries = {
  IT: { name: "Italy", url: "https://en.wikipedia.org/wiki/Italy" },
  BR: { name: "Brazil", url: "https://en.wikipedia.org/wiki/Brazil" },
  FR: { name: "France", url: "https://en.wikipedia.org/wiki/France" },
  US: {
    name: "United States",
    url: "https://en.wikipedia.org/wiki/United_States",
  },
  TW: { name: "Taiwan", url: "https://en.wikipedia.org/wiki/Taiwan" },
  NO: { name: "Norway", url: "https://en.wikipedia.org/wiki/Norway" },
  FI: { name: "Finland", url: "https://en.wikipedia.org/wiki/Finland" },
  GB: { name: "England", url: "https://en.wikipedia.org/wiki/England" },
  JP: { name: "Japan", url: "https://en.wikipedia.org/wiki/Japan" },
  DE: { name: "Germany", url: "https://en.wikipedia.org/wiki/Germany" },
  CA: { name: "Canada", url: "https://en.wikipedia.org/wiki/Canada" },
  IN: { name: "India", url: "https://en.wikipedia.org/wiki/India" },
};

window.addEventListener("DOMContentLoaded", () => {
  const svg = document.querySelector("svg");
  if (!svg) return;
  svg.querySelectorAll("path[id]").forEach((path) => {
    path.style.fill = "#9b9b9bff";
    path.style.transition = "fill 0.2s";
    path.style.cursor = "default";
  });

  // Tooltip element
  const tooltip = document.createElement("div");
  tooltip.style.position = "fixed";
  tooltip.style.pointerEvents = "none";
  tooltip.style.background = "rgba(30, 30, 30, 0.95)";
  tooltip.style.color = "#fff";
  tooltip.style.padding = "4px 10px";
  tooltip.style.borderRadius = "5px";
  tooltip.style.fontSize = "15px";
  tooltip.style.fontFamily = "sans-serif";
  tooltip.style.zIndex = "9999";
  tooltip.style.display = "none";
  document.body.appendChild(tooltip);

  Object.entries(highlightCountries).forEach(([id, { url, name }]) => {
    const country = svg.getElementById(id);
    if (country) {
      country.style.fill = "#0c458c";
      country.style.cursor = "pointer";
      country.addEventListener("mouseenter", () => {
        country.style.fill = "#00acea";
        tooltip.textContent = name;
        tooltip.style.display = "block";
      });
      country.addEventListener("mouseleave", () => {
        country.style.fill = "#0c458c";
        tooltip.style.display = "none";
      });
      country.addEventListener("mousemove", (e) => {
        tooltip.style.left = e.clientX + 15 + "px";
        tooltip.style.top = e.clientY + 10 + "px";
      });
      country.addEventListener("click", () => {
        window.open(url, "_blank");
      });
    }
  });
});
