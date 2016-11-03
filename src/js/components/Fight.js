import EventAbstractClass from 'event-abstract-class'
import PlayerOne from './character/PlayerOne'
import PlayerTwo from './character/PlayerTwo'
// import Character from './character/Character'

const OPTIONS = {
}

/**
 * Game component
 *
 * Handles functionality for the duel
 */
export default class Fight extends EventAbstractClass{
 	// region Constructor

    /**
     * Constructor
     *
     * @param {HTMLElement|String} container Container element or selector
     * @param {Object}             options   Component options
     */
	constructor() {
		super()
		this.duel = true
		// this.damageThisRound = player1.characterAttack()
		this.totalDamage = 0
	}

	// endregion Constructor

	// region Controls

    /**
     * Initialise component
     *
     * @fires Game#init:pre
     * @fires Game#init:post
     */
	init() {
        this.trigger('init:pre')

        this.fighting()

        this.trigger('init:post')
	}

	// endregion Controls

	fighting() {
		while(this.duel) {
	        if (this.playerOneTotalDamage < 30 && this.playerTwoTotalDamage < 30) { 
	            // console.log(player1.characterName() + ": Attack: " + player1.characterAttack())
	            this.playerOneTotalDamage += this.playerOneDamageThisRound
	                
	            if (this.playerOneTotalDamage < 30) { 
	                // console.log(player2.characterName() + ": " + player2.playerTwoDefend())
	                        
	                if (player2.playerTwoDefend() != "Counter" ) {
	                    // console.log(player2.characterName() + ": Attack: " + player2.characterAttack())
	                    this.playerTwoTotalDamage += this.playerTwoDamageThisRound

	                    if (player2.characterAttack()) {
	                        // console.log(player1.characterName() + ": " + player1.playerOneBlock())
	                    } else {
	                        // console.log(player1.characterName() + ": Attack: " + player1.characterAttack())
	                        this.playerOneTotalDamage += this.playerOneDamageThisRound
	                    }
	                }

	            } 
	                
	        } else if (this.playerOneTotalDamage > 30) {
	            this.youWon()
	        } else if (this.playerTwoTotalDamage > 30) {
	            this.youLost()
	        } else {
	            this.youWon()
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
