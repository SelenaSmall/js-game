export default class Die {
	constructor(minSides, numSides) {
		this.minSides = minSides
		this.numSides = numSides
	}

	roll() {
		return Math.floor(Math.random() * this.numSides) + this.minSides
	}

}

// let d6 = new Die(1, 6)
// console.log(d6.roll())
