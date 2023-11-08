const cardBox = document.querySelector('.card-box')
const countCardTotal = document.querySelector('.header__count-card--total')
const countCardLeft = document.querySelector('.header__count-card--left')
const timer = document.querySelector('.header__time')
const numberActionsEl = document.querySelector('.header__time span')
const popUpWin = document.querySelector('.pop-up-win')
const popUpWinTime = document.querySelector('.pop-up-win__time span')
const popUpWinAction = document.querySelector('.pop-up-win__action span')
const popUpWinPoint = document.querySelector('.pop-up-win__point span')

let allowedOpenCard = true
let play = true

let numberPairs = 0
let pairsFound = 0
let timeMS = 0
let numberActions = 0
let countOpenCard = 0

const cardsArr = [
    'clover',
    'heart',
    'potted-cactus',
    //'fox',
    //'chess',
    //'fighting',
    //'octopus'
]

numberPairs = cardsArr.length
countCardTotal.textContent = numberPairs
let htmlCards = ''
function CardHtmlGeneration(arr) {
    let sumArr = arr.concat(arr)
    sumArr.sort(() => Math.random() - 0.5)
    sumArr.forEach((elem) => {
        htmlCards += '<div class="card" data-img="' + elem + '"><div class="card__drawing card__drawing--' + elem + '" style="background-image: url(./img/' + elem + '.svg);"></div><div class="card__card-shirt"></div></div>'
    })
}

CardHtmlGeneration(cardsArr)
cardBox.innerHTML = htmlCards

document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', function () {
        if (allowedOpenCard && !card.classList.contains('card__inverted') && !card.classList.contains('card__filter')) {
            card.classList.add('card__inverted')
            countOpenCard++
            if (countOpenCard == 2) {
                allowedOpenCard = false
                ChekCard()
            }
        }
    })
})

function ChekCard() {
    let openCards = document.querySelectorAll('.card__inverted')
    setTimeout(() => {
        if (openCards[0].dataset.img == openCards[1].dataset.img) {
            DeactivateCard(openCards, true)
            IncreasingPairsCounter()
        }
        else {
            DeactivateCard(openCards, false)
        }

        CountNumberActions()

        if (numberPairs == pairsFound) {
            Win()
        }
    }, 600)
}

function DeactivateCard(elements, filter) {
    elements.forEach((element) => {
        element.classList.remove('card__inverted')
        if (filter) {
            element.classList.add('card__filter')
        }
    })
    allowedOpenCard = true
    countOpenCard = 0
}

function IncreasingPairsCounter() {
    pairsFound++
    countCardLeft.textContent = pairsFound
}

function CountNumberActions() {
    numberActions++
    numberActionsEl.textContent = numberActions
}

function Win() {
    let point = (numberPairs/numberActions) * (timeMS/100)
    popUpWin.classList.add('pop-up-win__open')
    popUpWinTime.textContent = DataTime(timeMS)
    popUpWinAction.textContent = numberActions
    popUpWinPoint.textContent = point
}

function TimerStart() {
    setInterval(() => {
        timeMS += 1000
        timer.textContent = DataTime(timeMS)
    }, 1000)
}

function DataTime(timems) {
    let time = new Date(timems)
    let parts = [
        time.getUTCMinutes(),
        time.getUTCSeconds()
    ]
    return parts.map(s => String(s).padStart(2, '0')).join(':');
}

TimerStart()