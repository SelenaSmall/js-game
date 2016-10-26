import Die from './Die'

export default class Attack {
	constructor() {
		this.d20 = new Die(1, 20)
	}

	attackScore() {
		return this.d20.roll()
	}

	defendScore() {
		return this.d20.roll()
	}
}

let jab = new Attack()