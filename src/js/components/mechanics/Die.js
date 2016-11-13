/**
 * Die class component
 */
export default class Die {
    // region Constructor

    /**
     * Constructor
     *
     * @param {Number} sides number of sides on die
	 * @param {Number} start lowest number on the die
     */
	constructor(sides = 6, start = 1) {
		this.sides = sides
		this.start = start
	}

	// endregion Constructor

	// region Controls

    /**
     * Roll die
	 *
	 * @returns {Number}
     */
	roll(times = 1) {
		let value = 0

		for (let i = 0; i < times; i += 1) {
			value += Math.floor((Math.random() * this.sides) + this.start)
		}
		return value
	}

	// endregion Conrols
}
