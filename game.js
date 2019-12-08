'use strict'
document.addEventListener('DOMContentLoaded', start);
let newDeck;

let deck = document.querySelector("#deck");

let player = [];

let playerValue = 0;

let dealer = [];

let dealerValue = 0;

let temp = document.querySelector("template");

let hitButton = document.querySelector(".btn.hit");

const btns = document.querySelector("#btns");
function start() {
    console.log('Connection between the DOM and the Script was successfull! Nice 😎');
    creatNewDeck();
    addEventListener();
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
    let suits = ["spades", "diamonds", "clubs", "hearts"];
    let values = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
    let deck = new Array();

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
    console.log(player)
    console.log(dealer)
    checkValue();
    player.forEach(x => flipPlayer(x.ID));
    dealer.forEach(x => flipDealer(x.ID));
}

function flipPlayer(id) {
    btns.style.display = "none";
    // Select cards and dist container
    const dist = document.querySelector("#player-container");
    let split = dist.childNodes;
    let el = document.querySelector(`.${id}`);

    //FLIP start

    //Select First posistion
    const first = el.getBoundingClientRect();

    //Append to the distination container
    dist.appendChild(el);

    //Where is the cards know? 
    const last = el.getBoundingClientRect();

    //Find the diference in px between the first and last position
    const invertY = first.top - last.top;
    const invertX = first.left - last.left;

    //Move the cards back to the first position with transform
    el.style.transform = `translate(${invertX}px, ${invertY}px)`;

    //Start animation on the first card in the player-cards container
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
        document.querySelector(".flip").addEventListener('transitionend', () => {

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
                    showPlayerValues();
                });
            });
        });
    });
}

function flipDealer(id) {
    const dist = document.querySelector("#dealer-container");
    let el = document.querySelector(`.${id}`);
    const first = el.getBoundingClientRect();
    dist.appendChild(el);
    const last = el.getBoundingClientRect();
    const invertY = first.top - last.top;
    const invertX = first.left - last.left;
    console.log(first);
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
        document.querySelector(".flip").addEventListener('transitionend', () => {
            showDealerValue();
            let animation2 = dist.childNodes[4].animate([
                { transform: `translate(${invertX}px, ${invertY}px)` },
                { transform: 'translate(0,0)' }
            ], {
                duration: 800,
                easing: 'cubic-bezier(0,0,0.32,1)',
                fill: "forwards"
            });

            animation2.addEventListener('finish', () => {
                // setTimeout(showDealerValue, 400);
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
    newDeck.splice(rN, 1);
    checkValue();
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
            showPlayerValues();
        });
    }
}

function dealNewCardDealer() {
    if (dealerValue < 17) {
        let rN = Math.floor(Math.random() * newDeck.length);
        const id = newDeck[rN].Suit.charAt(0).toUpperCase() + newDeck[rN].Value;
        let card = { Value: newDeck[rN].Value, Suit: newDeck[rN].Suit, Image: newDeck[rN].Image, ID: id };
        dealer.push(card);
        let klon = temp.cloneNode(!0).content;
        klon.querySelector(".back_image").src = newDeck[rN].Image;
        klon.querySelector(".card").classList.add(id);
        deck.appendChild(klon);
        newDeck.splice(rN, 1);
        animateCard(id);
        checkValue();
        function animateCard(id) {
            let el = document.querySelector(`.${id}`);
            let dist = document.querySelector(`#dealer-container`);
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
            });
        }
    }
}

function checkValue() {
    dealerValue = 0;
    playerValue = 0;
    //dealer
    for (let x = 0; x < dealer.length; x++) {

        if (dealer[x].Value == "J" || dealer[x].Value == "K" || dealer[x].Value == "Q") {
            dealer[x].Value = 10;
        } else if (dealer[x].Value == "A") {
            dealer[x].Value = 11;
        }
        dealerValue = dealerValue + dealer[x].Value;
    }
    //player
    for (let x = 0; x < player.length; x++) {
        if (player[x].Value == "J" || player[x].Value == "K" || player[x].Value == "Q") {
            player[x].Value = 10;
        } else if (player[x].Value == "A") {
            player[x].Value = 11;
        }
        playerValue = playerValue + player[x].Value;
    }

    hitButton.addEventListener("click", dealNewCardPlayer);
    document.querySelector(".stand").addEventListener("click", stand);
    console.log(dealerValue);
}

function stand() {
    btns.style.display = "none";
    document.querySelector("#dealer-container").childNodes[4].classList.add('flip');
    document.querySelector("#dealer-container").childNodes[4].addEventListener("transitionend", () => {
        checkValue();
        if (dealerValue < 17) {
            dealNewCardDealer();
        } else {
            showDealerValuesFull();
        }
    });
}

function showPlayerValues() {
    document.querySelector("#player-value").innerHTML = playerValue;
}

function showDealerValue() {
    document.querySelector("#dealer-value").innerHTML = dealer[0].Value;
}

function showDealerValuesFull() {
    document.querySelector("#dealer-value").innerHTML = dealerValue;
}