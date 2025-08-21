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
  const mapDiv = document.querySelector(".map");
  if (!svg || !mapDiv) return;
  svg.querySelectorAll("path[id]").forEach((path) => {
    path.style.fill = "#9b9b9bff";
    path.style.transition = "fill 0.2s";
    path.style.cursor = "default";
  });

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

  let zoomLevel = 2.2;
  let isZooming = false;

  function setZooming(active) {
    isZooming = active;
    if (active) {
      mapDiv.classList.add("zooming");
    } else {
      mapDiv.classList.remove("zooming");
      svg.style.transform = "scale(1)";
      svg.style.transformOrigin = "50% 50%";
    }
  }

  svg.style.transform = "scale(1)";
  svg.style.transformOrigin = "50% 50%";

  mapDiv.addEventListener("mouseenter", (e) => setZooming(true));
  mapDiv.addEventListener("mouseleave", (e) => setZooming(false));

  mapDiv.addEventListener("mousemove", (e) => {
    if (!isZooming) return;
    const rect = mapDiv.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const percentX = x / rect.width;
    const percentY = y / rect.height;
    const originX = percentX * 100;
    const originY = percentY * 100;
    svg.style.transformOrigin = `${originX}% ${originY}%`;
    svg.style.transform = `scale(${zoomLevel})`;
  });
});
