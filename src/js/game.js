import Character from './Character'

export default class Game {
	constructor() {
	}

	startGame() {

		// var btn = document.createElement("<button>button</button>");
		// function playNowButton(){
		// 	this.addEventListener('click', this.bind(this));

		// }

		var playNow = document.write("<button>Play Game</button>")
		// playNow.addEventListener('click',() => alert('The button '+ playNow +' has been clicked'))

		for( var i = 4; i > -1 ; i-- ) {
		    switch (i) {
		    	case 0:
		    		console.log("FIGHT!")
		    		break;
		    	case 4:
		    		console.log("Play Now! Starting in...")
		    		break;
		    	default:
		    		console.log(i)
		    		break;
		    }
		}
	}

}

