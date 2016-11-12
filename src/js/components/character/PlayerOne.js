import BaseCharacter from './BaseCharacter'
import Defend from '../actions/Defend'
import Attack from '../actions/Attack'

const OPTIONS = {
}

/**
 * PlayerOne component
 *
 * Handles functionality for PlayerOne (the end user)
 */
export default class PlayerOne extends BaseCharacter {
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
		this.block = new Defend()
        this.jab = new Attack()	
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
     * Block
     *
     * @fires Character#init:pre
     * @fires Character#init:post
     */
	block() {
		return this.block.block()
	}

    /**
     * Jab
     *
     * @fires Character#init:pre
     * @fires Character#init:post
     */
    jab() {
        return this.jab.jabScore()
    }

}

// let player1 = new PlayerOne("Player1")
// console.log(player1)