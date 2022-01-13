const buttons = document.querySelectorAll(".buttons button");
const slides = document.querySelectorAll(".testimonial");
let lastClickedButton = buttons[1];
let lastSlide = 0;
let dragDelta = 0;
let isMoving;
let dragStartX;

function move(slide, translatePercentage) {
  slide.style.transform = `translateX(${translatePercentage}%)`;
}

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
  setActiveButton(lastSlide);
  slides.forEach((slide, slideIndex) => move(slide, (slideIndex - next) * 100));
}

function mouseMoveListener(e) {
  slides.forEach((slide, slideIndex) => {
    dragDelta =
      (e.clientX - dragStartX) / (slide.getBoundingClientRect().width / 100);
    if (Math.abs(dragDelta) > 10) {
      const width = (slideIndex - lastSlide) * 100 + dragDelta;
      slide.style.transform = `translateX(${width}%)`;
    }
  });
}

function getMouseMoveListenerRemover(slide) {
  return function removeMouseMoveListener() {
    slide.removeEventListener("mousemove", mouseMoveListener);
    if (isMoving) {
      moveNextSlide();
      isMoving = false;
    }
  };
}

function setActiveButton(buttonIndex) {
  lastClickedButton.classList.remove("active");
  lastClickedButton = buttons[buttonIndex];
  buttons[buttonIndex].classList.add("active");
}
function getSlideButtonListener(buttonIndex) {
  return () => {
    setActiveButton(buttonIndex);
    lastSlide = buttonIndex;
    slides.forEach((slide, slideIndex) =>
      move(slide, (slideIndex - buttonIndex) * 100)
    );
  };
}

slides.forEach((slide) => {
  slide.addEventListener("mousedown", (event) => {
    dragStartX = event.clientX;
    isMoving = true;
    slide.addEventListener("mousemove", mouseMoveListener);
  });

  slide.addEventListener("mouseleave", getMouseMoveListenerRemover(slide));
  slide.addEventListener("mouseup", getMouseMoveListenerRemover(slide));
});

buttons.forEach((button, buttonIndex) =>
  button.addEventListener("click", getSlideButtonListener(buttonIndex))
);

getSlideButtonListener(1)();
