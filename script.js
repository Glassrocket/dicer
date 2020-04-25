
// =================================
// *********** OBJECTS *************
// ================================
const player = {
    name: 'Anna',
    hp: 50,
    attack: 5,
    defence: 10,
    damageMin: 5,
    damageMax: 10,
    armor: 2,
    weapon: 3
}

const enemy = {
    name: 'Wild Boar',
    hp: 40,
    attack: 3,
    defence: 5,
    damageMin: 4,
    damageMax: 7,
    armor: 0,
    weapon: 0
}

const cards = [
    {
        cardName: "Brutal Slash",
        roll: 1,
        dice: 0,
        damage: 5,
    },
    {
        cardName: "Long shot",
        roll: -3,
        dice: 0,
        damage: 10,
    },
    {
        cardName: "Preparation",
        roll: 5,
        dice: 2,
        damage: 0,
    },
    {
        cardName: "Aimed strike",
        roll: 2,
        dice: 1,
        damage: 2,
    },
    {
        cardName: "cunning shiv",
        roll: 0,
        dice: 1,
        damage: 3,
    },


]


// =================================
// *********** VARS *************
// ================================
let currentRollAttack = [];
let currentRollDefence = [];

let hpHolder = player.hp;
let hpHolderEnemy = enemy.hp;
let damageHolder = player.damageMin + "-" + player.damageMax;
let damageHolderEnemy = enemy.damageMin + "-" + enemy.damageMax;
let turn = true;



// ==========================================================
// *********** ACCESS AND CREATE HTML ELEMENTS *************
// =========================================================
const mainWrapper = document.getElementById('main-wrapp');
const combatLogContainer = document.getElementById('combat-log-container');
const title = document.getElementsByTagName('h1');
const listContainer = document.createElement('ul');
const infoContainer = document.createElement('div');
const playerBox = document.getElementById('player-box-id');
const hpBarMax = document.getElementById('hp-bar-max-id');
const hpBarEnemyMax = document.getElementById('hp-bar-enemy-max-id')
const hpBar = document.getElementById('hp-bar-id');
const hpBarEnemy = document.getElementById('hp-bar-enemy-id');
const hpCurrent = document.getElementById('current-hp-id');
const hpCurrentEnemy = document.getElementById('current-hp-enemy-id');
const rollBtn = document.createElement('button');
const startBtn = document.createElement('button');
const playerDamage = document.getElementById('player-damage-id');
const enemyDamage  = document.getElementById('enemy-damage-id');
const playerName = document.getElementById('player-name-id');
const enemyName = document.getElementById('enemy-name-id');
const infoWrapper = document.getElementById('info-wrapper-id');



// ============================================
// *********** APPENDS AND STYLES *************
// ============================================
combatLogContainer.appendChild(listContainer);
combatLogContainer.appendChild(rollBtn);
combatLogContainer.appendChild(startBtn);
combatLogContainer.appendChild(infoContainer);
rollBtn.innerText = "ROLL";
startBtn.innerText = "FIGHT";
rollBtn.style.display = "none";
hpCurrent.innerText = player.hp + "hp";
hpCurrentEnemy.innerText = enemy.hp + "hp";
hpBarMax.style.width = player.hp + "px";
hpBarEnemyMax.style.width = enemy.hp + "px";
hpBar.style.width = hpHolder + "px";
hpBarEnemy.style.width = enemy.hp + "px";
playerDamage.innerText = "Damage: " + damageHolder;
enemyDamage.innerText = "Damage: " + damageHolderEnemy;
playerName.innerText = player.name;
enemyName.innerText = enemy.name;




// ===================================
// *********** FUNCTIONS *************
// ===================================

//BASIC ROLL-----------------------------------------------
const rollAtt = () => Math.floor((Math.random() * 6) + 1);
const rollDeff = () => Math.floor((Math.random() * 6) + 1);
// -------------FUNCTION END-------------------------------

 

