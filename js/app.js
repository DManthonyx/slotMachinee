const wheel1 = document.querySelector('#wheel1');
const wheel2 = document.querySelector('#wheel2');
const wheel3 = document.querySelector('#wheel3');
const wheel = document.querySelectorAll('.slot_holder');
const play = document.querySelector('.btn_play');
const btnMoney = document.querySelector('.btn_money');
const money = document.querySelector('.money');
const modal = document.querySelector('.simpleModal');
const modalBtn = document.querySelector('.modalBtn');
const closeBtn = document.querySelector('.closeBtn');
const submit = document.querySelector('.submit');
const input = document.querySelectorAll('input');
const handle = new Audio('audio/payout2.wav');
const payOut = new Audio('audio/slot2.wav');
const fruit = ['images/apple.png', 'images/banana.png', 'images/cherry.png', 'images/grape.png', 'images/orange.png', 'images/bar.png', 'images/watermelon.png', 'images/lemon.png'];
play.disabled = true;
submit.disabled = true;

//  slot machine object

const slotMachine = {
    money: 0,
    credit: 0,
    bet: 0,
    randomize() {
        return fruit[Math.floor(Math.random() * this.credit)]
    },

    play() {
        let counter = 0;
        const spin = setInterval(() => {
            for(let i = 0; i < fruit.length; i++) {
            wheel1.setAttribute('src', this.randomize())
            wheel2.setAttribute('src', this.randomize())
            wheel3.setAttribute('src', this.randomize())
            
        }
    }, 10)
    const stopSpin = setInterval(() => {
       counter++;
       if(counter === 8) {
           clearInterval(spin) 
           this.compareValue();
       }
    }, 1000)
    },

    compareValue() {
        const val1 = wheel1.getAttribute('src');
        const val2 = wheel2.getAttribute('src');
        const val3 = wheel3.getAttribute('src');
        if (val1 === val2 && val1 === val3) {
            if(val1 === fruit[6] && val2 === fruit[6] && val3 === fruit[6]) {
                money.textContent = `$${this.money +=  this.bet * 2}`
                payOut.play();
            } else {
                money.textContent = `$${this.money += this.bet}`
                payOut.play();
            }
        } else if((val1 === fruit[6] && val3 === val2) || (val2 === fruit[6] && val1 === val3) || (val3 === fruit[6] && val2 === val1)) {
                money.textContent = `$${this.money += this.bet / 2}`
                payOut.play();
        } 
        else {
            money.textContent =  `$${this.money -= 2}`
        }
    }
}

// functions

const closeModal = () => {
    modal.style.display = 'none';
}
const clickOutSide = (e) => {
    if (e.target == modal) {
    modal.style.display = 'none';
    }
}

// const checkFields = () => {
//     for(let i = 0; i < input.length; i++) {
//         if(input[i].value === '') {
//             submit.disable = true;

//         } else {
//             submit.disable = false;
//         }
//         console.log(input[i]);
//     }
    
// }
// checkFields();

// event handlers

window.addEventListener('click', clickOutSide)

btnMoney.addEventListener('click', (e) => {
    play.disabled = false;
    const button = e.target.textContent;
    console.log(button);
    if (button == '20') {
        slotMachine.credit = 3
    } else if (button == '50') {
        slotMachine.credit = 5
    } else if (button == '100') {
        slotMachine.credit = 8
    }
    slotMachine.bet = Number(button)
    return slotMachine.credit
})

play.addEventListener('click', () => {
    slotMachine.play();
    handle.play();

})

window.onload = function() {
    modal.style.display = 'block';
};