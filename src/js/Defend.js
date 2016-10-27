import Die from './Die'

export default class Defend {
	constructor() {
		this.d6 = new Die(1, 6)
	}

	block() {
		return "Block"
	}

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