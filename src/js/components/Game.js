import EventAbstractClass from 'event-abstract-class'
import Fight from './Fight'

const OPTIONS = {
}

/**
 * Game component
 *
 * Handles functionality for launching a new game
 */
export default class Game extends EventAbstractClass {
 	// region Constructor

    /**
     * Constructor
     *
     * @param {HTMLElement|String} container Container element or selector
     * @param {Object}             options   Component options
     */
	constructor() {
		super()
		this.fight = new Fight()
		this.options = Object.assign({}, OPTIONS)
	}

	// endregion Constructor
	
	// region Controls

    /**
     * Initialise component
     *
     * @fires Game#init:pre
     * @fires Game#init:post
     */
    init () {
        this.trigger('init:pre')

        this.startGame() // Initialise >> Click the button to start now! #TODO: Create a button and bind an event to it

        this.trigger('init:post')
    }

    // endregion Controls

    /**
     * Start Game in 3, 2, 1, Fight!
     *
     * On screen countdown to initialize the fight
     */
	startGame() {
		var playNow = document.write("<button>Play Game</button>")

		for( var i = 4; i > -1 ; i-- ) {
		    switch (i) {
		    	case 0:
		    		console.log("FIGHT!")
		    		this.fight.init()
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
