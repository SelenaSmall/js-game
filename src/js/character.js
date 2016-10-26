import Die from './Die'

class Character {
	constructor() {
		this.d20 = new Die(1, 20)
		// let value = this.d20.roll()
	}

	characterRoll() {
		return this.d20.roll()
	}

}

let char1 = new Character()
console.log(char1.characterRoll())