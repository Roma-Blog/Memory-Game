const cardBox = document.querySelector('.card-box')
let countOpenCard = 0
let allowedOpenCard = true

const cardsArr = [
    'clover',
    'heart',
    'potted-cactus',
    'fox',
    'chess',
    'fighting',
    'octopus'
] 

let htmlCards = ''
function CardHtmlGeneration (arr){
    let sumArr = arr.concat(arr)
    sumArr.sort(() => Math.random() - 0.5)
    sumArr.forEach((elem)=>{
        console.log(elem)
        htmlCards += '<div class="card" data-img="' + elem + '"><div class="card__drawing card__drawing--' + elem + '" style="background-image: url(../img/' + elem + '.svg);"></div><div class="card__card-shirt"></div></div>'
    })
}

CardHtmlGeneration (cardsArr)
cardBox.innerHTML = htmlCards

document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', function(){
        if (allowedOpenCard && !card.classList.contains('card__inverted')  && !card.classList.contains('card__filter')){
            card.classList.add('card__inverted')
            countOpenCard++
            if (countOpenCard == 2){
                allowedOpenCard = false
                ChekCard()
            }
        }
    })
})

function ChekCard(){
    let openCards = document.querySelectorAll('.card__inverted')
    setTimeout(() => {
        if (openCards[0].dataset.img == openCards[1].dataset.img){
            DeactivateCard(openCards, true)
        }
        else{
            DeactivateCard(openCards, false)
        }
    }, 600)
}

function DeactivateCard(elements , filter){
    elements.forEach((element) =>{
        element.classList.remove('card__inverted')
        if (filter){
            element.classList.add('card__filter')
        }
    })
    allowedOpenCard = true
    countOpenCard = 0
}
