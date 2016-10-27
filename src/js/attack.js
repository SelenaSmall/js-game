import Die from './Die'

export default class Attack {
	constructor() {
		this.jab = new Die(1, 10)
	}

	jabScore() {
		return this.jab.roll()
	}

}

let jab = new Attack()