// *********************************************************************
//MAIN ROLL PLAYER ATTACK-----------------------------------------------
const rollDice = (nDice) => {
//RESETROLL-----------------
    listContainer.innerHTML = ``

// TITLE ------------------------------
title[0].innerText = player.name + " Attaks";

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
<li>------------------------------------------------</li>
<li><em>${player.name} rolled [ATTACK]:</em><strong> ${currentRollAttack.join(" + ")} = ${sumRollA}</strong></li>
<li><em>${enemy.name} rolled [DEFENCE]:</em><strong> ${currentRollDefence.join(" + ")} = ${sumRollD}</strong></li>
<li>------------------------------------------------</li>
`;

if (sumRollA > sumRollD) {
// ----------ROLL DAMAGE-------------
    damageHolder = Math.floor((Math.random()* player.damageMax)+ player.damageMin)

    listContainer.innerHTML += `
    <li>${enemy.name} takes <strong>${damageHolder}</strong> damage this turn</li>
    `;
    hpHolderEnemy -= damageHolder;
    hpCurrentEnemy.innerText = hpHolderEnemy + "hp";
    hpBarEnemy.style.width = hpHolderEnemy + "px";

} else {
    listContainer.innerHTML += `
    <li><em><strong>MISS</strong></em></li>
    `
};
if (hpHolderEnemy <= 0) {
    combatLogContainer.style.display = 'none';
    infoWrapper.style.display = 'none';
    title[0].innerText = player.name + ' wins :)';
}

// RECORD AND RESET
    
    currentRollAttack =[];
    currentRollDefence =[];

// TURN------------------------------
turn = !turn;

}
// ------------------FNCTION END-------------------------


// *********************************************************************
// MAIN ROLL ENEMY ATTACK-----------------------------------------------
const rollDiceEnemy = (nDice) => {
    //RESETROLL-----------------
        listContainer.innerHTML = ``
    
    // TITLE ------------------------------
    title[0].innerText = enemy.name + " Attaks";


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
    <li>------------------------------------------------</li>
    <li><em>${enemy.name} rolled [ATTACK]:</em><strong> ${currentRollAttack.join(" + ")} = ${sumRollA}</strong></li>
    <li><em>${player.name} rolled [DEFENCE]:</em><strong> ${currentRollDefence.join(" + ")} = ${sumRollD}</strong></li>
    <li>------------------------------------------------</li>
    `;
    
    if (sumRollA > sumRollD) {
    // ----------ROLL DAMAGE-------------
        damageHolderEnemy = Math.floor((Math.random()* enemy.damageMax)+ enemy.damageMin)
    
        listContainer.innerHTML += `
        <li>${enemy.name} takes <strong>${damageHolderEnemy}</strong> damage this turn</li>
        `;
        hpHolder -= damageHolderEnemy;
        hpCurrent.innerText = hpHolder + "hp";
        hpBar.style.width = hpHolder + "px";
    
    } else {
        listContainer.innerHTML += `
        <li><em><strong>MISS</strong></em></li>
        `
    };
    if (hpHolder <= 0) {
        combatLogContainer.style.display = 'none';
        infoWrapper.style.display = 'none';
        title[0].innerText = 'Game Over :(';
    }
    
    // RECORD AND RESET
    currentRollAttack =[];
    currentRollDefence =[];


// TURN------------------------------
    turn = !turn;

    }
    // ------------------FNCTION END-------------------------
    






// ============================================
// ************** EVENT LISTENERS *************
// ============================================

// --------------------------------------------
rollBtn.addEventListener('click', () => {
    if (turn === true) {
        rollDice(2);
    }else{
        rollDiceEnemy(2);
    }
    
});
 

 



// --------------------------------------------
startBtn.addEventListener('click', () => {
    rollBtn.style.display = "block";
    startBtn.style.display = "none";
    infoWrapper.style.display = 'flex';
    title[0].innerText = player.name + " Attaks";

    // PRINT FIGHT INFO
    infoContainer.innerHTML = `
    
    `

})






// ============================================
// ************** IFs *************
// ============================================

