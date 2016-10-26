class Game {
	constructor() {

	}

	startGame(){

		// var btn = document.createElement("<button>button</button>");
		// function playNowButton(){
		// 	this.addEventListener('click', this.bind(this));

		// }


		var playNow = prompt("Do you want to play?");

		if (playNow == "yes") {
			console.log("Do you want to play: You said YES");	
			
			newUser();
			countDown();

		} else {
			return false;
		}
	}

}

function newUser(){
	var user = prompt("Enter your name");
	console.log("User Name: " + user);	
}

function countDown(){
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

// let newGame = new Game();
// newGame.startGame();