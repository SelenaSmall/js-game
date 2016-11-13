import EventAbstractClass from 'event-abstract-class'
import { STATES } from '../character/Character'

const OPTIONS = {
    containerId:        'end-dialogue',

    titleText:          'Game Over',
    replayButtonText:   'Play Again'
}

/**
 * End Game dialogue component
 */
export default class EndDialogue extends EventAbstractClass {
    // region Construct

    /**
     * Constructor
     *
     * @param {Character} winner  Winning character
     * @param {Character} loser   Losing character
     * @param {Object}    options Component options
     */
    constructor (winner, loser, options = {}) {
        super()

        this.options = Object.assign({}, OPTIONS, options)
        this.winner = winner
        this.loser = loser

        this.container       = document.createElement('section')
        this.title           = document.createElement('h2')
        this.message         = document.createElement('p')
        this.replayButton    = document.createElement('button')
    }

    // endregion Construct

    // region Event handlers

    /**
     * Handle replay button element click event
     *
     * @param {MouseEvent} evt Event object
     */
    handleReplayButtonClick(evt) {
        this.winner.setProperty('state', STATES.SETUP)
        this.loser.setProperty('state', STATES.SETUP)
    }

    // region Event handlers

    // region Controls

    /**
     * Initialise component
     */
    init() {
        this.trigger('init:pre')

        this.bind()
        this.render()

        this.trigger('init:post')
    }

    /**
     * Bind functionality to events
     */
    bind() {
        this.trigger('bind:pre')

        this.replayButton.addEventListener('click', this.handleReplayButtonClick.bind(this))

        this.trigger('bind:post')
    }

    /**
     * Render component
     */
    render() {
        this.trigger('render:pre')

        this.container.id = this.options.containerId

        this.title.innerHTML = this.options.titleText
        this.message.innerHTML = `${this.winner.name} has won the fight against ${this.loser.name}!`
        this.replayButton.innerHTML = `<span>${this.options.replayButtonText}</span>`

        this.container.appendChild(this.title)
        this.container.appendChild(this.message)
        this.container.appendChild(this.replayButton)

        this.trigger('render:post')
    }

    // endregionControls

}