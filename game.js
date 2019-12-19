"use strict";

document.addEventListener("DOMContentLoaded", start);

let newDeck;

let { dealer, player, playerSum, dealerSum } = setInitialValues();

let deck = document.querySelector("#deck");

let temp = document.querySelector("template");

let hitButton = document.querySelector(".btn.hit");

const btns = document.querySelector("#btns");

let nameFilled = false;

let cardSound = document.querySelector("#cardFlip");
let gameover = document.querySelector("#gameover");
let win = document.querySelector("#win");
let bgMusic = document.querySelector("#bg-music");

function start() {
  bgMusic.currentTime = 0;
  bgMusic.volume = 0.2;
  console.log(bgMusic.volume);
  bgMusic.play();
  console.log("Connection between the DOM and the Script was successfull! Nice 😎");
  creatNewDeck();
  if (localStorage.getItem("PlayedBefore") === null && localStorage.getItem("guideCompletede") === null) {
    localStorage.removeItem("firstname");
    onBoarding();
  } else if (localStorage.getItem("firstname") === null) {
    localStorage.removeItem("PlayedBefore");
    onBoarding();
  } else if (localStorage.getItem("bonusRecived", true)) {
    document.querySelector(".start").style.display = "block";
    document.querySelector("#onboarding").style.display = "block";
    document.querySelector(".rules").style.display = "none";
    document.querySelector(".start").innerHTML = ` <h1>
    Hej <span class="name"></span>! <br /> Godt at se dig igen
  </h1>
  <p>
    Vi kan se at du allerede har modtaget din bonus og du har derfor ikke mulighed for at spille igen! <br /> <br />
    Men du kan altid finde alle vores andre spil på forsiden
    <br />
  </p>
  <a href="index.html">
  <button class="btn spilNu">Gå tilbage til forsiden</button>
  </a>`;
    document.querySelector(".start .name").innerHTML = localStorage.getItem("firstname");
  } else if (localStorage.getItem("guideCompletede", true)) {
    document.querySelector(".start").style.display = "block";
    document.querySelector("#onboarding").style.display = "block";
    document.querySelector(".rules").style.display = "none";
    document.querySelector(".start").innerHTML = ` <h1>
    Hej <span class="name"></span>! <br /> Er du klar til at spille igen?
  </h1>
  <p>
    Godt at se at du er klar til at prøve igen! Vi har ikke så meget vi vil gennem gå med dig
    <br />
  </p>
  <p>Så hvad siger du? Skal vi ikke bare se at komme i gang?</p>
  <button class="btn spilNu">Spil nu</button>`;
    document.querySelector(".start .name").innerHTML = localStorage.getItem("firstname");
    document.querySelector(".spilNu").addEventListener("click", () => {
      document.querySelector("#onboarding").style.display = "none";
      firstDeal();
    });
  }
}

function reset() {
  bgMusic.currentTime = 0;
  bgMusic.play();
  newDeck = [];
  newDeck = generateDeck();
  setInitialValues();
  btns.style.display = "block";
  cleanTable();
  document.querySelector(".gameoverScreen").style.display = "none";
  document.querySelector(".tieScreen").style.display = "none";
  document.querySelector(".winScreen").style.display = "none";
  hitButton.addEventListener("click", dealNewCardPlayer);
  // document.querySelector('.flip').style.animation = 'none';
  document.querySelector(".btn.stand").addEventListener("click", dealNewCardDealer);
  player = [];
  dealer = [];
  firstDeal();
}

function cleanTable() {
  document.querySelector("#player-container").innerHTML = `
  <div id="player-value">0</div>
  `;
  document.querySelector("#dealer-container").innerHTML = `
  <div id="dealer-value">0</div>
`;
}

function setInitialValues() {
  let player = [];
  let playerSum = 0;
  let dealer = [];
  let dealerSum = 0;
  return { dealer, player, playerSum, dealerSum };
}

function onBoarding() {
  console.log(name);
  document.querySelector("#onboarding").style.display = "block";
  document.querySelector(".card-values-btn").addEventListener("click", cardValues);
  document.querySelectorAll(".skip").forEach(skip => skip.addEventListener("click", form));
}

