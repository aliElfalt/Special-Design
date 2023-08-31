// Show And Hide Links List
let toggleMenu = document.querySelector(".toggle-menu");
let linksList = document.querySelector(".links");

toggleMenu.addEventListener("click", () => {
  if (toggleMenu.classList.contains("clicked") === false) {
    toggleMenu.classList.add("clicked");
    linksList.classList.add("open");
  } else {
    toggleMenu.classList.remove("clicked");
    linksList.classList.remove("open");
  }
});

// Change Background Image
let landingPage = document.querySelector(".landing-page");
let changeBackground;

let changeBackgroundImage = () => {
  changeBackground = setInterval(() => {
    let num = Math.ceil(Math.random() * 10);
    landingPage.style.setProperty("background-image", `url(imgs/${num < 10 ? `0${num}` : num}.jpg)`);
  }, 10000);
}

changeBackgroundImage();

// Settings Box 
let settingsBox = document.querySelector(".settings-box");
let settingsIconDiv = document.querySelector(".toggle-settings");
let settingsIcon = document.querySelector(".toggle-settings i");

settingsIconDiv.onclick = () => {
  if (settingsIcon.classList.contains("fa-spin")) {
    settingsIcon.classList.remove("fa-spin");
    settingsBox.classList.remove("open");
    settingsIconDiv.style.boxShadow = "-2px -2px 10px #ccc"
  } else {
    settingsIcon.classList.add("fa-spin");
    settingsBox.classList.add("open");
    settingsIconDiv.style.boxShadow = "none";
  }
}

// Color List
let colorList = document.querySelectorAll(".colors-list li");
let color;

colorList.forEach((li) => {
  li.onclick = () => {
    colorList.forEach((li) => {
      li.classList.remove("active");
    });
    li.classList.add("active");
    color = li.getAttribute("data-color");
    document.querySelector(":root").style.setProperty("--main-color", color);
    localStorage.setItem("color", color);
  }
});

// Random Background Option
let backgroundOption = document.querySelectorAll(".random-backgrounds span");
let backgroundChosen;

backgroundOption.forEach((span) => {
  span.onclick = () => {
    backgroundOption.forEach((span) => {
      span.classList.remove("active");
    });
    span.classList.add("active");
    backgroundChosen = span.getAttribute("data-option");
    if (backgroundChosen === "no") {
      clearInterval(changeBackground);
    } else if (backgroundChosen === "yes") {
      changeBackgroundImage();
    }
    localStorage.setItem("change-background", backgroundChosen);
  }
});

// Bullets Option
let BulletsOption = document.querySelectorAll(".show-bullets span");
let BulletsChosen;
let navBullets = document.querySelector(".nav-bullets");

BulletsOption.forEach((span) => {
  span.onclick = () => {
    BulletsOption.forEach((span) => {
      span.classList.remove("active");
    });
    span.classList.add("active");
    BulletsChosen = span.getAttribute("data-option");
    if (BulletsChosen === "no") {
      navBullets.style.setProperty("display", "none");
    } else if (BulletsChosen === "yes") {
      navBullets.style.setProperty("display", "flex");
    }
    localStorage.setItem("show-bullets", BulletsChosen);
  }
});

// Reset Settings In Local Storage
let resetButton = document.querySelector(".settings-box .content button");

resetButton.onclick = () => {
  localStorage.clear();
  location.reload();
}

// Check Local Storage
if (localStorage.getItem("color")) {
  color = localStorage.getItem("color");
  document.querySelector(":root").style.setProperty("--main-color", color);
}
if (localStorage.getItem("change-background")) {
  backgroundChosen = localStorage.getItem("change-background");
  if (backgroundChosen === "no") {
    clearInterval(changeBackground);
  } else if (backgroundChosen === "yes") {
    changeBackgroundImage();
  }
}
if (localStorage.getItem("show-bullets")) {
  BulletsChosen = localStorage.getItem("show-bullets");
  if (BulletsChosen === "no") {
    navBullets.style.setProperty("display", "none");
  } else if (BulletsChosen === "yes") {
    navBullets.style.setProperty("display", "flex");
  }
}

// Scroll To Sections
let links = document.querySelectorAll(".links li");
let bullets = document.querySelectorAll(".bullet");

links.forEach((li) => {
  li.onclick = () => {
    let section = document.querySelector(li.getAttribute("data-section"));
    section.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
});
bullets.forEach((bullet) => {
  bullet.onclick = () => {
    let section = document.querySelector(bullet.getAttribute("data-section"));
    section.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
});

// Change Width On Scroll 
let about = document.querySelector(".about-us");
let spans = document.querySelectorAll(".skill div span");

window.onscroll = () => {
  if (window.scrollY >= about.offsetTop) {
    spans.forEach(span => {
      let width = span.getAttribute("data-width");
      span.style.width = width;
    });
  }
}

// Image Popup
let images = document.querySelectorAll(".images img");

images.forEach(image => {
  image.onclick = () => {
    let popupOverlay = document.createElement("div");
    let popupDiv = document.createElement("div");
    let h2 = document.createElement("h2");
    let img = document.createElement("img");
    let span = document.createElement("span");
    popupOverlay.classList.add("popup-overlay");
    popupDiv.classList.add("popup-div");
    popupDiv.append(h2, img, span);
    h2.append(image.alt);
    img.src = image.src;
    span.append("X");
    document.body.append(popupOverlay, popupDiv);
    span.onclick = () => {
      popupDiv.remove();
      popupOverlay.remove();
    }
  }
});