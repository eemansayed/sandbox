const toggle = document.querySelector(".toggle");
const toggleCross = document.querySelector(".toggle-cross");
const offCanvas = document.querySelector(".off-canvas");
const offCanvasCloseButton = document.querySelector(".off-canvas-close");
const buttons = document.querySelectorAll(".buttons>button");
const slides = document.querySelectorAll(".testimonial");

let lastClickedButton;
let lastSlide = 0;
let dragDelta = 0;
let isMoving;
let dragStartX;

function move(slide, translateXPercentage) {
  slide.style.transform = `translateX(${translateXPercentage}%)`;
}

const slideButtonClickHandler = (event) => {
  const button = event.target;
  lastSlide = button.buttonIndex;
  if (lastClickedButton) lastClickedButton.classList.remove("active");
  button.classList.add("active");
  lastClickedButton = button;
  slides.forEach((slide, slideIndex) =>
    move(slide, (slideIndex - button.buttonIndex) * 100)
  );
};

function setupTestimonialSlides() {
  const activeSlideButton = buttons[1];
  activeSlideButton.buttonIndex = 1;
  slideButtonClickHandler({ target: activeSlideButton });
}

buttons.forEach((button, buttonIndex) => {
  button.buttonIndex = buttonIndex;
  button.addEventListener("click", slideButtonClickHandler);
});

const mouseMoveListener = (e) => {
  slides.forEach((slide, slideIndex) => {
    dragDelta =
      (e.clientX - dragStartX) / (slide.getBoundingClientRect().width / 100);
    console.log("delta ", slide.getBoundingClientRect().width);
    if (Math.abs(dragDelta) > 10) {
      const width = (slideIndex - lastSlide) * 100 + dragDelta;
      slide.style.transform = `translateX(${width}%)`;
    }
  });
};
function getNextSlide() {
  if (dragDelta > 10) {
    return lastSlide - 1 < 0 ? 0 : lastSlide - 1;
  } else if (dragDelta < -10) {
    return lastSlide + 1 >= slides.length ? slides.length - 1 : lastSlide + 1;
  } else return lastSlide;
}

function moveNextSlide() {
  const next = getNextSlide();
  lastSlide = next;
  slides.forEach((slide, slideIndex) => move(slide, (slideIndex - next) * 100));
}

function removeMouseMoveListener(e) {
  console.log(e);
  if (isMoving) {
    moveNextSlide();
    isMoving = false;
  }
  e.target.removeEventListener("mousemove", mouseMoveListener);
}

slides.forEach((slide) => {
  slide.addEventListener("mousedown", (event) => {
    dragStartX = event.clientX;
    isMoving = true;
    slide.addEventListener("mousemove", mouseMoveListener);
  });

  slide.addEventListener("mouseleave", removeMouseMoveListener);
  slide.addEventListener("mouseup", removeMouseMoveListener);
});

const elements = [toggle, toggleCross, offCanvas];

const toggleVisibility = () => {
  elements.forEach((element) => {
    element.classList.toggle("visible");
    element.classList.toggle("invisible");
  });
};

elements.forEach((element) =>
  element.addEventListener("click", toggleVisibility)
);

const progressAnimateIncrement = () => {
  const counters = document.querySelectorAll(".progressbar-num");
  counters.forEach((counter) => (counter.innerHTML = 0));
  const intervalId = setInterval(() => {
    let count = +counters[0].innerHTML;
    if (count < 95) counters[0].innerHTML = count + 1;
    else clearInterval(intervalId);

    count = +counters[1].innerHTML;
    if (count < 80) counters[1].innerHTML = count + 1;
  }, 30);
};

const visibilityChangeHandler = () => {
  const element = document.querySelector(".semi-circles");
  const progresses = document.querySelectorAll(
    ".pros-section .container .semi-circles svg"
  );

  const isElementInView = () => {
    const rectangle = element.getBoundingClientRect();

    return (
      rectangle.top >= 0 &&
      rectangle.left >= 0 &&
      rectangle.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rectangle.right <=
        (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  let wasVisible;
  let isVisible = isElementInView(element);
  if (isVisible != wasVisible) {
    wasVisible = isVisible;
    const progressPink = progresses[0].children[1].classList;
    const progressOrange = progresses[1].children[1].classList;
    progressPink.remove("progress-pink");
    progressOrange.remove("progress-orange");
    const addProgressClasses = () => {
      progressPink.add("progress-pink");
      progressOrange.add("progress-orange");
    };
    setTimeout(addProgressClasses, 1);
    progressAnimateIncrement();
  }
};

if (window.addEventListener) {
  addEventListener("DOMContentLoaded", visibilityChangeHandler, false);
  addEventListener("load", visibilityChangeHandler, false);
  addEventListener("scroll", visibilityChangeHandler, false);
  addEventListener("resize", visibilityChangeHandler, false);
}
setupTestimonialSlides();
