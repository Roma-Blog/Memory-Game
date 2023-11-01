"use strict";

let cards = document.querySelectorAll('.card')


for (let card of cards){
    card.addEventListener('click', function(){
        card.classList.toggle('card__inverted')
    })
}
