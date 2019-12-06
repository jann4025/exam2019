'use strict'
document.addEventListener('DOMContentLoaded', start);
import IMask from 'imask';
function start() {
    const form = document.querySelector("form");
    console.log('Connection between the DOM and the Script was successfull! Nice 😎');
    let phoneMask = IMask(
        document.querySelector('#tel'), {
        mask: '+{45} 00 00 00 00'
    });
    form.setAttribute("novalidate", true);
}

// form.addEventListener("submit", e => {
//     e.preventDefault();
//     form.querySelectorAll("input").forEach(inp => {
//         if (!inp.checkValidity()) {
//             inp.classList.add("invalid");
//             inp.addEventListener("keypress", () => {
//                 if (!inp.checkValidity()) {
//                     inp.classList.add("invalid");
//                 } else {
//                     inp.classList.add("valid");
//                 }
//             });
//         }
//     });

// });
