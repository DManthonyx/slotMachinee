// grab slot machine
const shakeMachine = document.querySelector('article');
const wheel1 = document.querySelector('#wheel1');
const wheel2 = document.querySelector('#wheel2');
const wheel3 = document.querySelector('#wheel3');
const lightBulb = document.querySelectorAll('.lightBulb');
const wheel = document.querySelectorAll('.slotHolder');
const money = document.querySelector('.money');

// grab model
const modalForm = document.getElementsByClassName('modal')[0];
const modalInfo = document.getElementsByClassName('modal')[1];
const modalNoMoney = document.getElementsByClassName('modal')[2];

// grab button
const playBtn = document.querySelector('.playBtn');
const moneyBtn = document.querySelector('.moneyBtn');
const modalBtn = document.querySelector('.modalBtn');
const closeBtn = document.querySelector('.closeBtn');
const submitBtn = document.querySelector('.submitBtn');
const input = document.querySelectorAll('input');
const okayBtn = document.querySelector('.okayBtn');
const addMoreMoneyBtn = document.querySelector('.addMoreMoneyBtn');

// grab audio
const handle = new Audio('audio/payout2.wav');
const payOut = new Audio('audio/slot2.wav');

// grab money
const addMoney = document.querySelectorAll('.addMoney')[0];
const addMoney1 = document.querySelectorAll('.addMoney')[1];

// slot images
const fruit = ['images/apple.png', 'images/banana.png', 'images/cherry.png', 'images/grape.png', 'images/orange.png', 'images/bar.png', 'images/watermelon.png', 'images/lemon.png'];

// button disabled
playBtn.disabled = true;

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
    },

    checkInput() {
        const password = document.querySelectorAll('.password')[0].value;
        const passwordRepeat = document.querySelectorAll('.password')[1].value;
        while(password.length != passwordRepeat.length) {
            submit.disabled = true;
        }
        
    },

    showNoMoney() {
        modalNoMoney.style.display = 'block'; 
    },

    addMoneyForm() {
       money.textContent = `$${this.money += +addMoney.value}`
    },

    addMoneyAgain() {
        money.textContent = `$${this.money += +addMoney1.value}`
        modalNoMoney.style.display = 'block';
    }
}

// functions
const clickOutSide = (e) => {
    if (e.target == modalForm) {
    modalForm.style.display = 'none';
    }
}

// event handlers
window.addEventListener('click', clickOutSide)

// submit form
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const password = document.querySelectorAll('.password')[0].value;
        const passwordRepeat = document.querySelectorAll('.password')[1].value;
        if(password.length !== passwordRepeat.length) {
            submit.disabled = true;
        }
    slotMachine.addMoneyForm(); 
    modalForm.style.display = 'none';   
})

// play game
playBtn.addEventListener('click', () => {
    if(slotMachine.money === 0) {
        return slotMachine.showNoMoney();
    }
    slotMachine.play();
    handle.play();
    shakeMachine.classList.add('shakeMachine');
    lightBulb.forEach(l => l.classList.add('flashLight'))
    setTimeout(() => {
        shakeMachine.classList.remove('shakeMachine');
        lightBulb.forEach(l => l.classList.remove('flashLight'))
    }, 8000)
})

// display INSTRUCTIONS
window.onload = function() {
    modalInfo.style.display = 'block';
};

// display FORM
okayBtn.addEventListener('click', () => {
    modalInfo.style.display = 'none';
    modalForm.style.display = 'block';
})

// chose play OPTIONS
moneyBtn.addEventListener('click', (e) => {
    playBtn.disabled = false;
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

// add money again when out of money
addMoreMoneyBtn.addEventListener('click', () => {
    slotMachine.addMoneyAgain();
    modalNoMoney.style.display = 'none';
})
