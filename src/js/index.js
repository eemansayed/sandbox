const toggle = document.querySelector(".toggle");
const toggleCross = document.querySelector(".toggle-cross");
const offCanvas = document.querySelector(".off-canvas");
const offCanvasCloseButton = document.querySelector(".off-canvas-close");

document.querySelectorAll(".overlay-toggler").forEach((overlayToggler) => {
  overlayToggler.addEventListener(
    "click",
    () => (document.querySelector(".overlay-wrapper").style.display = "flex")
  );
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

createSlide(".testimonials-wrapper", 1);

let slidesToShow =
  window.innerWidth < 1000 ? 1 : window.innerWidth < 1500 ? 2 : 3;

createSlide(".images-wrapper", slidesToShow);

window.addEventListener("resize", () => {
  if (window.innerWidth < 1000 && slidesToShow !== 1) {
    slidesToShow = 1;
    createSlide(".images-wrapper", 1);
  } else if (
    window.innerWidth >= 1000 &&
    window.innerWidth < 1500 &&
    slidesToShow !== 2
  ) {
    slidesToShow = 2;
    createSlide(".images-wrapper", 2);
  } else if (window.innerWidth >= 1500 && slidesToShow !== 3) {
    slidesToShow = 3;
    createSlide(".images-wrapper", slidesToShow);
  }
});

createSlide(".overlay-wrapper", 1, true);
