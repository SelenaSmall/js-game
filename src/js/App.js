import EventAbstractClass from 'event-abstract-class'
import Die from './components/mechanics/Die'
import Character, { STATES } from './components/character/Character'
import PlayerSettings from './components/ui/PlayerSettings'
import PlayerStatus from './components/ui/PlayerStatus'
import Avatar from './components/ui/Avatar'
import ActionMenu from './components/ui/ActionMenu'
import EndDialogue from './components/ui/EndDialogue'

const OPTIONS = {
    containerSelector:     '#app',
    player1StatusSelector: '#player-1-status',
    player2StatusSelector: '#player-2-status',
    topRegionSelector:     '#top-region',
    middleRegionSelector:  '#middle-region',
    bottomRegionSelector:  '#bottom-region',

    player1StatusId:       'player-1-status',
    player2StatusId:       'player-2-status',
    player1AvatarId:       'player-1-avatar',
    player2AvatarId:       'player-2-avatar',

    phaseDelay: 1000
}

export const PHASES = {
    SETUP:   0,
    SELECT:  1,
    PERFORM: 2,
    EFFECT:  3,
    END:     4
}

const CHANCE = new Die(3),
      D20    = new Die(20)

/**
 * Application root class
 */
export default class App extends EventAbstractClass {
    // region Constructor

    /**
     * Constructor
     *
     * @param {Object} options Applicaiton options
     */
    constructor(options = {}) {
        super()

        this.options = Object.assign({}, OPTIONS, options)

        this.phase        = PHASES.SETUP
        this.phaseTimeout = undefined

        this.container     = document.querySelector(this.options.containerSelector)
        this.topRegion     = document.querySelector(this.options.topRegionSelector)
        this.middleRegion  = document.querySelector(this.options.middleRegionSelector)
        this.bottomRegion  = document.querySelector(this.options.bottomRegionSelector)

        this.player1 = new Character('Player One')
        this.player2 = new Character('Computer')

        this.player1Settings = new PlayerSettings(this.player1, {titleText: 'Player One Settings'})
        this.player2Settings = new PlayerSettings(this.player2, {titleText: 'CPU Opponent Settings'})

        this.player1Avatar = new Avatar(this.player1)
        this.player2Avatar = new Avatar(this.player2)

        this.player1Status = new PlayerStatus(this.player1)
        this.player2Status = new PlayerStatus(this.player2)

        this.actionMenu = new ActionMenu(this.player1)

        this.endDialogue   = undefined

    }

    // endregion Constructor

    // region Helpers

    /**
     * Update player status to reflect current stats
     */
    updatePlayerStatus() {
        this.player1Status.lifeBar.setValue(this.player1.life)
        this.player1Status.energyBar.setValue(this.player1.energy)

        this.player2Status.lifeBar.setValue(this.player2.life)
        this.player2Status.energyBar.setValue(this.player2.energy)
    }

    // endregion Helpers

    // region Event handlers

    /**
     * Handle Character#setProperty:post
     *
     * @param {Character} player Player performing the action
     * @param {Object}    args   Event arguments
     */
    handlePlayerSetProperty(player, args) {
        switch(this.phase) {
            case PHASES.SETUP:
                if (
                    (this.player1.state === STATES.IDLE) &&
                    (this.player2.state === STATES.IDLE)
                ) {
                    this.setPhase(PHASES.SELECT)
                }
                break

            case PHASES.END:
                if (
                    (this.player1.state === STATES.SETUP) &&
                    (this.player2.state === STATES.SETUP)
                ) {
                    this.setPhase(PHASES.SETUP)
                }
                break
        }
    }

    /**
     * Handle character# event
     *
     * @param {Object}    args   Event arguments
     */
    handlePlayer1SetAction(args) {
        switch(args.state) {
            case STATES.ATTACKING:
            case STATES.DEFENDING:
                this.setActionsForPlayer(this.player2)
                this.setPhase(PHASES.PERFORM)
                break
        }
    }

    // endregion Event handlers

    // region Lifecycle

    /**
     * Set action s for current turn for specified player
     *
     * @param {Character} player
     */
    setActionsForPlayer(player) {
        if (CHANCE.roll() === 1) {
            player.setAction(STATES.DEFENDING)
        } else {
            player.setAction(STATES.ATTACKING, Math.round(Math.random() * (player.attacks.length - 1)))
        }
    }

    /**
     * Run setup phase
     */
    runSetupPhase() {
        if (
            this.endDialogue &&
            this.endDialogue.container.parentNode
        ) {
            this.endDialogue.container.parentNode.removeChild(this.endDialogue.container)
        }

        if (this.player1Status.container.parentNode) {
            this.player1Status.container.parentNode.removeChild(this.player1Status.container)
            this.player2Status.container.parentNode.removeChild(this.player2Status.container)
        }

        if (this.player1Avatar.container.parentNode) {
            this.player1Avatar.container.parentNode.removeChild(this.player1Avatar.container)
            this.player2Avatar.container.parentNode.removeChild(this.player2Avatar.container)
        }

        this.player1.actionLog = []
        this.player2.actionLog = []

        this.player1.heal(this.player1.options.maxLife)
        this.player1.recover(this.player1.options.maxEnergy)

        this.player2.heal(this.player2.options.maxLife)
        this.player2.recover(this.player2.options.maxEnergy)

        this.updatePlayerStatus()

        //this.player2.rollStats()
        //this.player2.setProperty('state', STATES.IDLE)

        this.middleRegion.appendChild(this.player1Settings.container)
        this.middleRegion.appendChild(this.player2Settings.container)

        this.player1Settings.nameInput.focus()
    }

