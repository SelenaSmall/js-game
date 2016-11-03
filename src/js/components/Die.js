import EventAbstractClass from 'event-abstract-class'

const OPTIONS = {
}

/**
 * Die component
 *
 * Handles functionality for random number generation
 */
export default class Die extends EventAbstractClass {
    // region Constructor

    /**
     * Constructor
     *
     * @param {Object} options Application options
     */
	constructor(minSides, numSides) {
		super()
		this.minSides = minSides
		this.numSides = numSides
	}

	// endregion Constructor

	// region Controls

    /**
     * Roll die
     *
     * @fires App#init:pre
     * @fires App#init:post
     */
	roll() {
		return Math.floor(Math.random() * this.numSides) + this.minSides
	}

	// endregion Conrols

}

// let d6 = new Die(1, 6)
// console.log(d6.roll())