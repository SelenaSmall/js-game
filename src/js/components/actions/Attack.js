import Die from '../mechanics/Die'
import { STATES } from '../character/Character'

const D20 = new Die(20)

/**
 * Attack class component
 */
export default class Attack {
	// region Constructor

    /**
     * Constructor
	 *
	 * @param {Number} id   Unique attack ID
	 * @param {string} name Attack name
	 * @param {Number} base Attack value
	 * @param {Number} cost Energy cost
     */
	constructor(id, name, base, cost) {
		this.id   = id
		this.name = name
		this.base = base
		this.cost = cost
	}

	// endregion Constructor

	// region Controls

	/**
	 * Perform attack
	 *
	 * @param {Character} attacker Attacking character
	 * @param {Character} target Target character
	 */
	perform (attacker, target) {
		let damage 	= (this.base + attacker.stats.strength + D20.roll()),
			defense = (target.stats.defense + D20.roll())

		if (attacker.energy < this.cost) {
			return 0
		}

		if (target.state === STATES.DEFENDING) {
			damage = (damage - defense)
		}

		attacker.expend(this.cost)
		target.damage(damage)

		return damage
	}

	// endregion Controls

}
