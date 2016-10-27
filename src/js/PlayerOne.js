import Character from './Character'
import Defend from './Defend'

export default class PlayerOne extends Character {
	constructor(name) {
		super()
		this.name = name	
		this.block = new Defend()	
	}

	playerOneBlock() {
		return this.block.block()
	}

}

// let player1 = new PlayerOne("Player1")
// console.log(player1)
//  