function cardValues() {
  document.querySelector(".card-values-btn").removeEventListener("click", cardValues);
  document.querySelector(".rules").style.display = "none";
  document.querySelector(".card-values").style.display = "block";
  document.querySelector(".next-card").addEventListener("click", pictureCards);

  function pictureCards() {
    document.querySelector(".next-card").removeEventListener("click", pictureCards);
    document.querySelector(".inner.aces").style.display = "none";
    document.querySelector(".inner.picture-10s").style.display = "block";
    document.querySelector(".next-card").addEventListener("click", nomarlCards);
  }

  function nomarlCards() {
    document.querySelector(".next-card").removeEventListener("click", nomarlCards);
    document.querySelector(".inner.picture-10s").style.display = "none";
    document.querySelector(".inner.normalcards").style.display = "block";
    document.querySelector(".next-card").addEventListener("click", howToPlay);
  }
}

function howToPlay() {
  document.querySelector(".next-card").removeEventListener("click", howToPlay);
  document.querySelector(".card-values").style.display = "none";
  document.querySelector(".how-to-play").style.display = "block";
  document.querySelector(".next-rule").addEventListener("click", hit);
  document.querySelector(".skip").addEventListener("click", form);

  function hit() {
    document.querySelector(".next-rule").removeEventListener("click", hit);
    document.querySelector(".how-to-play .intro").style.display = "none";
    document.querySelector(".how-to-play .hit").style.display = "block";
    document.querySelector(".next-rule").addEventListener("click", stand);
    document.querySelector(".skip").addEventListener("click", form);
  }

  function stand() {
    document.querySelector(".next-rule").removeEventListener("click", stand);
    document.querySelector(".how-to-play .hit").style.display = "none";
    document.querySelector(".how-to-play .stand").style.display = "block";
    document.querySelector(".next-rule").addEventListener("click", bust);
    document.querySelector(".skip").addEventListener("click", form);
  }

  function bust() {
    document.querySelector(".next-rule").removeEventListener("click", bust);
    document.querySelector(".how-to-play .stand").style.display = "none";
    document.querySelector(".how-to-play .bust").style.display = "block";
    document.querySelector(".next-rule").addEventListener("click", win);
    document.querySelector(".skip").addEventListener("click", form);
  }

  function win() {
    document.querySelector(".next-rule").removeEventListener("click", win);
    document.querySelector(".how-to-play .bust").style.display = "none";
    document.querySelector(".how-to-play .win").style.display = "block";
    document.querySelector(".next-rule").addEventListener("click", form);
    document.querySelector(".skip").addEventListener("click", form);
  }
}

function form() {
  const form = document.querySelector("form#fornavn");
  localStorage.setItem("guideCompletede", true);
  document.querySelector(".next-rule").removeEventListener("click", form);
  document.querySelector(".how-to-play").style.display = "none";
  document.querySelector(".rules").style.display = "none";
  document.querySelector(".how-to-play").style.display = "none";
  document.querySelector(".card-values").style.display = "none";
  document.querySelector(".form").style.display = "block";
  form.addEventListener("submit", e => {
    onSubmit(form, e);
  });
}

function onSubmit(form, e) {
  const name = form.elements.name.value;
  e.preventDefault();
  localStorage.setItem("firstname", name);
  document.querySelector(".form").style.display = "none";
  document.querySelector(".start").style.display = "block";
  nameFilled = !nameFilled;
  localStorage.setItem("PlayedBefore", nameFilled);
  document.querySelector(".start .name").innerHTML = localStorage.getItem("firstname");
  document.querySelector(".spilNu").addEventListener("click", () => {
    document.querySelector("#onboarding").style.display = "none";
    firstDeal();
  });
}

function creatNewDeck() {
  newDeck = generateDeck();
  newDeck.forEach(card => {
    if (card.ID == "AD") {
      card.Image = "http://jannickholm.dk/files/AD.png";
    }
  });
}

function generateDeck() {
  let { suits, values, deck } = cardInfo();

  for (let i = 0; i < suits.length; i++) {
    for (let x = 0; x < values.length; x++) {
      if (values[x] == 10) {
        let card = {
          Value: values[x],
          Suit: suits[i],
          Image: `https://deckofcardsapi.com/static/img/0${suits[i].charAt(0).toUpperCase()}.png`,
          ID: values[x] + suits[i].charAt(0).toUpperCase()
        };
        deck.push(card);
      } else {
        let card = {
          Value: values[x],
          Suit: suits[i],
          Image: `https://deckofcardsapi.com/static/img/${values[x] + suits[i].charAt(0).toUpperCase()}.png`,
          ID: values[x] + suits[i].charAt(0).toUpperCase()
        };
        deck.push(card);
      }
    }
  }
  return deck;
}

function cardInfo() {
  let suits = ["spades", "diamonds", "clubs", "hearts"];
  let values = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
  let deck = new Array();
  return { suits, values, deck };
}

