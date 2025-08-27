const btn = document.getElementById("menu-btn");
const nav = document.getElementById("menu");

btn.addEventListener("click", () => {
  btn.classList.toggle("open");
  nav.classList.toggle("flex");
  nav.classList.toggle("hidden");
});

const slider = document.getElementById("testimonial-slider");
const slides = Array.from(slider.children);
const dots = Array.from(
  document.getElementById("carousel-dots").querySelectorAll(".dot")
);
let index = 0,
  autoTimer = null,
  touchStartX = 0,
  touchEndX = 0;

const isMobile = () => window.innerWidth < 768;

function setActiveDot(i) {
  dots.forEach((d, n) => d.classList.toggle("bg-brightRed", n === i));
}

function goTo(i) {
  index = (i + slides.length) % slides.length;
  slider.style.transform = isMobile() ? `translateX(-${index * 100}%)` : "";
  setActiveDot(index);
}

function startAuto() {
  stopAuto();
  if (isMobile()) autoTimer = setInterval(() => goTo(index + 1), 5000);
}
function stopAuto() {
  if (autoTimer) {
    clearInterval(autoTimer);
    autoTimer = null;
  }
}

dots.forEach((d, i) =>
  d.addEventListener("click", () => {
    stopAuto();
    goTo(i);
    startAuto();
  })
);

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

window.addEventListener("resize", () => {
  goTo(index);
  startAuto();
});

goTo(0);
startAuto();

const form = document.getElementById("newsletter-form");
const emailInput = document.getElementById("newsletter-email");
const errorMsg = document.getElementById("newsletter-error");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    errorMsg.classList.remove("hidden");
    emailInput.classList.add("border", "border-brightRed");
  } else {
    errorMsg.classList.add("hidden");
    emailInput.classList.remove("border", "border-brightRed");
    alert("Subscribed successfully 🎉");
    form.reset();
  }
});
