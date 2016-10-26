import Die from './Die'

export default class Defend {
	constructor() {
		this.d6 = new Die(1, 6)
	}

	defendScore() {
		return this.d6.roll()
	}
}

let block = new Defend()