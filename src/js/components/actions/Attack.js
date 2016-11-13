import Die from '../mechanics/Die'
import { STATES } from '../character/Character'

const D20 = new Die(20)

export default class Attack {
	// region Constructor

    /**
     * Constructor
	 *
	 * @param {string} name Attack name
	 * @param {Number} base Attack value
	 * @param {Number} cost Energy cost
     */
	constructor(name, base, cost) {
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



	///**
     //* Initialise component
     //*
     //* @fires Character#init:pre
     //* @fires Character#init:post
     //*/
    //init () {
     //   this.trigger('init:pre')
    //
     //   console.log("Attack has been initialised")
    //
     //   this.trigger('init:post')
    //}
    //
    //// endregion Controls
    //
    ///**
     //* Jab Score
     //*
     //* @fires Character#init:pre
     //* @fires Character#init:post
     //*/
	//jabScore() {
	//	return this.jab.roll()
	//}
    //
    ///**
     //* Computer randomised attack
     //*
     //* @fires Character#init:pre
     //* @fires Character#init:post
     //*/
	//computerAttack() {
	//	var defense = this.d6.roll()
	//	switch (defense) {
	//		case 1:
	//			return this.jabScore()
	//			break
	//		case 2:
	//			return "Upper Cut"
	//			break
	//		case 3:
	//			return "Hook"
	//			break
	//		case 4:
	//			return "Two hit combo"
	//			break
	//		case 5:
	//			return "Double Jab"
	//			break
	//		case 6:
	//			return "Three hit combo"
	//			break
	//		default:
	//			break
	//	}
	//}

}

// let jab = new Attack()