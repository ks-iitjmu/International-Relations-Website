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
    return `<img src="${item.svg}" alt="${item.name || ""}" title="${item.name || ""
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