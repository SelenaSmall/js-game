import EventAbstractClass from 'event-abstract-class'
import Attack from '../Attack'

const OPTIONS = {
}

/**
 * Character component
 *
 * Handles functionality for all characters
 */
export default class Character extends EventAbstractClass {
 	// region Constructor

    /**
     * Constructor
     *
     * @param {HTMLElement|String} container Container element or selector
     * @param {Object}             options   Component options
     */
	constructor() {
		super()
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

        console.log("Character has been initialised")

        this.trigger('init:post')
    }

}
 