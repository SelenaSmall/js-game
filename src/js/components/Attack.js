import EventAbstractClass from 'event-abstract-class'
import Die from './Die'

const OPTIONS = {
}

/**
 * Attack component
 *
 * Handles functionality for Player Attacks
 */
export default class Attack extends EventAbstractClass {
	// region Constructor

    /**
     * Constructor
     *
     * @param {HTMLElement|String} container Container element or selector
     * @param {Object}             options   Component options
     */
	constructor() {
		super()
		this.jab = new Die(1, 10)
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

        console.log("Attack has been initialised")

        this.trigger('init:post')
    }	

    // endregion Controls

    /**
     * Jab Score
     *
     * @fires Character#init:pre
     * @fires Character#init:post
     */
	jabScore() {
		return this.jab.roll()
	}

    /**
     * Computer randomised attack
     *
     * @fires Character#init:pre
     * @fires Character#init:post
     */
	computerAttack() {
		var defense = this.d6.roll()
		switch (defense) {
			case 1:
				return this.jabScore()
				break
			case 2:
				return "Upper Cut"
				break
			case 3:
				return "Hook"
				break
			case 4:
				return "Two hit combo"
				break
			case 5:
				return "Double Jab"
				break
			case 6:
				return "Three hit combo"
				break
			default:
				break
		}
	}

}

// let jab = new Attack()