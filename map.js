const highlightCountries = {
  IT: { name: "Italy", mou: "Italy" },
  BR: { name: "Brazil", mou: "Brazil" },
  FR: { name: "France", mou: "France" },
  US: { name: "USA", mou: "USA" },
  TW: { name: "Taiwan", mou: "Taiwan" },
  NO: { name: "Norway", mou: "Norway" },
  FI: { name: "Finland", mou: "Finland" },
  JP: { name: "Japan", mou: "Japan" },
  DE: { name: "Germany", mou: "Germany" },
  CA: { name: "Canada", mou: "Canada" },
};

window.addEventListener("DOMContentLoaded", () => {
  const svg = document.querySelector("svg.mapsvg");
  const mapDiv = document.querySelector(".map");
  if (!svg || !mapDiv) return;
  svg.querySelectorAll("path[id]").forEach((path) => {
    path.style.fill = "#9b9b9bff";
    path.style.transition = "fill 0.2s";
    path.style.cursor = "default";

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

  Object.entries(highlightCountries).forEach(([id, { mou, name }]) => {
    const country =
      document.getElementById(id) ||
      svg.querySelector(`#${id}`) ||
      svg.querySelector("[id='" + id + "']");
    if (!country) {
      console.warn(`Country path with id="${id}" not found in SVG.`);
      return;
    }

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
      window.location.href = `./mou.html#${encodeURIComponent(mou)}`;
    });
  });
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
