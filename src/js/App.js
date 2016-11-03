import EventAbstractClass from 'event-abstract-class'
import PlayerOne from './components/character/PlayerOne'
import PlayerTwo from './components/character/PlayerTwo'
import Game from './components/Game'
// import Character from './components/character/Character'
// import Attack from './components/Attack'
// import Die from './components/Die'

const OPTIONS = {
}

/**
 * Application root class
 */
export default class App extends EventAbstractClass {
    // region Constructor

    /**
     * Constructor
     *
     * @param {Object} options Application options
     */
    constructor (options = {}) {
        super()
        this.options = Object.assign({}, OPTIONS, options)
    }

    // endregion Constructor

    // region Helpers

    /**
     * Define components
     *
     * @fires App#defineComponents:pre
     * @fires App#defineComponents:post
     */
    defineComponents () {
        this.trigger('defineComponents:pre')

        this.playerOne = new PlayerOne("Fred")
        this.playerTwo = new PlayerTwo("Computer")
        this.game = new Game()

        this.trigger('defineComponents:post')
    }

    /**
     * Initialise components
     *
     * @fires App#initComponents:pre
     * @fires App#initComponents:post
     */
    initComponents () {
        this.trigger('initComponents:pre')

        this.playerOne.init()
        this.playerTwo.init()
        this.game.init()


        this.trigger('initComponents:post')
    }

    // endregion Helpers

    // region Controls

    /**
     * Initialise application
     *
     * @fires App#init:pre
     * @fires App#init:post
     */
    init () {
        this.trigger('init:pre')

        this.defineComponents()
        this.initComponents()

        this.trigger('init:post')
    }

    // endregion Controls
}
