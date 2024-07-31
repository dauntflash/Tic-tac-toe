const boxes= document.querySelectorAll('.box')
const menu = document.querySelector('.menu');
const main= document.querySelector('.main');
const mode= document.getElementById('mode');
const button0= document.getElementById('button0');
const buttonX= document.getElementById('buttonX');
const popup= document.querySelector('.popup');
const display= document.getElementById('display');
const scoreBoard= document.querySelector('.scoreBoard');
const playerOne_name= document.getElementById('player-one-name');
const playerTwo_name= document.getElementById('player-two-name');
let playerOne_score= document.getElementById('player-one-score');
let playerTwo_score= document.getElementById('player-two-score');
let first_player='X'

let playerOne='Player One'
let playerTwo='Player Two'

button0.addEventListener('click', () => {
    buttonX.classList.remove('selected');
    button0.classList.add('selected');
    first_player= '0'
})
buttonX.addEventListener('click', () => {
    button0.classList.remove('selected');
    buttonX.classList.add('selected');
    first_player= 'X'
})

function display_message(message){
    popup.classList.add('shown');
    display.innerHTML = message
    main.style.pointerEvents = 'none';
}

function start() {
    menu.style.visibility = 'hidden';
    main.style.pointerEvents = 'auto';
    scoreBoard.style.visibility = 'visible';
    boxes.forEach(box => {
        box.setAttribute('data-hover', first_player)
        box.innerHTML = ''
        box.onclick = null
    })
    if (mode.value === 'computer') {
        playerOne='Player'
        playerTwo='Computer'
        user_turn()
    }
    else if (mode.value === 'humans') {
        two_players()
    }
    playerOne_name.innerHTML = playerOne
    playerTwo_name.innerHTML = playerTwo
}

let X_array=[]
let O_array=[]

const winning_combinations=[
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
]

function computer_turn(){
    let available_boxes = Array.from(boxes).filter(box => box.innerHTML === '')
    if (available_boxes.length === 0){
        return
    } else {
        const random_box = Math.floor(Math.random() * available_boxes.length)
        if (first_player === 'X'){
            available_boxes[random_box].innerHTML = '0'
            changer('X')
            O_array.push(parseInt(available_boxes[random_box].getAttribute('win-position')))
        } else {
            available_boxes[random_box].innerHTML = 'X'
            changer('0')
            X_array.push(parseInt(available_boxes[random_box].getAttribute('win-position')))
        }

        setTimeout(() => {
            if (!game_state()) {
                user_turn();
            }
        }, 150);
    }
}

function game_state(){
    let game_win = false;
    let scoreOne = parseInt(playerOne_score.innerHTML);
    let scoreTwo = parseInt(playerTwo_score.innerHTML);

    for(const [a, b, c] of winning_combinations){
        if(X_array.includes(a) && X_array.includes(b) && X_array.includes(c)){
            if (first_player === 'X') {
                display_message(playerOne + ' wins');
                scoreOne += 1;
            } else {
                display_message(playerTwo + ' wins');
                scoreTwo += 1;
            }
            game_win = true;
            update_score(scoreOne, scoreTwo);
            reset();
            return true;
        } else if(O_array.includes(a) && O_array.includes(b) && O_array.includes(c)){
            if (first_player === '0') {
                display_message(playerOne + ' wins');
                scoreOne += 1;
            } else {
                display_message(playerTwo + ' wins');
                scoreTwo += 1;
            }
            game_win = true;
            update_score(scoreOne, scoreTwo);
            reset();
            return true;
        }
    }

    if(X_array.length + O_array.length === 9 && !game_win){
        display_message('Draw');
        reset();
        return true;
    }

    return false;
}

function update_score(scoreOne, scoreTwo) {
    playerOne_score.innerHTML = scoreOne;
    playerTwo_score.innerHTML = scoreTwo;
}

function user_turn(){
    boxes.forEach(box =>{
        box.onclick = ()=> {
            if (box.innerHTML == ''){
                const state = box.getAttribute('data-hover');
                if (state === '0'){
                    box.innerHTML = '0';
                    changer('X');
                    O_array.push(parseInt(box.getAttribute('win-position')));
                } else {
                    box.innerHTML = 'X';
                    changer('0');
                    X_array.push(parseInt(box.getAttribute('win-position')));
                }
                if(!game_state()){
                    setTimeout(computer_turn, 100);
                }
            }
        }
    });
}

function two_players(){
    boxes.forEach(box =>{
        box.onclick = ()=> {
            if (box.innerHTML == ''){
                const state = box.getAttribute('data-hover');
                if (state === '0'){
                    box.innerHTML = '0';
                    changer('X');
                    O_array.push(parseInt(box.getAttribute('win-position')));
                } else {
                    box.innerHTML = 'X';
                    changer('0');
                    X_array.push(parseInt(box.getAttribute('win-position')));
                }
                if (!game_state()) {
                    return;
                }
            }
            let game_win = game_state();
            if(game_win){
                return;
            }
            if(X_array.length + O_array.length === 9 && !game_win){
                display_message('Draw');
                reset();
            }
        }
    });
}

function changer(input){
    boxes.forEach(box =>{
        box.setAttribute('data-hover', input)
    })
}

function reset(){
    boxes.forEach(box =>{
        box.innerHTML = ''
        box.setAttribute('data-hover', first_player)
    })
    X_array = []
    O_array = []
}

function restart(){
    popup.classList.remove('shown');
    main.style.pointerEvents = 'auto';
    reset()
}

function quit(){
    popup.classList.remove('shown');
    menu.style.visibility = 'visible';
    main.style.pointerEvents = 'none';
    first_player = 'X'
    reset()
    scoreBoard.style.visibility = 'hidden';
    playerOne = "Player One"
    playerTwo = "Player Two"
    playerOne_score.innerHTML = 0;
    playerTwo_score.innerHTML = 0;
}
