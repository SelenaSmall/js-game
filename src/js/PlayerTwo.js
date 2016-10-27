import Character from './Character'
import Defend from './Defend'

export default class PlayerTwo extends Character {
	constructor(name) {
		super()
		this.name = name
		this.defend = new Defend()
	}

	playerTwoDefend() {
		return this.defend.computerDefend()
	}

	
}

// let player2 = new PlayerTwo("Player2")
// console.log(player2)
