"use strict";
const regeneratorRuntime = require("regenerator-runtime/runtime");

document.addEventListener("DOMContentLoaded", start);

function start() {
  fetchContent();
}

async function fetchContent() {
  console.log("fetch begin");

  let jsonHero = await fetch("http://natsir.dk/kea/wordpress_exam/wp-json/wp/v2/hero");
  let fetchHero = await jsonHero.json();

  let jsonWelcome = await fetch("http://natsir.dk/kea/wordpress_exam/wp-json/wp/v2/welcome");
  let fetchWelcome = await jsonWelcome.json();

  let jsonIntro = await fetch("http://natsir.dk/kea/wordpress_exam/wp-json/wp/v2/introduction");
  let fetchIntro = await jsonIntro.json();

  let jsonImg = await fetch("http://natsir.dk/kea/wordpress_exam/wp-json/wp/v2/images");
  let fetchImg = await jsonImg.json();

  let jsonRules = await fetch("http://natsir.dk/kea/wordpress_exam/wp-json/wp/v2/rules");
  let fetchRules = await jsonRules.json();

  let jsonJoin = await fetch("http://natsir.dk/kea/wordpress_exam/wp-json/wp/v2/join");
  let fetchJoin = await jsonJoin.json();

  let jsonDetails = await fetch("http://natsir.dk/kea/wordpress_exam/wp-json/wp/v2/details");
  let fetchDetails = await jsonDetails.json();

  let jsonValues = await fetch("http://natsir.dk/kea/wordpress_exam/wp-json/wp/v2/values");
  let fetchValues = await jsonValues.json();

  let jsonReviews = await fetch("http://natsir.dk/kea/wordpress_exam/wp-json/wp/v2/reviews");
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
    document.querySelector(".hero_headline").innerHTML = obj.headline;
    document.querySelector(".hero_p").innerHTML = obj.sub_headline;
    document.querySelector(".hero_h2").innerHTML = obj.premium;
    document.querySelector(".hero_button").innerHTML = obj.button_txt;
  });
}

function welcome(fetchWelcome) {
  console.log(fetchWelcome);
  fetchWelcome.forEach(obj => {
    document.querySelector(".welcome_headline").innerHTML = obj.headline_welcome;
    document.querySelector(".welcome_h2").innerHTML = obj.subheadline_welcome;
    document.querySelector(".welcome_p").innerHTML = obj.txt_welcome;
  });
}

function introduction(fetchIntro) {
  console.log(fetchIntro);
  fetchIntro.forEach(obj => {
    document.querySelector(".intro_headline").innerHTML = obj.headline_intro;
    document.querySelector(".intro_p").innerHTML = obj.txt_intro;
  });
}

function images(fetchImg) {
  console.log(fetchImg);
  fetchImg.forEach(obj => {
    const image1 = obj.img1.guid;
    const image2 = obj.img2.guid;
    const image3 = obj.img3.guid;
    document.querySelector(".skew1").style.background = `url(${image1})`;
    document.querySelector(".skew2").style.background = `url(${image2})`;
    document.querySelector(".skew3").style.background = `url(${image3})`;
  });
}

function rules(fetchRules) {
  console.log(fetchRules);
  fetchRules.forEach(obj => {
    document.querySelector(".rules_headline").innerHTML = obj.headline_rules;
    document.querySelector(".txt_rules_1").innerHTML = obj.txt_rules_1;
    document.querySelector(".txt_rules_2").innerHTML = obj.txt_rules_2;
  });
}

function join(fetchJoin) {
  console.log(fetchJoin);
  fetchJoin.forEach(obj => {
    document.querySelector(".join_subheadline").innerHTML = obj.headline_join;
    document.querySelector(".join_cta").innerHTML = obj.subheadline_join;
    document.querySelector(".join_button").innerHTML = obj.button_join;
  });
}

function details(fetchDetails) {
  console.log(fetchDetails);

  let destRules = document.querySelector(".rules-accordion");
  let tempRules = document.querySelector(".rules_template");

  fetchDetails.forEach(obj => {
    let klon = tempRules.cloneNode(!0).content;
    klon.querySelector("summary").innerHTML = obj.headline;
    klon.querySelector(".details_txt").innerHTML = obj.details_txt;
    destRules.prepend(klon);
  });
}

function values(fetchValues) {
  console.log(fetchValues);

  let destRules = document.querySelector(".rules-accordion");
  let tempRules = document.querySelector(".rules_template");

  fetchDetails.forEach(obj => {
    let klon = tempRules.cloneNode(!0).content;
    klon.querySelector("summary").innerHTML = obj.values_headline;
    klon.querySelector(".details_txt").innerHTML = obj.values_txt;
    klon.querySelector(".details_img").src = obj.values_img.guid;
    destRules.prepend(klon);
  });
}

function reviews(fetchReviews) {
  console.log(fetchReviews);

  let destReviews = document.querySelector(".review-container");
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
