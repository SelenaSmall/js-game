import EventAbstractClass from 'event-abstract-class'
import { STATES } from '../character/Character'

export const AVATAR_STATES = {
    IDLE:   0,
    JAB:    1,
    PUNCH:  2,
    HOOK:   3,
    DEFEND: 4,
    HIT:    5,
    WIN:    6,
    KO:     7
}

const OPTIONS = {
    containerClass: 'avatar',

    idleClass:  'avatar-idle',
    jabClass:    'avatar-jab',
    punchClass:  'avatar-punch',
    hookClass:   'avatar-hook',
    defendClass: 'avatar-defend',
    hitClass:    'avatar-hit',
    winClass:    'avatar-win',
    koClass:     'avatar-ko'
}

/**
 * Avatr class component
 */
export default class Avatar extends EventAbstractClass {
    // region Constructor

    /**
     * Constructor
     * @param {Character} character Character avatar
     * {Object} options Applicaiton options
     */
    constructor(character, options = {}) {
        super()

        this.options   = Object.assign({}, OPTIONS, options)
        this.character = character

        this.state = AVATAR_STATES.IDLE

        this.container = document.createElement('div')
    }

    // endregion Constructor

    // region Event handlers

    /**
     * Handle character actions
     *
     * @param {Number} args State to be updated
     */
    handleCharacterPerformAction(args) {
        this.updateState()
    }

    // endregion Event handlers

    // region Controls

    /**
     * Initialise component
     *
     * @fires Avatar#init:pre
     * @fires Avatar#init:post
     */
    init() {
        this.trigger('init:pre')

        this.bind()
        this.render()

        this.trigger('init:post')
    }

    /**
     * Bind component event classes
     *
     * @fires Avatar#bind:pre
     * @fires Avatar#bind:post
     */
    bind() {
        this.trigger('bind:pre')

        this.character.on('performAction:pre', this.handleCharacterPerformAction.bind(this))

        this.trigger('bind:post')
    }

    /**
     * Render component
     *
     * @fires Avatar#render:pre
     * @fires Avatar#render:post
     */
    render() {
        this.trigger('render:pre')

        this.container.className = this.options.containerClass

        switch(this.state) {
            default:
            case AVATAR_STATES.IDLE:
                this.container.classList.add(this.options.idleClass)
                break

            case AVATAR_STATES.JAB:
                this.container.classList.add(this.options.jabClass)
                break

            case AVATAR_STATES.PUNCH:
                this.container.classList.add(this.options.punchClass)
                break

            case AVATAR_STATES.HOOK:
                this.container.classList.add(this.options.hookClass)
                break

            case AVATAR_STATES.DEFEND:
                this.container.classList.add(this.options.defendClass)
                break

            case AVATAR_STATES.HIT:
                this.container.classList.add(this.options.hitClass)
                break

            case AVATAR_STATES.WIN:
                this.container.classList.add(this.options.winClass)
                break

            case AVATAR_STATES.KO:
                this.container.classList.add(this.options.koClass)
                break

        }

        this.trigger('render:post')
    }

    /**
     * Update avatar state
     */
    updateState() {
        let action,
            state = AVATAR_STATES.idle

        switch (this.character.state) {
            case STATES.IDLE:
                state = AVATAR_STATES.IDLE
                break

            case STATES.ATTACKING:
                if (this.character.actionIndex !== undefined) {
                    action = this.character.attacks[this.character.actionIndex]
                }

                if (this.character.energy >= action.cost) {
                    state = action.id
                } else {
                    state = AVATAR_STATES.IDLE
                }
                break

            case STATES.DEFENDING:
                state = AVATAR_STATES.DEFEND
                break

            case STATES.HIT:
                state = AVATAR_STATES.HIT
                break

            case STATES.KO:
                state = AVATAR_STATES.KO
                break

            case STATES.WIN:
                state = AVATAR_STATES.WIN
                break
        }

        this.state = state

        this.render()
    }

    // endregion Controls

}
