"use strict";
const regeneratorRuntime = require("regenerator-runtime/runtime");

document.addEventListener("DOMContentLoaded", start);
let textShown = false;
let detailsAll;

function start() {
  fetchContent();

  document.addEventListener("scroll", navColor);
  document.querySelector(".rules_read_more").addEventListener("click", showMore);
}

function navColor() {
  const scrollY = window.pageYOffset;
  const nav = document.querySelector("nav");

  scrollY >= 800 ? nav.classList.add("nav_colored") : "";
  scrollY <= 800 ? nav.classList.remove("nav_colored") : "";
}

function showMore() {
  textShown = !textShown;
  document.querySelector(".txt_rules").classList.toggle("hide_txt");
  textShown === true ? (document.querySelector(".rules_read_more").textContent = "Læs mindre") : (document.querySelector(".rules_read_more").textContent = "Læs mere");
}

function removeOpen() {
  if (this.open) {
    return;
  }

  for (const detail of detailsAll) {
    if (detail.open) {
      detail.removeAttribute("open");
    }
  }
}

async function fetchContent() {
  let jsonHero = await fetch("https://jannickholm.dk/kea/3-semester/bestblackjack.dk/wp/wp-json/wp/v2/hero");
  let fetchHero = await jsonHero.json();

  let jsonWelcome = await fetch("https://jannickholm.dk/kea/3-semester/bestblackjack.dk/wp/wp-json/wp/v2/welcome");
  let fetchWelcome = await jsonWelcome.json();

  let jsonIntro = await fetch("https://jannickholm.dk/kea/3-semester/bestblackjack.dk/wp/wp-json/wp/v2/introduction");
  let fetchIntro = await jsonIntro.json();

  let jsonImg = await fetch("https://jannickholm.dk/kea/3-semester/bestblackjack.dk/wp/wp-json/wp/v2/images");
  let fetchImg = await jsonImg.json();

  let jsonRules = await fetch("https://jannickholm.dk/kea/3-semester/bestblackjack.dk/wp/wp-json/wp/v2/rules");
  let fetchRules = await jsonRules.json();

  let jsonJoin = await fetch("https://jannickholm.dk/kea/3-semester/bestblackjack.dk/wp/wp-json/wp/v2/join");
  let fetchJoin = await jsonJoin.json();

  let jsonDetails = await fetch("https://jannickholm.dk/kea/3-semester/bestblackjack.dk/wp/wp-json/wp/v2/details");
  let fetchDetails = await jsonDetails.json();

  let jsonValues = await fetch("https://jannickholm.dk/kea/3-semester/bestblackjack.dk/wp/wp-json/wp/v2/values");
  let fetchValues = await jsonValues.json();

  let jsonReviews = await fetch("https://jannickholm.dk/kea/3-semester/bestblackjack.dk/wp/wp-json/wp/v2/reviews");
  let fetchReviews = await jsonReviews.json();

  hero(fetchHero);
  welcome(fetchWelcome);
  introduction(fetchIntro);
  images(fetchImg);
  rules(fetchRules);
  join(fetchJoin);
  details(fetchDetails);
  values(fetchValues);
  reviews(fetchReviews);
}

function hero(fetchHero) {
  fetchHero.forEach(obj => {
    const hero_img = obj.hero_bg_img.guid;

    document.querySelector(".hero_headline").innerHTML = obj.headline;
    document.querySelector(".hero_p").innerHTML = obj.sub_headline;
    document.querySelector(".hero_h2").innerHTML = obj.premium;
    document.querySelector(".hero_button").innerHTML = obj.button_txt;
    document.querySelector(".intro_btn").innerHTML = obj.button_txt;
    document.querySelector("#hero").style.backgroundImage = `url(${hero_img})`;
  });
}

function welcome(fetchWelcome) {
  fetchWelcome.forEach(obj => {
    document.querySelector(".welcome_headline").innerHTML = obj.headline_welcome;
    document.querySelector(".welcome_h2").innerHTML = obj.subheadline_welcome;
    document.querySelector(".welcome_p").innerHTML = obj.txt_welcome;
  });
}

