const toggle = document.querySelector(".toggle");
const toggleCross = document.querySelector(".toggle-cross");

const toggleClickListener = (e) => {
  toggle.style.display = "none";
  toggleCross.style.display = "block";
};
toggle.addEventListener("click", toggleClickListener);

const toggleCrossClickListener = (e) => {
  toggle.style.display = "block";
  toggleCross.style.display = "none";
};

toggleCross.addEventListener("click", toggleCrossClickListener);
