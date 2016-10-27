import Die from './Die'

export default class Attack {
	constructor() {
		this.jab = new Die(1, 10)
	}

	jabScore() {
		return this.jab.roll()
	}

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

let jab = new Attack()