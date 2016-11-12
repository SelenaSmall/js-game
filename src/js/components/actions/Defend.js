import EventAbstractClass from 'event-abstract-class'
import Die from '../mechanics/Die'

const OPTIONS = {
}

/**
 * Defend component
 *
 * Handles functionality for Player Defends
 */
export default class Defend extends EventAbstractClass {
	// region Constructor

    /**
     * Constructor
     *
     * @param {HTMLElement|String} container Container element or selector
     * @param {Object}             options   Component options
     */
	constructor() {
		super()
		this.d6 = new Die(1, 6)
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

        console.log("Defend has been initialised")

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
		return "Block"
	}

    /**
     * Computer randomised Defend
     *
     * @fires Character#init:pre
     * @fires Character#init:post
     */
	computerDefend() {
		var defense = this.d6.roll()
		switch (defense) {
			case 1:
				return this.block()
				break
			case 2:
				return "Slip"
				break
			case 3:
				return "Get Hit"
				break
			case 4:
				return "Move Back"
				break
			case 5:
				return this.block()
				break
			case 6:
				return "Counter"
				break
			default:
				break
		}
	}
}

// let block = new Defend()
// console.log(block.computerDefend())