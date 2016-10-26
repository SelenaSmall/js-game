import Attack from './Attack'
import Defend from './Defend'

export default class Character {
	constructor(name) {
		this.name = name
		this.jab = new Attack()
		this.block = new Defend()
	}

	characterName() {
		return this.name
	}

	characterAttack() {
		return this.jab.attackScore()
	}

	characterDefend() {
		return "Block " + this.block.defendScore()
	}

}
 
// let char1 = new Character(prompt("Choose your name: "))
// let char2 = new Character("Fred")

// console.log("Red Corner: " + char1.characterName())
// console.log("Blue Corner: " + char2.characterName())


// console.log(char1.characterName() + " " +char1.characterAttack())