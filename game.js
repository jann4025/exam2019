'use strict';

document.addEventListener('DOMContentLoaded', start);

let newDeck;

let { dealer, player, playerSum, dealerSum } = setInitialValues();

let deck = document.querySelector("#deck");

let temp = document.querySelector("template");

let hitButton = document.querySelector(".btn.hit");

const btns = document.querySelector("#btns");





function newFunction() {
    let newDeck;
    return newDeck;
}

function start() {
    console.log('Connection between the DOM and the Script was successfull! Nice 😎');
    creatNewDeck();
    addEventListener();


}

function reset() {
    let newDeck;
    let { dealer, player, playerSum, dealerSum } = setInitialValues();
    btns.style.display = "block";
}

function setInitialValues() {
    let player = [];
    let playerSum = 0;
    let dealer = [];
    let dealerSum = 0;
    return { dealer, player, playerSum, dealerSum };
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
                let card = { Value: values[x], Suit: suits[i], Image: `https://deckofcardsapi.com/static/img/0${suits[i].charAt(0).toUpperCase()}.png`, ID: values[x] + suits[i].charAt(0).toUpperCase() };
                deck.push(card);
            } else {
                let card = { Value: values[x], Suit: suits[i], Image: `https://deckofcardsapi.com/static/img/${values[x] + suits[i].charAt(0).toUpperCase()}.png`, ID: values[x] + suits[i].charAt(0).toUpperCase() };
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

function addEventListener() {
    hitButton.addEventListener("click", firstDeal);
}


function firstDeal() {
    let id;
    document.querySelector(".btn.hit").removeEventListener("click", firstDeal);
    //dealer
    for (let x = 0; x < 2; x++) {
        let rN = Math.floor(Math.random() * newDeck.length);
        id = newDeck[rN].Suit.charAt(0).toUpperCase() + newDeck[rN].Value;
        let card = { Value: newDeck[rN].Value, Suit: newDeck[rN].Suit, Image: newDeck[rN].Image, ID: id };
        let klon = temp.cloneNode(!0).content;
        klon.querySelector(".back_image").src = newDeck[rN].Image;
        klon.querySelector(".card").classList.add(id);
        deck.appendChild(klon);
        newDeck.splice(rN, 1);
        dealer.push(card);
    }



    //player
    for (let x = 0; x < 2; x++) {
        let rN = Math.floor(Math.random() * newDeck.length);
        id = newDeck[rN].Suit.charAt(0).toUpperCase() + newDeck[rN].Value;
        let card = { Value: newDeck[rN].Value, Suit: newDeck[rN].Suit, Image: newDeck[rN].Image, ID: id };
        let klon = temp.cloneNode(!0).content;
        klon.querySelector(".back_image").src = newDeck[rN].Image;
        klon.querySelector(".card").classList.add(id);
        deck.appendChild(klon);
        newDeck.splice(rN, 1);
        player.push(card);
    }
    console.log(player);
    console.log(dealer);
    player.forEach(x => flipPlayer(x.ID));
    dealer.forEach(x => flipDealer(x.ID));
    checkValue();
}

function checkWinner() {
    if (playerSum == 21 && player[0].Value == 11) {
        winScreen();

    } else if (playerSum == 21 && player[1].Value == 11) {
        winScreen();

    } else if (playerSum > 21) {
        alert("Dealer Wins");
        reset();
    } else if (dealerSum > 21) {
        winScreen();

    } else if (dealerSum <= 21 && dealerSum > playerSum) {
        alert("Dealer Wins");
        reset();
    } else if (playerSum <= 21 && playerSum > dealerSum) {
        winScreen();

    } else if (playerSum == dealerSum) {
        alert("Tie");
        reset();
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
    let animation = split[3].animate([
        { transform: `translate(${invertX}px, ${invertY}px)` },
        { transform: 'translate(0,0)' }
    ], {
        duration: 800,
        easing: 'cubic-bezier(0,0,0.32,1)',
        fill: "forwards"
    });
    animation.addEventListener('finish', () => {
        //When the animation ends add a css keyframe that flips the card
        split[3].classList.add("flip");
        split[3].addEventListener('transitionend', () => {

            //When the flip animation ends, start animation on the second card in the player-cards container
            let animation2 = dist.childNodes[4].animate([
                { transform: `translate(${invertX}px, ${invertY}px)` },
                { transform: 'translate(0,0)' }
            ], {
                duration: 800,
                easing: 'cubic-bezier(0,0,0.32,1)',
                fill: "forwards"
            });

            animation2.addEventListener('finish', () => {
                //When the animation ends add a css keyframe that flips the card
                split[4].classList.add("flip");

                split[4].addEventListener('transitionend', () => {
                    btns.style.display = "block";
                    showplayerSum();
                    if (playerSum == 21 && player[0].Value == 10 && player[1].Value == 11 || player[1].Value == 10 && player[0].Value == 11) {
                        winScreen();
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
    let animation = dist.childNodes[3].animate([
        { transform: `translate(${invertX}px, ${invertY}px)` },
        { transform: 'translate(0,0)' }
    ], {
        duration: 800,
        easing: 'cubic-bezier(0,0,0.32,1)',
        fill: "forwards"
    });
    animation.addEventListener('finish', () => {
        dist.childNodes[3].classList.add("flip");
        dist.childNodes[3].addEventListener('transitionend', () => {
            showdealerSum();
            let animation2 = dist.childNodes[4].animate([
                { transform: `translate(${invertX}px, ${invertY}px)` },
                { transform: 'translate(0,0)' }
            ], {
                duration: 800,
                easing: 'cubic-bezier(0,0,0.32,1)',
                fill: "forwards"
            });

            animation2.addEventListener('finish', () => {
            });
        });
    });
}

function dealNewCardPlayer() {
    btns.style.display = "none";
    let rN = Math.floor(Math.random() * newDeck.length);
    const id = newDeck[rN].Suit.charAt(0).toUpperCase() + newDeck[rN].Value;
    let card = { Value: newDeck[rN].Value, Suit: newDeck[rN].Suit, Image: newDeck[rN].Image, ID: id };
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
        let animation = el.animate([
            { transform: `translate(${invertX}px, ${invertY}px)` },
            { transform: 'translate(0,0)' }
        ], {
            duration: 800,
            easing: 'cubic-bezier(0,0,0.32,1)',
            fill: "forwards"
        });
        animation.addEventListener('finish', () => {
            el.classList.add("flip");
            btns.style.display = "block";
            el.addEventListener("animationend", () => {
                showplayerSum();
                if (playerSum > 21) {
                    showplayerSum();
                    setTimeout(() => {
                        alert("Dealer wins");
                    }, 200);

                }
            });
        });
    }
}

function dealNewCardDealer() {
    if (dealerSum < 17) {
        let rN = Math.floor(Math.random() * newDeck.length);
        const id = newDeck[rN].Suit.charAt(0).toUpperCase() + newDeck[rN].Value;
        let card = { Value: newDeck[rN].Value, Suit: newDeck[rN].Suit, Image: newDeck[rN].Image, ID: id };
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
        let animation = el.animate([
            { transform: `translate(${invertX}px, ${invertY}px)` },
            { transform: 'translate(0,0)' }
        ], {
            duration: 800,
            easing: 'cubic-bezier(0,0,0.32,1)',
            fill: "forwards"
        });
        animation.addEventListener('finish', e => {
            el.classList.add("flip");
            el.addEventListener('animationend', e => {
                showdealerSumFull();
                if (dealerSum < 17) {
                    dealNewCardDealer();
                } else {
                    showdealerSumFull();
                    setTimeout(checkWinner, 200);
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
    document.querySelector(".stand").addEventListener("click", stand);
}

function stand() {
    btns.style.display = "none";
    let el = document.querySelector("#dealer-container").lastElementChild;
    el.classList.add('flip');
    el.addEventListener("animationend", checkdealerSum);
}

function checkdealerSum() {
    if (dealerSum < 17) {
        console.log("foo");
        showdealerSumFull();
        dealNewCardDealer();
    } else {
        showdealerSumFull();
        setTimeout(checkWinner, 200);
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
    document.querySelector(".gameEnd").classList.add("fade-in");
    document.querySelector(".fade-in").addEventListener("animationend", () => {
        document.querySelector("#confettiAnimation").play();
    });


}

