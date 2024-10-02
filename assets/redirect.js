let isPPressed = localStorage.getItem("isPPressed") === "true";

function checkUserAgent() {
  const userAgent = navigator.userAgent;

  if (!userAgent.includes("CrOS")) {
    if (!isPPressed) {
      document.title = "Redirecting...";
      showExcerptAndRedirect();
    } else {
      showGameContainer();
    }
  } else {
    showGameContainer();
  }
}

function showGameContainer() {
  const header = document.querySelector(".header");
  const gameContainer = document.querySelector(".game-container");

  if (header) header.classList.remove("hidden");
  if (gameContainer) gameContainer.classList.remove("hidden");
}

function showExcerptAndRedirect() {
  const header = document.querySelector(".header");
  const gameContainer = document.querySelector(".game-container");

  if (header) header.classList.add("hidden");
  if (gameContainer) gameContainer.classList.add("hidden");

  const excerpt =
    "It’s true! Yes, I have been ill—very ill. But why will you say that I am mad? The disease had sharpened my senses—not destroyed—not dulled them. Above all was the sense of hearing acute. I heard all things in the heaven and in the earth. I heard many things in hell. How, then, am I mad? Hearken! and observe how healthily—how calmly I tell you the whole story.\n\n" +
    "It is impossible to say how first the idea entered my brain; but once conceived, it haunted me. You should have seen me. I would have laughed at what you would call the disease. I could not sleep. I had not lost my mind; I had but to use my own; I had to make it part of me...";

  const excerptContainer = document.createElement("div");
  excerptContainer.className = "excerpt-container";
  excerptContainer.innerText = excerpt;

  document.body.appendChild(excerptContainer);

  setTimeout(() => {
    if (!isPPressed) {
      window.location.href = "https://google.com";
    } else {
      showGameContainer();
    }
  }, 1000);
}

window.onload = checkUserAgent;

document.addEventListener("keydown", function (event) {
  if (event.key === "P" || event.key === "p") {
    event.preventDefault();
    isPPressed = true;
    localStorage.setItem("isPPressed", "true");
    alert("You pressed the P key, but no redirect will happen.");

    const excerptContainer = document.querySelector(".excerpt-container");
    if (excerptContainer) {
      excerptContainer.remove();
    }

    document.title = "Nebula";
    showGameContainer();
  }
});
