const buttons = document.querySelectorAll(".btn");
const slides = document.querySelectorAll(".item");
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
  slides.forEach((slide, slideIndex) => move(slide, (slideIndex - next) * 100));
}

function removeMouseMoveListener(e) {
  if (isMoving) {
    moveNextSlide();
    isMoving = false;
  }
  e.target.removeEventListener("mousemove", mouseMoveListener);
}

function getSlideButtonListener(buttonIndex) {
  return () => {
    lastSlide = buttonIndex;
    slides.forEach((slide, slideIndex) =>
      move(slide, (slideIndex - buttonIndex) * 100)
    );
  };
}

buttons.forEach((button, buttonIndex) =>
  button.addEventListener("click", getSlideButtonListener(buttonIndex))
);

const mouseMoveListener = (e) => {
  slides.forEach((slide, slideIndex) => {
    dragDelta =
      (e.clientX - dragStartX) / (slide.getBoundingClientRect().width / 100);
    if (Math.abs(dragDelta) > 10) {
      const width = (slideIndex - lastSlide) * 100 + dragDelta;
      slide.style.transform = `translateX(${width}%)`;
    }
  });
};

slides.forEach((slide) => {
  slide.addEventListener("mousedown", (event) => {
    dragStartX = event.clientX;
    isMoving = true;
    slide.addEventListener("mousemove", mouseMoveListener);
  });

  slide.addEventListener("mouseleave", removeMouseMoveListener);
  slide.addEventListener("mouseup", removeMouseMoveListener);
});