function firstDeal() {
  let id;
  firstDealPlayer();
  console.log(player);
  console.log(dealer);
  player.forEach(x => flipPlayer(x.ID));
  dealer.forEach(x => flipDealer(x.ID));
  checkValue();

  function firstDealPlayer() {
    for (let x = 0; x < 2; x++) {
      let rN = Math.floor(Math.random() * newDeck.length);
      id = newDeck[rN].Suit.charAt(0).toUpperCase() + newDeck[rN].Value;
      let card = {
        Value: newDeck[rN].Value,
        Suit: newDeck[rN].Suit,
        Image: newDeck[rN].Image,
        ID: id
      };
      let klon = temp.cloneNode(!0).content;
      klon.querySelector(".back_image").src = newDeck[rN].Image;
      klon.querySelector(".card").classList.add(id);
      deck.appendChild(klon);
      newDeck.splice(rN, 1);
      player.push(card);
    }
    firstDealDealer();
  }

  function firstDealDealer() {
    for (let x = 0; x < 2; x++) {
      let rN = Math.floor(Math.random() * newDeck.length);
      id = newDeck[rN].Suit.charAt(0).toUpperCase() + newDeck[rN].Value;
      let card = {
        Value: newDeck[rN].Value,
        Suit: newDeck[rN].Suit,
        Image: newDeck[rN].Image,
        ID: id
      };
      let klon = temp.cloneNode(!0).content;
      klon.querySelector(".back_image").src = newDeck[rN].Image;
      klon.querySelector(".card").classList.add(id);
      deck.appendChild(klon);
      newDeck.splice(rN, 1);
      dealer.push(card);
    }
  }
}

function checkWinner() {
  if (playerSum == 21 && player[0].Value == 11) {
    winScreen();
  } else if (playerSum == 21 && player[1].Value == 11) {
    winScreen();
  } else if (playerSum > 21) {
    gameoverScreen();
  } else if (dealerSum > 21) {
    winScreen();
  } else if (dealerSum <= 21 && dealerSum > playerSum) {
    gameoverScreen();
  } else if (playerSum <= 21 && playerSum > dealerSum) {
    winScreen();
  } else if (playerSum == dealerSum) {
    tieScreen();
  }
}

function flipPlayer(id) {
  btns.style.display = "none";
  const dist = document.querySelector("#player-container");
  let split = dist.childNodes;
  let el = document.querySelector(`.${id}`);
  const first = el.getBoundingClientRect();
  dist.appendChild(el);
  const last = el.getBoundingClientRect();
  const { invertX, invertY } = getInvert(first, last);

  el.style.transform = `translate(${invertX}px, ${invertY}px)`;
  cardSound.currentTime = 0;
  cardSound.playbackRate = 1;
  cardSound.play();
  let animation = split[3].animate([{ transform: `translate(${invertX}px, ${invertY}px)` }, { transform: "translate(0,0)" }], {
    duration: 800,
    easing: "cubic-bezier(0,0,0.32,1)",
    fill: "forwards"
  });
  animation.addEventListener("finish", () => {
    //When the animation ends add a css keyframe that flips the card
    split[3].classList.add("flip");
    split[3].addEventListener("transitionend", () => {
      //When the flip animation ends, start animation on the second card in the player-cards container
      cardSound.currentTime = 0;
      cardSound.playbackRate = 1;
      cardSound.play();
      let animation2 = dist.childNodes[4].animate([{ transform: `translate(${invertX}px, ${invertY}px)` }, { transform: "translate(0,0)" }], {
        duration: 800,
        easing: "cubic-bezier(0,0,0.32,1)",
        fill: "forwards"
      });

      animation2.addEventListener("finish", () => {
        //When the animation ends add a css keyframe that flips the card
        split[4].classList.add("flip");

        split[4].addEventListener("transitionend", () => {
          btns.style.display = "block";

          showplayerSum();
          if ((playerSum == 21 && player[0].Value == 10 && player[1].Value == 11) || (player[1].Value == 10 && player[0].Value == 11)) {
            winScreen();
          } else if (playerSum == 22) {
            gameoverScreen();
          }
        });
      });
    });
  });
}

function getInvert(first, last) {
  const invertY = first.top - last.top;
  const invertX = first.left - last.left;
  return { invertX, invertY };
}

