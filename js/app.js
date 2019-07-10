const wheel1 = document.querySelector('#wheel1');
const wheel2 = document.querySelector('#wheel2');
const wheel3 = document.querySelector('#wheel3');
const wheel = document.querySelectorAll('.slot_holder');
const play = document.querySelector('.btn_div');
const fruit = ['images/apple.png', 'images/banana.png', 'images/cherry.png', 'images/grape.png', 'images/orange.png', 'images/bar.png', 'images/watermelon.png', 'images/lemon.png'];


const slotMachine = {

    randomize() {
        return fruit[Math.floor(Math.random() * fruit.length)]
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
       if(counter === 4) {
           clearInterval(spin)
       }
    }, 1000)
    }
}
play.addEventListener('click', () => {
    slotMachine.play();
})

// play.addEventListener('click', () => {
//     const wheelList = document.querySelector('.wheel_list');
//     wheelList.classList.add('animation')
//     const animaTimer = setTimeout(() => {
//         const w1 = wheel1.innerHTML = `<img src='images/${slot[randomize()]}'>`;
//         const w2 = wheel2.innerHTML  = `<img src='images/${slot[randomize()]}'>`;
//         if (w1 === w2) {
//             console.log('same');
//         } else {
//             console.log('not');
//         }
//     }, 5000)
// })
