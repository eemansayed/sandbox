function createSlide(slideContainerName, slidesToShow, overlay = false) {
  function addStyle() {
    const styles = `
                    ${slideContainerName} .prev:disabled, ${slideContainerName} .next:disabled {color:gray;cursor:none;}
                    ${slideContainerName} .prev,${slideContainerName} .close-button,${slideContainerName} .next {
                      position:absolute;
                      top:50%;
                      background-color:transparent;
                      border:none;
                      padding:5px;
                      border-radius:50%;
                      color:#fff;
                      font-size:3rem;
                      cursor:pointer;
                    }
                    ${slideContainerName} .close-button {top:20px;right:20px;}
                    ${slideContainerName} .prev {left:20px;}
                    ${slideContainerName} .next {right:20px;}
                    ${slideContainerName} .inner {
                      position: relative;
                      overflow: hidden;
                    }

                    ${slideContainerName} .item {
                      position: absolute;
                      top: 0;
                      right: 0;
                      left: 0;
                      bottom: 0;
                      user-select: none;
                      cursor: pointer;
                      overflow:hidden;
                      object-fit:cover;
                    }

                    ${slideContainerName} .item img {
                      pointer-events: none;
                    }

                    ${slideContainerName} .outer{
                        width:100%;
                        height:100%;
                        display:grid;
                        grid-template-columns:1fr;
                        grid-template-rows:1fr;
                    }

                    ${slideContainerName} .btn-wrapper {
                      min-height:36px;
                      display:flex;
                      align-items: center;
                      justify-content:center;
                      gap: 10px;
                    }

                    ${slideContainerName} .btn {
                      background-color: transparent;
                      border: 3px solid #d4d7dd;
                      cursor: pointer;
                      border-radius: 50%;
                      padding:3px;
                      outline:none;
                    }

                    ${slideContainerName} .btn:hover,.btn.active{
                      padding:5px;
                    }
  `;

    const styleTag = document.createElement("style");
    styleTag.appendChild(document.createTextNode(styles));
    document.head.append(styleTag);
  }
  addStyle();

  const outerWrapper = document.querySelector(slideContainerName);
  const outer = document.querySelector(`${slideContainerName}>.outer`);
  const slides = outer.querySelectorAll(".item");

  function getButtons() {
    const buttonWrapper = document.createElement("div");
    buttonWrapper.classList.add("btn-wrapper");
    for (let i = 0, len = slides.length - slidesToShow; i <= len; i++) {
      const btn = document.createElement("button");
      btn.classList.add("btn");
      buttonWrapper.append(btn);
    }
    outer.append(buttonWrapper);
    return outer.querySelectorAll(".btn");
  }

  let lastSlide = 0;
  let dragDelta = 0;
  let isMoving;
  let dragStartX;
  let buttons;
  let prevButton;
  let nextButton;

  if (overlay) {
    addOverlayCloseButton();
    addOverlayNavigationButtons();
  } else {
    addRoundFooterButtons();
  }

  slides.forEach(addSlideEventListeners);

  moveNextSlide();

  setTimeout(addSlideTransition, 1000);

  function addSlideTransition() {
    slides.forEach((slide) => (slide.style.transition = "transform 1s linear"));
  }

  function addSlideEventListeners(slide) {
    slide.style.width = `${100 / slidesToShow}%`;
    slide.addEventListener("mousedown", (event) => {
      dragStartX = event.clientX;
      isMoving = true;
      slide.addEventListener("mousemove", mouseMoveListener);
    });

    slide.addEventListener("mouseleave", getMouseListenerRemover(slide));
    slide.addEventListener("mouseup", getMouseListenerRemover(slide));
  }
  function addRoundFooterButtons() {
    buttons = getButtons();
    buttons.forEach((button, buttonIndex) =>
      button.addEventListener("click", getSlideButtonListener(buttonIndex))
    );
  }

  function addOverlayNavigationButtons() {
    prevButton = document.createElement("button");
    prevButton.innerText = "<";
    prevButton.classList.add("prev");
    prevButton.addEventListener("click", () => {
      dragDelta = 20;
      moveNextSlide();
      nextButton.disabled = false;
    });
    outerWrapper.append(prevButton);

    nextButton = document.createElement("button");
    nextButton.innerText = ">";
    nextButton.classList.add("next");
    nextButton.addEventListener("click", () => {
      dragDelta = -20;
      moveNextSlide();
      prevButton.disabled = false;
    });
    outerWrapper.append(nextButton);
  }

  function addOverlayCloseButton() {
    outerWrapper.addEventListener("click", (e) => {
      if (e.target === outerWrapper) outerWrapper.style.display = "none";
    });

    const closeButton = document.createElement("button");
    closeButton.innerText = "x";
    closeButton.classList.add("close-button");
    closeButton.addEventListener("click", () => {
      outerWrapper.style.display = "none";
    });
    outerWrapper.append(closeButton);
  }

  function move(slide, translatePercentage) {
    slide.style.transform = `translateX(${translatePercentage}%)`;
  }

  function getNextSlide() {
    if (dragDelta > 10) {
      return lastSlide - 1 < 0 ? 0 : lastSlide - 1;
    } else if (dragDelta < -10) {
      return lastSlide + 1 >= slides.length - slidesToShow
        ? slides.length - slidesToShow
        : lastSlide + 1;
    } else return lastSlide;
  }

  function moveNextSlide() {
    const next = getNextSlide();
    dragDelta = 0;
    if (overlay) {
      lastSlide = next;
      prevButton.disabled = false;
      nextButton.disabled = false;
      if (lastSlide === 0) {
        prevButton.disabled = true;
      }
      if (lastSlide === slides.length - slidesToShow) {
        nextButton.disabled = true;
      }
    } else {
      buttons[lastSlide].classList.remove("active");
      lastSlide = next;
      buttons[lastSlide].classList.add("active");
    }
    slides.forEach((slide, slideIndex) =>
      move(slide, (slideIndex - next) * 100)
    );
  }

  function getMouseListenerRemover(slide) {
    return function removeMouseMoveListener() {
      if (isMoving) {
        moveNextSlide();
        isMoving = false;
      }
      slide.removeEventListener("mousemove", mouseMoveListener);
    };
  }

  function getSlideButtonListener(buttonIndex) {
    return () => {
      buttons[lastSlide].classList.remove("active");
      lastSlide = buttonIndex;
      buttons[lastSlide].classList.add("active");

      slides.forEach((slide, slideIndex) =>
        move(slide, (slideIndex - buttonIndex) * 100)
      );
    };
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
}
