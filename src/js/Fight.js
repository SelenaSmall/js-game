import Character from './Character'

export default class Fight {
	constructor() {
		this.player1 = player1
		this.player2 = player2
		this.duel = true
		this.damageThisRound = player1.characterAttack()
		this.totalDamage = 0
	}

	fighting() {
		while(this.duel) {
			if (this.totalDamage < 30) {	
				console.log(player1.characterName() + " Attack: " + player1.characterAttack())
				this.totalDamage += this.damageThisRound
				
				if (this.totalDamage < 30) { 
					console.log(player2.characterName() + " " + player2.characterDefend())
					console.log(player2.characterName() + " Attack: " + player2.characterAttack())
					if (player2.characterAttack()) {
						console.log(player1.characterName() + " " + player1.characterDefend())
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
