import EventAbstractClass from 'event-abstract-class'
import { STATES } from '../character/Character'

const OPTIONS = {
    containerClass:         'player-settings',
    nameInputClass:         'player-settings-name',
    statsListClass:         'player-settings-stats',
    statsRollButtonClass:   'player-settings-roll',
    confirmButtonClass:     'player-settings-confirm',

    titleText:              'Player settings',
    statsHeadingText:       'Stats',
    statsRollButtonText:    'Roll stats',
    confirmButtonText:      'Confirm',
    confirmButtonReadyText: 'Ready',

    nameInputPlaceholder: 'Player name'
}

/**
 * Player settings component
 */
export default class PlayerSettings extends EventAbstractClass {
    // region Constructor

    /**
     * Constructor
     *
     * @param {Character} character Character to edit settings for
     * @param {Object}    options   Componenet options
     */
    constructor (character, options = {}) {
        super()

        this.options = Object.assign({}, OPTIONS, options)
        this.character = character

        this.container       = document.createElement('section')
        this.title           = document.createElement('h2')
        this.nameInput       = document.createElement('input')
        this.statsHeading    = document.createElement('h3')
        this.statsList       = document.createElement('dl')
        this.statsRollButton = document.createElement('button')
        this.confirmButton   = document.createElement('button')
    }

    // endregion Constructor

    // region Event handlers

    /**
     * Handle character#setProperty:post
     *
     * @param {Object} args Event arguements
     */
    handleCharacterSetProperty(args) {
        this.render()
    }

    /**
     * Handle name input changes for character
     *
     * @param {MouseEvent} evt Event object
     */
    handleNameInputChange(evt) {
        this.character.setProperty('name', this.nameInput.value)
    }

    /**
     * Handle stats roll button click event
     *
     * @param {MouseEvent} evt Event object
     */
    handleStatsRollButtonClick(evt) {
        this.character.rollStats()
    }

    /**
     * Handle confirm button clcik event
     *
     * @param {MouseEvent} evt Event object
     */
    handleConfirmButtonClick(evt) {
        this.character.setProperty('state', STATES.IDLE)
    }

    // endregion Event handlers

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

        this.nameInput.addEventListener('change', this.handleNameInputChange.bind(this))
        this.character.on('setProperty:post', this.handleCharacterSetProperty.bind(this))
        this.statsRollButton.addEventListener('click', this.handleStatsRollButtonClick.bind(this))
        this.confirmButton.addEventListener('click', this.handleConfirmButtonClick.bind(this))

        this.trigger('bind:post')
    }

    /**
     * Render component
     */
    render() {
        this.trigger('render:pre')

        this.container.className = this.options.containerClass
        this.title.innerHTML = this.options.titleText

        this.nameInput.type        = 'text'
        this.nameInput.placeholder = this.nameInputPlaceholder
        this.nameInput.className   = this.options.nameInputClass
        this.nameInput.value       = this.character.name

        this.statsHeading.innerHTML = this.options.statsHeadingText

        this.statsList.innerHTML = ''

        for (let key of Object.keys(this.character.stats)) {
            let dt = document.createElement('dt'),
                dd = document.createElement('dd')

            dt.innerHTML = `<span>${key}</span>`
            dd.innerHTML = `<span>${this.character.stats[key]}</span>`

            this.statsList.appendChild(dt)
            this.statsList.appendChild(dd)
        }

        this.statsRollButton.type = 'button'
        this.statsRollButton.innerHTML = `<span>${this.options.statsRollButtonText}</span>`
        this.statsRollButton.className = this.options.statsRollButtonClass

        this.confirmButton.type = 'button'
        this.confirmButton.className = this.options.confirmButtonClass

        if (this.character.state === STATES.SETUP) {
            this.confirmButton.innerHTML = `<span>${this.options.confirmButtonText}</span>`

            this.nameInput.disabled       = false
            this.confirmButton.disabled   = false
            this.statsRollButton.disabled = false
        } else {
            this.confirmButton.innerHTML = `<span>${this.options.confirmButtonReadyText}</span>`

            this.nameInput.disabled       = true
            this.confirmButton.disabled   = true
            this.statsRollButton.disabled = true
        }

        this.container.appendChild(this.title)
        this.container.appendChild(this.nameInput)
        this.container.appendChild(this.statsHeading)
        this.container.appendChild(this.statsList)
        this.container.appendChild(this.statsRollButton)
        this.container.appendChild(this.confirmButton)

        this.trigger('render:post')
    }

    // endregion Controls

}