function flipDealer(id) {
  const dist = document.querySelector("#dealer-container");
  let el = document.querySelector(`.${id}`);
  const first = el.getBoundingClientRect();
  dist.appendChild(el);
  const last = el.getBoundingClientRect();
  const invertY = first.top - last.top;
  const invertX = first.left - last.left;
  el.style.transform = `translate(${invertX}px, ${invertY}px)`;
  let animation = dist.childNodes[3].animate([{ transform: `translate(${invertX}px, ${invertY}px)` }, { transform: "translate(0,0)" }], {
    duration: 800,
    easing: "cubic-bezier(0,0,0.32,1)",
    fill: "forwards"
  });
  animation.addEventListener("finish", () => {
    dist.childNodes[3].classList.add("flip");
    dist.childNodes[3].addEventListener("transitionend", () => {
      showdealerSum();
      let animation2 = dist.childNodes[4].animate([{ transform: `translate(${invertX}px, ${invertY}px)` }, { transform: "translate(0,0)" }], {
        duration: 800,
        easing: "cubic-bezier(0,0,0.32,1)",
        fill: "forwards"
      });

      animation2.addEventListener("finish", () => {});
    });
  });
}

function dealNewCardPlayer() {
  cardSound.currentTime = 0;
  cardSound.playbackRate = 1;
  cardSound.play();
  btns.style.display = "none";
  let rN = Math.floor(Math.random() * newDeck.length);
  const id = newDeck[rN].Suit.charAt(0).toUpperCase() + newDeck[rN].Value;
  let card = {
    Value: newDeck[rN].Value,
    Suit: newDeck[rN].Suit,
    Image: newDeck[rN].Image,
    ID: id
  };
  player.push(card);
  let klon = temp.cloneNode(!0).content;
  klon.querySelector(".back_image").src = newDeck[rN].Image;
  klon.querySelector(".card").classList.add(id);
  deck.appendChild(klon);
  checkValue();
  newDeck.splice(rN, 1);
  animateCard(id);

  function animateCard(id) {
    let el = document.querySelector(`.${id}`);
    let dist = document.querySelector(`#player-container`);
    const first = el.getBoundingClientRect();
    dist.appendChild(el);
    const last = el.getBoundingClientRect();
    const invertY = first.top - last.top;
    const invertX = first.left - last.left;
    console.log(first);
    el.style.transform = `translate(${invertX}px, ${invertY}px)`;
    let animation = el.animate([{ transform: `translate(${invertX}px, ${invertY}px)` }, { transform: "translate(0,0)" }], {
      duration: 800,
      easing: "cubic-bezier(0,0,0.32,1)",
      fill: "forwards"
    });
    animation.addEventListener("finish", () => {
      el.classList.add("flip");
      btns.style.display = "block";
      el.addEventListener("animationend", () => {
        showplayerSum();
        if (playerSum > 21) {
          showplayerSum();
          setTimeout(() => {
            gameoverScreen();
            clearTimeout();
          }, 200);
        }
      });
    });
  }
}

function dealNewCardDealer() {
  cardSound.currentTime = 0;
  cardSound.playbackRate = 1;
  cardSound.play();

  if (dealerSum < 17) {
    let rN = Math.floor(Math.random() * newDeck.length);
    const id = newDeck[rN].Suit.charAt(0).toUpperCase() + newDeck[rN].Value;
    let card = {
      Value: newDeck[rN].Value,
      Suit: newDeck[rN].Suit,
      Image: newDeck[rN].Image,
      ID: id
    };
    dealer.push(card);
    let klon = temp.cloneNode(!0).content;
    klon.querySelector(".back_image").src = newDeck[rN].Image;
    klon.querySelector(".card").classList.add(id);
    deck.appendChild(klon);
    newDeck.splice(rN, 1);
    checkValue();
    animateCard(id);
  }
  function animateCard(id) {
    let el = document.querySelector(`.${id}`);
    let dist = document.querySelector(`#dealer-container`);
    const first = el.getBoundingClientRect();
    dist.appendChild(el);
    const last = el.getBoundingClientRect();
    const invertY = first.top - last.top;
    const invertX = first.left - last.left;
    el.style.transform = `translate(${invertX}px, ${invertY}px)`;
    let animation = el.animate([{ transform: `translate(${invertX}px, ${invertY}px)` }, { transform: "translate(0,0)" }], {
      duration: 800,
      easing: "cubic-bezier(0,0,0.32,1)",
      fill: "forwards"
    });
    animation.addEventListener("finish", e => {
      el.classList.add("flip");
      el.addEventListener("animationend", e => {
        setTimeout(() => {
          showdealerSumFull();
          clearTimeout();
        }, 200);

        if (dealerSum < 17) {
          dealNewCardDealer();
        } else {
          setTimeout(() => {
            showdealerSumFull();
            clearTimeout();
          }, 200);
          setTimeout(() => {
            checkWinner();
            clearTimeout();
          }, 300);
        }
      });
    });
  }
}

