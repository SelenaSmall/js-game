/**
 * Your overall app entry point
 * Initialise your modules in this file
 */
import"../scss/index.scss" 
import Game from './Game'
import Die from './Die'
// import Character from './Character'
import Attack from './Attack'
import PlayerOne from './PlayerOne'
import PlayerTwo from './PlayerTwo'

// let player1 = new Character(prompt("Choose your name: "))
// let player1 = new Character("Player 1")
// let player2 = new Character("Computer")
let player1 = new PlayerOne("Player1")
let player2 = new PlayerTwo("Player2")

console.log("Red Corner: " + player1.characterName() + " vs Blue Corner: " + player2.characterName())

let newGame = new Game()
newGame.startGame()


// console.log(player1.characterName() + " Attack: " + player1.characterAttack())
// console.log(player2.characterName() + " " + player2.computerDefend())


class Fight {
	constructor() {
		this.duel = true
		this.damageThisRound = player1.characterAttack()
		this.totalDamage = 0
	}

	fighting() {
		while(this.duel) {
			if (this.totalDamage < 30) {	
				console.log(player1.characterName() + ": Attack: " + player1.characterAttack())
				this.totalDamage += this.damageThisRound
				
				if (this.totalDamage < 30) { 
					console.log(player2.characterName() + ": " + player2.playerTwoDefend())
						
						if (player2.playerTwoDefend() == "Counter" ) {
							console.log(player2.characterName() + ": Attack: " + player2.characterAttack())
						}

					if (player2.characterAttack()) {
						console.log(player1.characterName() + ": " + player1.playerOneBlock())
						this.totalDamage += this.damageThisRound
					}
				}

			} else if (this.totalDamage > 30) {
				this.youWon()
			} else{
				this.youLost()
			}

		}
	}

	youWon() {
		console.log("KO! YOU WON");
	  	this.duel = false;
	}

	youLost() {
		console.log("YOU LOST");
	    this.duel = false;
	}	

}

let round1 = new Fight()
round1.fighting()


// var fighting = true
// var damageThisRound = player1.characterAttack()
// var totalDamage = 0



// while (fighting) {	
// 	if (totalDamage < 10) {	
// 		console.log(player1.characterName() + " Attack: " + player1.characterAttack())
// 		totalDamage += damageThisRound
// 	} else {
// 		console.log("You Lost")
// 		fighting = false
// 	}
// 	// if (player1.characterAttack()) {
// 	// 	totalDamage += damageThisRound
// 	// 	if (totalDamage < 10) {
// 	// 		console.log(player2.characterName() + " " + player2.characterDefend())
			
// 	// 	} else {
// 	// 		console.log("You Lost")
// 	// 		fighting = false;
// 	// 	}
// 	// } else {
// 	// 	console.log("Keep Fighting")
// 	// }


// }



// var damageThisRound = Math.floor(Math.random() * 5 + 1);
// var totalDamage = 0;

// while (fighting) {	
// 	if (totalDamage < 10) {	
// 		characterAttack()
// 	} else if (totalDamage > 10) {
//       	youWon();
//     } else {
// 		youLost();
// 	}	
// } 

// function youWon(){
// 	console.log("KO! YOU WON");
//   	fighting = false;
// }

// function youLost(){
// 	console.log("YOU LOST");
//     fighting = false;
// }




// var fighting = true;
// var damageThisRound = Math.floor(Math.random() * 5 + 1);
// var totalDamage = 0;

// while (fighting) {	
// 	if (totalDamage < 10) {	
// 		youAttack() 	
// 	} else if (totalDamage > 10) {
//       	youWon();
//     } else {
// 		youLost();
// 	}	
// } 

// function youWon(){
// 	console.log("KO! YOU WON");
//   	fighting = false;
// }

// function youLost(){
// 	console.log("YOU LOST");
//     fighting = false;
// }


// // Attack class with instances of attack stored in an array
// // Attack would be a method of Character class
// // call it like: let player1 = new Character(), player2 = new Character() player1.attack(player2)
// function youAttack(){
// 	var youJab = Math.floor(Math.random() * 2);
// 	var youUpper = Math.floor(Math.random() * 3);
	
// 	if (youJab) {
//     console.log("Jab: " + damageThisRound + " damage!");
//     totalDamage += damageThisRound;
//     youAttackAgain();

//     } else if (youUpper) {
//     console.log("Upper Cut: " + damageThisRound + " damage!");
//     totalDamage += damageThisRound;
//     youAttackAgain();

// 	}
// }

// function youAttackAgain(){
// 	if (totalDamage < 10) {
// 		console.log("Keep fighting");
// 	}	
// }














// class SaveBtn extends HTMLElement {

//    constructor() {
//        super();
//    } 
//    createdCallback(){
//        this.innerHTML = `
//            <style> 
//            p { color: orange; }
//            </style>
//            <p>I'm in a custom element <span id='spn' style='color:blue'></span> the below button is with me as well :).</p>
//            <button id='btn'></button>
//            `;
//         var spn = this.querySelector('span');
//         var btn = this.querySelector('button');
//         btn.addEventListener('click',() => alert('The button '+btn.textContent+' had been clicked'));
//    }

//    attachedCallback(){
//         this.querySelector('#spn').innerHTML = this.btntext != null ? this.btntext : this.dataset['text'];
//         this.querySelector('#btn').textContent = this.btntext != null ? this.btntext : this.dataset['text'];
//    }

//    set properties(prop) {
//         this.btntext = prop.text;
//    }

//    get text() {
//         return this.textContent;
//    } 
// }

// var MySaveBtn = document.registerElement("save-button", SaveBtn);

// var myBtn = new MySaveBtn;
// // myBtn.properties = { text: 'Loaded from JavaScript' };  // or myBtn.text = 'click me';
// console.log(document.querySelector('.characters'));
// document.querySelector('.div').appendChild(myBtn);

// var data;

// var dataReadyEvent = document.createEvent("Event");
// dataReadyEvent.initEvent("dataReady", true, false);

// function DataObject() {
//     this.name = "Data Object";
//     this.data = function () {
//         return data;
//     }
//     this.onDataCompleted = dataReadyHandler;
//     document.addEventListener('dataReady', this.onDataCompleted.bind(this));
//     // To see the result of not using bind, comment out the preceding line, 
//     // and uncomment the following line of code.
//     // document.addEventListener('dataReady', this.onDataCompleted);
// }
// function dataReadyHandler() {
//     if (console && console.log) {
//         console.log("Data object property value: " + this.name);
//         console.log("Data object property value: " + this.data());
//     }
// }

// var dataObj = new DataObject();


// var button;

// var clickEvent = document.createEvent("Event");
// clickEvent.initEvent("click", true, false);

// function DataObject() {
//     this.name = "Data Object";
//     this.data = function () {
//         return data;
//     }
//     this.click = clickHandler;
//     document.addEventListener('click', this.click.bind(this));
//     // To see the result of not using bind, comment out the preceding line, 
//     // and uncomment the following line of code.
//     // document.addEventListener('click', this.dataObj);
// }
// function clickHandler() {
//     if (console && console.log) {
//         console.log("Data object property value: " + this.name);
//         console.log("Data object property value: " + this.data());
//     }
// }

// var dataObj = new DataObject();
// console.log(dataObj)