function reviews(fetchReviews) {
  let destReviews = document.querySelector("#reviews");
  let tempReviews = document.querySelector(".reviews_template");

  fetchReviews.forEach(obj => {
    let klon = tempReviews.cloneNode(!0).content;
    klon.querySelector(".reviews_headline").innerHTML = obj.headline_review;
    klon.querySelector(".reviews_txt").innerHTML = obj.txt_review;
    klon.querySelector(".reviews_img").src = obj.img_reviews.guid;
    klon.querySelector(".reviews_name").innerHTML = obj.name_review;
    klon.querySelector(".reviews_title").innerHTML = obj.titel_review;
    destReviews.prepend(klon);
  });
}

function introduction(fetchIntro) {
  fetchIntro.forEach(obj => {
    document.querySelector(".intro_headline").innerHTML = obj.headline_intro;
    document.querySelector(".intro_p").innerHTML = obj.txt_intro;
  });
}

function images(fetchImg) {
  fetchImg.forEach(obj => {
    const image1 = obj.img1.guid;
    const image2 = obj.img2.guid;
    const image3 = obj.img3.guid;
    document.querySelector(".skew1").style.backgroundImage = `url(${image1})`;
    document.querySelector(".skew2").style.backgroundImage = `url(${image2})`;
    document.querySelector(".skew3").style.backgroundImage = `url(${image3})`;

    document.querySelector(".img_subheadline1").innerHTML = obj.img_subheadline1;
    document.querySelector(".img_subheadline2").innerHTML = obj.img_subheadline2;
    document.querySelector(".img_subheadline3").innerHTML = obj.img_subheadline3;

    document.querySelector(".img_button1").innerHTML = obj.img_button_txt;
    document.querySelector(".img_button2").innerHTML = obj.img_button_txt;
    document.querySelector(".img_button3").innerHTML = obj.img_button_txt;
  });
}

function rules(fetchRules) {
  fetchRules.forEach(obj => {
    document.querySelector(".rules_headline").innerHTML = obj.headline_rules;
    document.querySelector(".txt_rules").innerHTML = obj.txt_rules;
  });
}

function join(fetchJoin) {
  fetchJoin.forEach(obj => {
    const bg_img = obj.bg_img.guid;

    document.querySelector("#join").style.backgroundImage = `url(${bg_img})`;
    document.querySelector(".join_subheadline").innerHTML = obj.headline_join;
    document.querySelector(".join_cta").innerHTML = obj.subheadline_join;
    document.querySelector(".join_button").innerHTML = obj.button_join;
  });
}

function details(fetchDetails) {
  let destRules1 = document.querySelector(".rules_dest_1");
  let destRules2 = document.querySelector(".rules_dest_2");
  let tempRules = document.querySelector(".rules_template");

  fetchDetails.forEach(obj => {
    let klon = tempRules.cloneNode(!0).content;
    klon.querySelector("summary").innerHTML = obj.headline;
    klon.querySelector(".details_txt").innerHTML = obj.details_txt;

    destRules2.childNodes.length < 5 ? destRules2.prepend(klon) : destRules1.prepend(klon);
  });
}

function values(fetchValues) {
  let destRules = document.querySelector(".rules_dest_2");
  let tempRules = document.querySelector(".values_template");

  fetchValues.forEach(obj => {
    let klon = tempRules.cloneNode(!0).content;
    klon.querySelector("summary").innerHTML = obj.values_headline;
    klon.querySelector(".details_subheadline1").innerHTML = obj.values_subheadline1;
    klon.querySelector(".details_img1").src = obj.values_img1.guid;
    klon.querySelector(".details_txt1").innerHTML = obj.values_txt1;

    klon.querySelector(".details_subheadline2").innerHTML = obj.values_subheadline2;
    klon.querySelector(".details_img2").src = obj.values_img2.guid;
    klon.querySelector(".details_txt2").innerHTML = obj.values_txt2;

    klon.querySelector(".details_subheadline3").innerHTML = obj.values_subheadline3;
    klon.querySelector(".details_txt3").innerHTML = obj.values_txt3;
    klon.querySelector(".details_img3").src = obj.values_img3.guid;
    destRules.prepend(klon);
  });
  detailsAll = document.querySelectorAll("details");
  detailsAll.forEach(detail => detail.addEventListener("click", removeOpen));
}