function checkValue() {
  dealerSum = 0;
  playerSum = 0;
  for (let i = 0; i < dealer.length; i++) {
    if (dealer[i].Value == "J" || dealer[i].Value == "K" || dealer[i].Value == "Q") {
      dealer[i].Value = 10;
    } else if (dealer[i].Value == "A") {
      dealer[i].Value = 11;
    }
    dealerSum = dealerSum + dealer[i].Value;
  }
  //player
  for (let i = 0; i < player.length; i++) {
    if (player[i].Value == "J" || player[i].Value == "K" || player[i].Value == "Q") {
      player[i].Value = 10;
    } else if (player[i].Value == "A") {
      player[i].Value = 11;
    }
    playerSum = playerSum + player[i].Value;
  }
  hitButton.addEventListener("click", dealNewCardPlayer);
  document.querySelector(".btn.stand").addEventListener("click", stand);
}

function stand() {
  btns.style.display = "none";
  let el = document.querySelector("#dealer-container").lastElementChild;
  el.classList.add("flip");
  el.addEventListener("animationend", checkdealerSum);
}

function checkdealerSum() {
  if (dealerSum < 17) {
    console.log("foo");
    dealNewCardDealer();
    setTimeout(() => {
      showdealerSumFull();
      clearTimeout();
    }, 200);
  } else {
    setTimeout(() => {
      showdealerSumFull();
      clearTimeout();
    }, 200);

    setTimeout(() => {
      checkWinner();
      clearTimeout();
    }, 400);
  }
}

function showplayerSum() {
  document.querySelector("#player-value").innerHTML = playerSum;
}

function showdealerSum() {
  document.querySelector("#dealer-value").innerHTML = dealer[0].Value;
}

function showdealerSumFull() {
  document.querySelector("#dealer-value").innerHTML = dealerSum;
}

function winScreen() {
  bgMusic.currentTime = 0;
  bgMusic.pause();
  win.currentTime = 0;
  win.playbackRate = 1;
  win.play();
  document.querySelector(".winScreen").style.display = "block";
  document.querySelector(".winScreen").classList.add("fade-in");
  document.querySelector(".winScreen .name").innerHTML = localStorage.getItem("firstname");
  document.querySelector(".fade-in").addEventListener("animationend", () => {
    document.querySelector("#confettiAnimation").play();
    document.querySelector(".get-bonus").addEventListener("click", signUpForm);
  });
}

function tieScreen() {
  bgMusic.currentTime = 0;
  bgMusic.pause();
  gameover.currentTime = 0;
  gameover.playbackRate = 1;
  gameover.play();
  document.querySelector(".tieScreen").style.display = "block";
  document.querySelector(".tieScreen").classList.add("fade-in");
  document.querySelector(".tieScreen .name").innerHTML = localStorage.getItem("firstname");
  document.querySelector(".tie_try-again").addEventListener("click", reset);
}

function gameoverScreen() {
  bgMusic.currentTime = 0;
  bgMusic.pause();
  gameover.currentTime = 0;
  gameover.playbackRate = 1;
  gameover.play();
  document.querySelector(".gameoverScreen").style.display = "block";
  document.querySelector(".gameoverScreen").classList.add("fade-in");
  document.querySelector(".gameover_try-again").addEventListener("click", reset);
  document.querySelector(".gameoverScreen .name").innerHTML = localStorage.getItem("firstname");
  if (playerSum > 21) {
    document.querySelector(".gameover_try-again").addEventListener("click", reset);
    document.querySelector(
      ".gameoverScreen p"
    ).innerHTML = `Du fik ${playerSum} point. Da du fik over 21 point vinder dealeren desværre denne runde! Men bare rolig du kan altid prøve så mange gange du vil indtil du vinder!`;
  } else if (dealerSum > playerSum) {
    document.querySelector(".gameover_try-again").addEventListener("click", reset);
    document.querySelector(".gameover_try-again").addEventListener("click", reset);
    document.querySelector(".gameoverScreen p").innerHTML = `Da dealeren fik ${dealerSum -
      playerSum} point mere end dig, vinder dealeren desværre denne runde! Men bare rolig du kan altid prøve så mange gange du vil indtil du vinder!`;
  }
}

function signUpForm() {
  bgMusic.currentTime = 0;
  bgMusic.play();
  document.querySelector("#signUpForm").removeAttribute("hidden");
  document.querySelector("input#name").value = localStorage.getItem("firstname");
  document.querySelector(".winScreen .inner").style.display = "none";
  document.querySelector("#signUpForm .inner").style.display = "block";
  document.querySelector("#signUpForm .confirm-email").style.display = "none";
}
