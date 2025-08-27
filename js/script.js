const btn = document.getElementById("menu-btn");
const nav = document.getElementById("menu");

btn.addEventListener("click", () => {
  btn.classList.toggle("open");
  nav.classList.toggle("flex");
  nav.classList.toggle("hidden");
});

const slider = document.getElementById("testimonial-slider");
const slides = Array.from(slider.children);
const dotsWrap = document.getElementById("carousel-dots");
const dots = Array.from(dotsWrap.querySelectorAll(".dot"));
let index = 0;
let autoTimer = null;
let touchStartX = 0;
let touchEndX = 0;

function isMobile() {
  return window.innerWidth < 768;
}

function setActiveDot(i) {
  dots.forEach((d, n) => {
    d.classList.remove("bg-brightRed"); // inactive = border only
    if (n === i) d.classList.add("bg-brightRed"); // active = filled + border
  });
}

function goTo(i) {
  index = (i + slides.length) % slides.length;
  if (isMobile()) {
    slider.style.transform = `translateX(-${index * 100}%)`;
  } else {
    slider.style.transform = ""; // no sliding on desktop
  }
  setActiveDot(index);
}

function startAuto() {
  stopAuto();
  if (isMobile()) {
    autoTimer = setInterval(() => goTo(index + 1), 5000);
  }
}
function stopAuto() {
  if (autoTimer) {
    clearInterval(autoTimer);
    autoTimer = null;
  }
}

// dots click
dots.forEach((d, i) =>
  d.addEventListener("click", () => {
    stopAuto();
    goTo(i);
    startAuto();
  })
);

// swipe (mobile)
slider.addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.touches[0].clientX;
    stopAuto();
  },
  { passive: true }
);
slider.addEventListener(
  "touchmove",
  (e) => {
    touchEndX = e.touches[0].clientX;
  },
  { passive: true }
);
slider.addEventListener("touchend", () => {
  const dx = touchEndX - touchStartX;
  if (Math.abs(dx) > 50) goTo(index + (dx < 0 ? 1 : -1));
  startAuto();
});

// handle resize between mobile/desktop
window.addEventListener("resize", () => {
  goTo(index);
  startAuto();
});

// init
goTo(0);
startAuto();
