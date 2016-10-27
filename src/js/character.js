import Attack from './Attack'

export default class Character {
	constructor() {
		this.jab = new Attack()
		//this.lifeValue
	}

	characterName() {
		return this.name
	}

	characterAttack() {
		return this.jab.jabScore()
	}

}
 
// let char1 = new Character(prompt("Choose your name: "))
 
// let char1 = new Character()
// let char2 = new Character("Fred")

// console.log("Red Corner: " + char1.characterName())
// console.log("Blue Corner: " + char2.characterName())


// console.log(char1.characterName() + " " + char1.computerDefend())