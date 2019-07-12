// grab slot machine elements
const shakeMachine = document.querySelector('article');
const wheel1 = document.querySelector('#wheel1');
const wheel2 = document.querySelector('#wheel2');
const wheel3 = document.querySelector('#wheel3');
const lightBulb = document.querySelectorAll('.light-bulb');
const wheel = document.querySelectorAll('.slot-holder');
const money = document.querySelector('.money');

// grab model elements
const modalForm = document.getElementsByClassName('modal')[0];
const modalInfo = document.getElementsByClassName('modal')[1];
const modalNoMoney = document.getElementsByClassName('modal')[2];

// grab button elements
const submitBtn = document.querySelector('.submit-btn')
const playBtn = document.querySelector('.play-btn');
const moneyBtn = document.querySelector('.money-btn');
const okayBtn = document.querySelector('.okay-btn');
const addMoreMoneyBtn = document.querySelector('.add-more-money-btn');

// input elements
const input = document.querySelectorAll('div-form input');
const credit = document.querySelectorAll('.credit');

// grab audio elements
const handle = new Audio('audio/payout2.wav');
const payOut = new Audio('audio/slot2.wav');

// grab money elements
const addMoney = document.querySelectorAll('.add-money')[0];
const addMoney1 = document.querySelectorAll('.add-money')[1];

// slot images array
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

// event handlers

// display INSTRUCTIONS
window.onload = function() {
    modalInfo.style.display = 'block';
};

// display FORM
okayBtn.addEventListener('click', () => {
    modalInfo.style.display = 'none';
    modalForm.style.display = 'block';
})

// submit form
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const password = document.querySelector('.password').value;
    const passwordRepeat = document.querySelector('.password-repeat').value;
    password !== passwordRepeat ? submitBtn.disabled = true : submitBtn.disabled = false;
    input.forEach((i) => {
        i.value === '' ? submitBtn.disabled = true : submitBtn.disabled = false;
    })
    credit.length === 19 ? submitBtn.disabled = true : submitBtn.disabled = false;
    slotMachine.addMoneyForm(); 
    modalForm.style.display = 'none';   
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

// play game
playBtn.addEventListener('click', () => {
    if(slotMachine.money === 0) {
        return slotMachine.showNoMoney();
    }
    slotMachine.play();
    handle.play();
    shakeMachine.classList.add('shake-machine');
    lightBulb.forEach(l => l.classList.add('flash-light'))
    setTimeout(() => {
        shakeMachine.classList.remove('shake-machine');
        lightBulb.forEach(l => l.classList.remove('flash-light'))
    }, 8000)
})

// add money again when out of money
addMoreMoneyBtn.addEventListener('click', () => {
    slotMachine.addMoneyAgain();
    addMoney1.value = '';
    modalNoMoney.style.display = 'none';
})
