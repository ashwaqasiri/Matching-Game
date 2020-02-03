
const cardList = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb', 'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'];
var iconsOpen = [];
var count = 0;
var score = 3;
var firstCard=0;
var startTimer;
let hour = 0;
let min = 0;
let sec = 0;
let clock;
var timer = document.querySelector('.timer');
timer.innerHTML = "0 hours: 0 mins : 0 secs ";
var shuffleOne = shuffle(cardList);

//function to create card elements
generateCadrs();

//adding event listener on clicking restart button
$(".restart").click(function () {
    reLoad(this);
});

//adding event listener when card is clicked
$(".card").click(function () {
    firstCard++;
    if(firstCard==1){displayTimer();}
    displaySymbol(this);
});

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function generateCadrs() {
    var list = document.createElement("ul");
    shuffleOne.forEach(function (card) {
        const cards = document.querySelector('.card');
        cards.innerHTML = '<i class="fa ' + card + '"></i>'
        list.appendChild(cards);
    });
    document.getElementsByClassName("deck")[0].innerHTML = list.innerHTML;
}

function displaySymbol(card) {
    if ($(card).hasClass("open")) {
        return true;
    } else
        openedCard(card);
}

//Moves function
function increment() {
    const movesCounter = document.querySelector('.moves');
    count++;
    movesCounter.innerHTML = count;
    ratingStars();
}

//function to show and open the cards
function openedCard(card) {
    $(card).addClass("show open");
    console.log($(card));
    if (iconsOpen.length == 0) {
        iconsOpen.push(card);
    }
    else {
        increment();
        iconsOpen.push(card);
        if (isMatch(iconsOpen)) {
            for (var index in iconsOpen) {
                $(iconsOpen[index]).addClass("match");
            }
            iconsOpen = [];
        }
        else {
            unmatched(iconsOpen);
            var currentCards = iconsOpen;
            setTimeout(function () {
                hideCards(currentCards);
            }, 1000);
            iconsOpen = [];
        }
    }
    congratulation();
}

//Compares between two cards
function isMatch(iconsOpen) {
    let match = iconsOpen[0].innerHTML == iconsOpen[1].innerHTML;
    if (match) {
        return true;
    }
    return false;
}

function unmatched(iconsOpen) {
    for (var index in iconsOpen) {
        $(iconsOpen[index]).addClass("unmatch");
    }
}

function hideCards(iconsOpen) {
    for (var index in iconsOpen) {
        $(iconsOpen[index]).removeClass("open show unmatch");
    }
}

//function to display congratulation message when game is over
function congratulation() {
    let matchedCard = document.getElementsByClassName("match");
    if (matchedCard.length == 16) {
        clearInterval(startTimer);
        clock = document.querySelector('.timer').innerHTML;
        sweetAlert();
    }
}

//function sweetAlert from https://sweetalert2.github.io/ with adding some editing by me
function sweetAlert() {
    Swal.fire({
        type: 'success',
        title: 'Gongratulations! You Won!',
        text: 'with Moves  ' + count + ' and ' + score + '  Star(s) in '+ clock +'!',
        showConfirmButton: true,
        confirmButtonText: 'Play again!',
    }).then((result) => {
        if (result.value) {
            reLoad();
        }
    })
}

//function to reload the page
function reLoad() {
    window.location.reload();
}
//function to decrease star rating
function ratingStars() {
    let rating = $('i');
    if (count == 12) {
        rating.eq(0).addClass("fa fa-star-o");
        score = 2;
    } else if (count == 18) {
        rating.eq(1).addClass("fa fa-star-o");
        score = 1;
    }
}

//function Timer (general idea from https://stackoverflow.com/questions/25809644/sort-of-clock-using-setinterval)
function displayTimer() {
    startTimer = setInterval(function () {
        timer.innerHTML = hour + ":" + min + ": " + sec ;
        sec++;
        if (sec == 60) {
            sec = 0;
            min++;
        }
        if (min == 60) {
            min = 0;
            hour++;
        }
    }, 1000);
}