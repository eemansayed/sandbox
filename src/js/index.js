const toggle = document.querySelector(".toggle");
const toggleCross = document.querySelector(".toggle-cross");
const offCanvas = document.querySelector(".off-canvas");
const offCanvasCloseButton = document.querySelector(".off-canvas-close");
const buttons = document.querySelectorAll(".buttons>button");
let lastClickedButton;

const items = document.querySelectorAll(".testimonial");
const inner = document.querySelector(".testimonials");
const itemsCount = items.length;

let currentItemIndex = 0;
let prevItemIndex = itemsCount - 1;
let nextItemIndex = 1;

let isMoving = false;

const next = () => {
  inner.querySelector(".prev").classList.remove("prev");
  inner.querySelector(".next").classList.remove("next");
  const lastActive = inner.querySelector(".active").classList;

  prevItemIndex = currentItemIndex;
  currentItemIndex = nextItemIndex;
  nextItemIndex = currentItemIndex + 1 >= itemsCount ? 0 : currentItemIndex + 1;

  items[prevItemIndex].classList.add("prev");
  items[currentItemIndex].classList.add("active");
  items[nextItemIndex].classList.toggle("next");
  setTimeout(() => {
    lastActive.remove("active");
    isMoving = false;
  }, 1000);
};
const prev = () => {
  inner.querySelector(".prev").classList.remove("prev");
  inner.querySelector(".next").classList.remove("next");
  const lastActive = inner.querySelector(".active").classList;

  nextItemIndex = currentItemIndex;
  currentItemIndex = prevItemIndex;
  prevItemIndex =
    currentItemIndex - 1 < 0 ? itemsCount - 1 : currentItemIndex - 1;

  items[prevItemIndex].classList.add("prev");
  items[currentItemIndex].classList.add("active");
  items[nextItemIndex].classList.toggle("next");
  setTimeout(() => {
    lastActive.remove("active");
    isMoving = false;
  }, 1000);
};

document.addEventListener("keydown", (e) => {
  if (!isMoving) {
    if (e.keyCode == "37") {
      isMoving = true;
      prev();
    } else if (e.keyCode == "39") {
      isMoving = true;
      next();
    }
  }
});

buttons.forEach(buttonLoopListener);

function clickListener(event) {
  if (lastClickedButton) {
    lastClickedButton.classList.remove("active");
  }
  event.target.classList.add("active");
  lastClickedButton = event.target;
}

function buttonLoopListener(button) {
  button.addEventListener("click", clickListener);
}

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
