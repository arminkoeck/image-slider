import "./style.css";

let slideNumber = 0;
let currentPosition = 0;
const slider = document.querySelector(".image-slider > div");

const slides = document.querySelectorAll(".slide");
slides.forEach((slide, index) => {
  slide.setAttribute("data-index", index);
  const dotElement = document.createElement("div");
  dotElement.setAttribute("data-index", index);
  dotElement.classList.add("dot-element");
  if (Number(dotElement.dataset.index) === 0) {
    dotElement.classList.add("active-dot");
  }
  const sliderDotsContainer = document.querySelector(".slider-dots-container");
  sliderDotsContainer.appendChild(dotElement);
  slideNumber += 1;
});

const dots = document.querySelectorAll(".dot-element");
dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    dots.forEach((dot) => {
      dot.classList.remove("active-dot");
    });
    const dotIndex = dot.dataset.index;
    currentPosition = Number(dotIndex);
    let rightInset = `${dotIndex * imageSliderWidth}px`;
    slider.style.right = rightInset;
    setActiveDot();
  });
});

const imageSlider = document.querySelector(".image-slider");
const imageSliderWidth = parseFloat(
  window.getComputedStyle(imageSlider).getPropertyValue("width")
);
slider.style.width = `${slideNumber * imageSliderWidth}px`;

const nextButton = document.querySelector(".next-button");
const prevButton = document.querySelector(".prev-button");

nextButton.addEventListener("click", () => {
  showNextSlide();
  setActiveDot();
});

prevButton.addEventListener("click", () => {
  showPrevSlide();
  setActiveDot();
});

function setActiveDot() {
  dots.forEach((dot) => {
    dot.classList.remove("active-dot");
    const dotIndex = dot.dataset.index;
    if (Number(dotIndex) === currentPosition) {
      dot.classList.add("active-dot");
    }
  });
}

document.addEventListener("click", () => {
  console.log(currentPosition);
});

console.log(slides);

function showNextSlide() {
  currentPosition += 1;
  if (currentPosition < slideNumber) {
    let rightInset = `${currentPosition * imageSliderWidth}px`;
    slider.style.right = rightInset;
  } else {
    currentPosition = 0;
    slider.style.right = `${currentPosition * imageSliderWidth}px`;
  }
}

function showPrevSlide() {
  currentPosition -= 1;
  if (currentPosition >= 0) {
    let rightInset = `${currentPosition * imageSliderWidth}px`;
    slider.style.right = rightInset;
  } else {
    currentPosition = slideNumber - 1;
    let rightInset = `${currentPosition * imageSliderWidth}px`;
    slider.style.right = rightInset;
  }
}

function autoShowNextSlide() {
  setTimeout(() => {
    showNextSlide();
    autoShowNextSlide();
    setActiveDot();
  }, "5000");
}

autoShowNextSlide();
