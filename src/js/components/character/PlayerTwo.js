import BaseCharacter from './BaseCharacter'
import Defend from '../actions/Defend'
import Attack from '../actions/Attack'

/**
 * PlayerTwo component
 *
 * Handles functionality for PlayerTwo (the computer generated user)
 */
export default class PlayerTwo extends BaseCharacter {
	// region Constructor

    /**
     * Constructor
     *
     * @param {HTMLElement|String} container Container element or selector
     * @param {Object}             options   Component options
     */
	constructor(name) {
		super()
		this.name = name
		this.defend = new Defend()
        this.attack = new Attack()
	}

	// endregion Constructor

	// region Controls

	/**
     * Initialise component
     *
     * @fires Character#init:pre
     * @fires Character#init:post
     */
    init () {
        this.trigger('init:pre')

        // this.characterAttack()
        console.log(this.name + " has been initialised")

        this.trigger('init:post')
    }	

    // endregion Controls

    /**
     * Defend
     *
     * @fires Character#init:pre
     * @fires Character#init:post
     */
	defend() {
		return this.defend.computerDefend()
	}

    /**
     * Attack
     *
     * @fires Character#init:pre
     * @fires Character#init:post
     */    
    attack() {
        return this.attack.computerAttack()
    }
	
}

// let player2 = new PlayerTwo("Player2")
// console.log(player2)