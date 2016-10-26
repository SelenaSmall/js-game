/**
 * Your overall app entry point
 * Initialise your modules in this file
 */
import"../scss/index.scss" 
import "./Game"
import "./Die"
import "./Character"
import "./Attack"



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



