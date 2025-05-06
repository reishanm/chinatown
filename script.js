const content = document.getElementById("content");
const loader = document.getElementById("loader");

let sectionCount = 0;

// Scroll Zoom effect using Intersection Observer
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    entry.target.classList.toggle("in-view", entry.isIntersecting);
  });
}, {
  threshold: 0.5
});

function createScrollZoomSection(index) {
  const section = document.createElement("section");
  section.className = "scroll-zoom";
  section.innerHTML = `
    <img src="https://picsum.photos/seed/${Date.now()}${index}/1600/900" class="zoom-img" alt="Zoom ${index}">
    <div class="overlay">Zoomed Section ${index}</div>
  `;
  content.appendChild(section);
  observer.observe(section);
}

function loadMoreSections() {
  for (let i = 0; i < 3; i++) {
    sectionCount++;
    createScrollZoomSection(sectionCount);
  }
}

// Infinite Scroll
window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 10) {
    loader.style.display = "block";
    setTimeout(() => {
      loadMoreSections();
      loader.style.display = "none";
    }, 1000);
  }
});

// Initial load
loadMoreSections();
