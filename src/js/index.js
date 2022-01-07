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

const visibilityChangeHandler = () => {
  const element = document.querySelector(".semi-circles");
  const progress = document.querySelectorAll(
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
    progress.forEach((el) => {
      el.querySelectorAll("path")[1].classList.remove("progress");
      setTimeout(
        () => el.querySelectorAll("path")[1].classList.add("progress"),
        1
      );
    });
  }
};

if (window.addEventListener) {
  addEventListener("DOMContentLoaded", visibilityChangeHandler, false);
  addEventListener("load", visibilityChangeHandler, false);
  addEventListener("scroll", visibilityChangeHandler, false);
  addEventListener("resize", visibilityChangeHandler, false);
}
