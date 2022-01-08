const toggle = document.querySelector(".toggle");
const toggleCross = document.querySelector(".toggle-cross");
const offCanvas = document.querySelector(".off-canvas");
const offCanvasCloseButton = document.querySelector(".off-canvas-close");

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

// select the elements
// create an increment function
// setinterval and pass the above function
// setTimeout after a certain periond to cancel the interval
// wrap all of the above inside a function

const counters = document.querySelectorAll(".progressbar-num");

let count = 0;

let max = 95;
// I want to increase the count by one until it reaches 95.
function incrementor() {
  count++;
}

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
    console.log(progresses);
    const progressPink = progresses[0].children[1].classList;
    const progressOrange = progresses[1].children[1].classList;
    progressPink.remove("progress-pink");
    progressOrange.remove("progress-orange");
    const addProgressClasses = () => {
      progressPink.add("progress-pink");
      progressOrange.add("progress-orange");
    };
    setTimeout(addProgressClasses, 1);
  }
};

if (window.addEventListener) {
  addEventListener("DOMContentLoaded", visibilityChangeHandler, false);
  addEventListener("load", visibilityChangeHandler, false);
  addEventListener("scroll", visibilityChangeHandler, false);
  addEventListener("resize", visibilityChangeHandler, false);
}