    /**
     * Run select phase
     */
    runSelectPhase() {
        if (this.player1Settings.container.parentNode) {
            this.player1Settings.container.parentNode.removeChild(this.player1Settings.container)
            this.player2Settings.container.parentNode.removeChild(this.player2Settings.container)
        }

        this.player1.setAction(STATES.IDLE)
        this.player2.setAction(STATES.IDLE)

        this.player1Avatar.updateState()
        this.player2Avatar.updateState()

        this.topRegion.appendChild(this.player1Status.container)
        this.topRegion.appendChild(this.player2Status.container)

        this.middleRegion.appendChild(this.player1Avatar.container)
        this.middleRegion.appendChild(this.player2Avatar.container)

        this.actionMenu.render()
        this.bottomRegion.appendChild(this.actionMenu.container)
    }

    /**
     * Run perform phase
     */
    runPerformPhase() {
        let previousPlayer1Life = this.player1.life,
            previousPlayer2Life = this.player2.life

        this.bottomRegion.removeChild(this.actionMenu.container)

        if (
            (this.player1.stats.agility + D20.roll()) >
            (this.player2.stats.agility + D20.roll())
        ) {
            this.player1.performAction(this.player2)

            if (this.player2.life > 0) {
                this.player2.performAction(this.player1)
            }
        } else {
            this.player2.performAction(this.player1)

            if (this.player1.life > 0) {
                this.player1.performAction(this.player2)
            }
        }

        this.player1.setAction((this.player1.life < previousPlayer1Life) ? STATES.HIT : STATES.IDLE)
        this.player2.setAction((this.player2.life < previousPlayer2Life) ? STATES.HIT : STATES.IDLE)

        this.phaseTimeout = window.setTimeout(
            () => this.setPhase(PHASES.EFFECT),
            this.options.phaseDelay
        )
    }

    /**
     * Run effect phase
     */
    runEffectPhase() {
        let nextPhase = PHASES.SELECT

        if (
            (this.player1.life <= 0) ||
            (this.player2.life <= 0)
        ) {
            nextPhase = PHASES.END
        }

        this.player1Avatar.updateState()
        this.player2Avatar.updateState()
        this.updatePlayerStatus()

        this.phaseTimeout = window.setTimeout(
            () => this.setPhase(nextPhase),
            this.options.phaseDelay
        )
    }

    /**
     * Run end phase
     */
    runEndPhase() {
        let winner,
            loser

        if (this.player1.life > 0) {
            winner = this.player1
            loser = this.player2

            this.player1.setAction(STATES.WIN)
            this.player2.setAction(STATES.KO)
        } else {
            loser = this.player1
            winner = this.player2

            this.player1.setAction(STATES.KO)
            this.player2.setAction(STATES.WIN)
        }

        this.player1Avatar.updateState()
        this.player2Avatar.updateState()

        this.endDialogue = new EndDialogue(winner, loser)
        this.endDialogue.init()

        this.middleRegion.appendChild(this.endDialogue.container)

    }

    // endregion Lifecycle

    // region Controls

    /**
     * Initialise components
     */
    initComponents() {
        this.player1Settings.init()
        this.player2Settings.init()

        this.player1Status.init()
        this.player2Status.init()

        this.player1Avatar.init()
        this.player2Avatar.init()

        this.actionMenu.init()
    }

    /**
     * Initialise application
     */
    init() {
        this.initComponents()
        this.render()
        this.bind()
        this.setPhase(PHASES.SETUP)
    }

    /**
     * Render application
     */
    render() {
        this.player1Status.container.id = this.options.player1StatusId
        this.player2Status.container.id = this.options.player2StatusId

        this.player1Avatar.container.id = this.options.player1AvatarId
        this.player2Avatar.container.id = this.options.player2AvatarId

    }

    /**
     * Bind functionality to events
     */
    bind() {
        this.player1.on('setProperty:post', this.handlePlayerSetProperty.bind(this, this.player1))
        this.player2.on('setProperty:post', this.handlePlayerSetProperty.bind(this, this.player2))

        this.player1.on('setAction:post', this.handlePlayer1SetAction.bind(this))
    }

    /**
     * Set game state phases
     *
     * @param {Number} phase Game state phases
     */
    setPhase(phase) {
        if (this.phaseTimeout) {
            window.clearTimeout(this.phaseTimeout)
        }

        this.phase = phase

        switch(this.phase) {
            case PHASES.SETUP:
                this.runSetupPhase()
                break

            case PHASES.SELECT:
                this.runSelectPhase()
                break

            case PHASES.PERFORM:
                this.runPerformPhase()
                break

            case PHASES.EFFECT:
                this.runEffectPhase()
                break

            case PHASES.END:
                this.runEndPhase()
                break
        }

    }

    // endregion Controls
}
