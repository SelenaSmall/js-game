/**
 * Your overall app entry point
 * Initialise your modules in this file
 */
require("../scss/index.scss"); 
import "./game";
import "./dice";
import "./character";
import "./attack";



var fighting = true;
var damageThisRound = Math.floor(Math.random() * 5 + 1);
var totalDamage = 0;

while (fighting) {	
	if (totalDamage < 10) {	
		youAttack() 	
	} else if (totalDamage > 10) {
      	youWon();
    } else {
		youLost();
	}	
} 

function youWon(){
	console.log("KO! YOU WON");
  	fighting = false;
}

function youLost(){
	console.log("YOU LOST");
    fighting = false;
}


// Attack class with instances of attack stored in an array
// Attack would be a method of Character class
// call it like: let player1 = new Character(), player2 = new Character() player1.attack(player2)
function youAttack(){
	var youJab = Math.floor(Math.random() * 2);
	var youUpper = Math.floor(Math.random() * 3);
	
	if (youJab) {
    console.log("Jab: " + damageThisRound + " damage!");
    totalDamage += damageThisRound;
    youAttackAgain();

    } else if (youUpper) {
    console.log("Upper Cut: " + damageThisRound + " damage!");
    totalDamage += damageThisRound;
    youAttackAgain();

	}
}

function youAttackAgain(){
	if (totalDamage < 10) {
		console.log("Keep fighting");
	}	
}



// function rollDice(){
//     var d1 = Math.floor(Math.random() * 6) + 1;
//     var d2 = Math.floor(Math.random() * 6) + 1;
//     var diceTotal = d1 + d2;
    
//     if(d1 == d2){
//         console.log("DOUBLES! You get a free turn!!");
//     }	console.log("You rolled " + diceTotal);
// }

// rollDice();


