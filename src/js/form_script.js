'use strict';
document.addEventListener('DOMContentLoaded', start);
import IMask from 'imask';
const form = document.querySelector('#signUpForm');
function start() {
  console.log(
    'Connection between the DOM and the Script was successfull! Nice 😎'
  );
  let phoneMask = IMask(document.querySelector('#tel'), {
    mask: '+{45} 00 00 00 00'
  });
  form.setAttribute('novalidate', true);
  paswordValidate();
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const passwordsMatch = document.querySelector('.passwords-match');
  repeatPassword.value == password.value
    ? passwordsMatch.classList.add('valid') &&
      passwordsMatch.setAttribute('valid') &&
      passwordsMatch.removeAttribute('invalid') &&
      passwordsMatch.classList.remove('invalid')
    : passwordsMatch.classList.add('invalid') &&
      passwordsMatch.setAttribute('invalid') &&
      passwordsMatch.removeAttribute('valid') &&
      passwordsMatch.classList.remove('valid');

  form.querySelectorAll('input').forEach(inp => {
    if (!inp.checkValidity()) {
      inp.classList.add('invalid');
      inp.addEventListener('keypress', () => {
        if (!inp.checkValidity()) {
          inp.classList.add('invalid');
        } else {
          inp.classList.add('valid');
        }
      });
    }
    form.checkValidity() ? submitForm() : '';
  });
});

function submitForm() {
  const innerForm = document.querySelector('form .inner');
  innerForm.style.display = 'none';
  document.querySelector('.confirm-email').style.display = 'block';
  localStorage.setItem('bonusRecived', true);
  postToDB();
}

function postToDB() {
  console.log('nej');
  const firstName = document.querySelector('#firstname').value;
  const lastName = document.querySelector('#lastname').value;
  const email = document.querySelector('#email').value;
  const data = {
    name: firstName,
    lastname: lastName,
    user: 'Standard',
    email: email
  };
  const postData = JSON.stringify(data);
  fetch('https://frontend19-ccb8.restdb.io/rest/user-exam', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'x-apikey': '5d88747dfd86cb75861e25ff',
      'cache-control': 'no-cache'
    },
    body: postData
  });
}
function paswordValidate() {
  //selectors
  const uppercase = document.querySelector('#Uppercase');
  const lowercase = document.querySelector('#Lowercase');
  const numberSpec = document.querySelector('#Number-spec');
  const lenght = document.querySelector('#lenght');
  const password = document.querySelector('#password');
  const repeatPassword = document.querySelector('#repeatPassword');
  const passwordsMatch = document.querySelector('.passwords-match');

  //Formats
  let specialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  const lowerCaseLetters = /[a-z]/g;
  const upperCaseLetters = /[A-Z]/g;
  const numbers = /[0-9]/g;
  password.addEventListener('keyup', e => {
    CheckPasswordValue(
      password,
      lowerCaseLetters,
      lowercase,
      upperCaseLetters,
      uppercase,
      specialChar,
      numbers,
      numberSpec,
      lenght
    );
  });
  repeatPassword.addEventListener('keyup', e => {
    repeatPassword.value === password.value
      ? passwordsMatch.classList.add('active')
      : passwordsMatch.classList.remove('active');
  });
}
function CheckPasswordValue(
  password,
  lowerCaseLetters,
  lowercase,
  upperCaseLetters,
  uppercase,
  specialChar,
  numbers,
  numberSpec,
  lenght
) {
  password.value.match(lowerCaseLetters)
    ? lowercase.classList.add('active')
    : lowercase.classList.remove('active');
  password.value.match(upperCaseLetters)
    ? uppercase.classList.add('active')
    : uppercase.classList.remove('active');
  password.value.match(specialChar) || password.value.match(numbers)
    ? numberSpec.classList.add('active')
    : numberSpec.classList.remove('active');
  password.value.length >= 8
    ? lenght.classList.add('active')
    : lenght.classList.remove('active');
}
