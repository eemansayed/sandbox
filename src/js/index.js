const toggle = document.querySelector(".toggle");
const toggleCross = document.querySelector(".toggle-cross");
const offCanvas = document.querySelector(".off-canvas");

const toggleClickListener = (e) => {
  toggle.style.display = "none";
  toggleCross.style.display = "block";
  offCanvas.style.transform = "translateX(0)";
};
toggle.addEventListener("click", toggleClickListener);

const toggleCrossClickListener = (e) => {
  toggle.style.display = "block";
  toggleCross.style.display = "none";
  offCanvas.style.transform = "translateX(-100%)";
};

toggleCross.addEventListener("click", toggleCrossClickListener);
