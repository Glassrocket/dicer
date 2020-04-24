
//  OBJECTS
const player = {
    name: 'Player',
    hp: 30,
    attack: 5,
    defence: 10,
    armor: 2,
    weapon: 3
}

const enemy = {
    name: 'Wild Boar',
    hp: 40,
    attack: 3,
    defence: 5,
    armor: 0,
    weapon: 0
}


//VARS
let currentRollAttack = [];
let currentRollDefence= [];
let combatLogAttack = [];
let combatLogDefence = [];

//HTML ELEMENTS

const mainWrapper = document.getElementById('main-wrapp');
const listContainer = document.createElement('ul');
const infoContainer = document.createElement('div');
const rollBtn = document.createElement('button');
const resetBtn = document.createElement('button');
const startBtn = document.createElement('button');



//APPENDS AND STYLES
mainWrapper.appendChild(listContainer);
mainWrapper.appendChild(rollBtn);
mainWrapper.appendChild(resetBtn);
mainWrapper.appendChild(startBtn);
mainWrapper.appendChild(infoContainer);
rollBtn.innerText = "ROLL";
resetBtn.innerText = "RESET";
startBtn.innerText = "FIGHT";
rollBtn.style.display = "none";
resetBtn.style.display = "none";


//BASIC ROLL
const rollAtt = () => Math.floor((Math.random() * 6) + 1);
const rollDeff = () => Math.floor((Math.random() * 6) + 1);
// const showLog = () => console.log(combatLog.join(" / "));

//MAIN ROLL FUNCTION
const rollDice = (nDice) => {
let sumRollA = 0;
let sumRollD = 0;
    for(let i = 0; i < nDice; i++) {
    let rollA = rollAtt();
    let rollD = rollDeff();

    currentRollAttack.push(rollA);
    currentRollDefence.push(rollD);
}

    for (let i = 0; i < currentRollAttack.length; i++) {
    sumRollA += currentRollAttack[i];
    sumRollD += currentRollDefence[i];
}

//PRINT ROLL
listContainer.innerHTML += `
<li><em>Player rolled [ATTACK]:</em><strong> ${currentRollAttack.join(" + ")} = ${sumRollA}</strong></li>
<li><em>Enemy rolled [DEFENCE]:</em><strong> ${currentRollDefence.join(" + ")} = ${sumRollD}</strong></li>
<li>------------------------------------------------</li>
`;

if (sumRollA > sumRollD) {
    listContainer.innerHTML += `
    <li>Boar takes 5 damage</li>
    `
} else {
    listContainer.innerHTML += `
    <li>MISS</li>
    `
}

// 
combatLogAttack.push(currentRollAttack.join(" + ") + " = " + sumRollA);
combatLogDefence.push(currentRollDefence.join(" + ") + " = " + sumRollD)
currentRollAttack =[];
currentRollDefence =[];
}

// RESET ROLL LIST
const resetFn = () => {
    listContainer.innerHTML = ``
}

//LISTENERS
// --------------------------------------------
rollBtn.addEventListener('click', () => {
    if (combatLogAttack.length < 1) {
    rollDice(2)
    };
    if (combatLogAttack.length >= 1) {
        resetBtn.style.display = "block";
    }
});
// --------------------------------------------
resetBtn.addEventListener('click', () => {
    resetFn();
    combatLogAttack = [];
    combatLogDefence = [];
});

// --------------------------------------------
startBtn.addEventListener('click', () => {
    rollBtn.style.display = "block";
    startBtn.style.display = "none";

    // PRINT FIGHT INFO
    infoContainer.innerHTML = `
    
    `

})


