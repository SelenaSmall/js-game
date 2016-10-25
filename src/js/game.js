class Game {
	constructor() {

	}

	startGame(){
		var playNow = prompt("Do you want to play?");

		if (playNow == "yes") {
			console.log("Do you want to play: You said YES");	
			
			var user = prompt("Enter your name");
			console.log("User Name: " + user);

			countDown();

		} else {
			return false;
		}
	}
}

function countDown() {
    for( var i = 4; i > -1 ; i-- ) {
	    switch (i) {
	    	case 0:
	    		console.log("FIGHT!");
	    		break;
	    	case 4:
	    		console.log("Play Now! Starting in...");
	    		break;
	    	default:
	    		console.log(i);
	    		break;
	    }
	}
}

let newGame = new Game();
newGame.startGame();