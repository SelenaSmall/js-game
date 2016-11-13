import EventAbstractClass from 'event-abstract-class'
import Die from './components/mechanics/Die'
import Character, { STATES } from './components/character/Character'
import StatusBar from './components/ui/StatusBar'
import ActionMenu from './components/ui/ActionMenu'

const OPTIONS = {
    player1StatusSelector: '#player-1-status',
    player2StatusSelector: '#player-2-status',
    bottomRegionSelector: '#bottom-region',

    lifeBarClass: 'life-bar',
    energyBarClass: 'energy-bar',

    cycleDelay: 1000
}

export const PHASES = {
    SETUP:   0,
    SELECT:  1,
    PERFORM: 2,
    EFFECT:  3,
    END:     4
}

const CHANCE = new Die(3),
    D20 = new Die(20)

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

        this.cycleTimeOut = undefined

        this.player1Status = document.querySelector(this.options.player1StatusSelector)
        this.player2Status = document.querySelector(this.options.player2StatusSelector)
        this.bottomRegion = document.querySelector(this.options.bottomRegionSelector)

        this.player1 = new Character('Selena')
        this.player2 = new Character('Raice')

        this.actionMenu = new ActionMenu(this.player1)

        this.player1.lifeBar = new StatusBar({
            maxValue: this.player1.options.maxLife
        })

        this.player1.energyBar = new StatusBar({
            maxValue: this.player1.options.maxEnergy
        })

        this.player2.lifeBar = new StatusBar({
            maxValue: this.player2.options.maxLife
        })

        this.player2.energyBar = new StatusBar({
            maxValue: this.player2.options.maxEnergy
        })

    }

    // endregion Constructor

    // region Event handlers

    /**
     * Handle Character#performAction:pre event
     *
     * @param {Character} player Player performing the action
     * @param {Object}    args   Event arguments
     */
    handlePlayerPerformAction(player, args) {
        let action

        switch(player.state) {
            case STATES.ATTACKING:
                action = player.attacks[player.actionIndex]

                if (player.energy >= action.cost) {
                    console.log(`${player.name} attacks ${args.target.name} with a ${action.name}.`)
                } else {
                    console.log(`${player.name} doesn't have the energy to attack with a ${action.name} and recoveres for ${player.options.energyRecoveryIncrement} energy.`)
                }
                break

            default:
            case STATES.DEFENDING:
                console.log(`${player.name} defends and recovers for ${player.options.energyRecoveryIncrement} energy.`)
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

    /**
     * Handle Character#damage:pre event and Character#heal:pre event
     *
     * @param {Character} player Player receiving life change
     * @param {Object}    args   Event arguments
     */
    handlePlayerLifeChange(player, args) {
        player.lifeBar.setValue(player.life)
    }

    /**
     * Handle Character#expend:pre event and Character#recover:pre event
     *
     * @param {Character} player Player receiving energy change
     * @param {Object}    args   Event arguments
     */
    handlePlayerEnergyChange(player, args) {
        player.energyBar.setValue(player.energy)
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
     * Set actions for both players turns
     */
    setPlayerActions() {
        this.setActionsForPlayer(this.player1)
        this.setActionsForPlayer(this.player2)
    }

    /**
     * Run actions for current players turn
     */
    runPlayerActions() {
        if (
            (this.player1.agility + D20.roll()) >
            (this.player2.agility + D20.roll())
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

        this.player1.setAction((this.player1 > 0) ? STATES.IDLE : STATES.KO)
        this.player2.setAction((this.player2 > 0) ? STATES.IDLE : STATES.KO)

        if (
            (this.player1.life > 0) &&
            (this.player2.life > 0)
        ) {
            this.setPhase(PHASES.SELECT)
        } else {
            this.setPhase(PHASES.END)
        }
    }

    // endregion Lifecycle

    // region Controls

    /**
     * Initialise components
     */
    initComponents() {
        this.player1.lifeBar.init()
        this.player1.energyBar.init()

        this.player2.lifeBar.init()
        this.player2.energyBar.init()

        this.actionMenu.init()
    }


    /**
     * Initialise application
     */
    init() {
        this.initComponents()
        this.render()
        this.bind()
        this.setPhase(PHASES.SELECT)
    }

    /**
     * Render application
     */
    render() {
        this.player1.lifeBar.container.classList.add(this.options.lifeBarClass)
        this.player1.energyBar.container.classList.add(this.options.energyBarClass)

        this.player2.lifeBar.container.classList.add(this.options.lifeBarClass)
        this.player2.energyBar.container.classList.add(this.options.energyBarClass)

        this.player1.lifeBar.setValue(this.player1.life)
        this.player1.energyBar.setValue(this.player1.energy)

        this.player2.lifeBar.setValue(this.player2.life)
        this.player2.energyBar.setValue(this.player2.energy)

        this.player1Status.appendChild(this.player1.lifeBar.container)
        this.player1Status.appendChild(this.player1.energyBar.container)

        this.player2Status.appendChild(this.player2.lifeBar.container)
        this.player2Status.appendChild(this.player2.energyBar.container)
    }

    /**
     * Bind functionality to events
     */
    bind() {
        this.player1.on('damage:post heal:post', this.handlePlayerLifeChange.bind(this, this.player1))
        this.player2.on('damage:post heal:post', this.handlePlayerLifeChange.bind(this, this.player2))

        this.player1.on('expend:post recover:post', this.handlePlayerEnergyChange.bind(this, this.player1))
        this.player2.on('expend:post recover:post', this.handlePlayerEnergyChange.bind(this, this.player2))

        this.player1.on('setAction:post', this.handlePlayer1SetAction.bind(this))

        this.player1.on('performAction:pre', this.handlePlayerPerformAction.bind(this, this.player1))
        this.player2.on('performAction:pre', this.handlePlayerPerformAction.bind(this, this.player2))
    }

    /**
     * Set game state phases
     *
     * @param {Number} phase Game state phases
     */
    setPhase(phase) {
        switch(phase) {
            case PHASES.SELECT:
                this.actionMenu.render()
                this.bottomRegion.appendChild(this.actionMenu.container)
                break

            case PHASES.PERFORM:
                this.bottomRegion.removeChild(this.actionMenu.container)
                this.runPlayerActions()
                break

            case PHASES.EFFECT:
                break

            case PHASES.END:
                break
        }
    }

    /**
     * Run an automated turn cycle
     */
    cycle() {
        if (this.cycleTimeOut) {
            window.clearTimeout(this.cycleTimeOut)
        }

        this.setPlayerActions()
        this.runPlayerActions()

        if (
            (this.player1.life > 0) &&
            (this.player2.life > 0)
        ) {
            this.cycleTimeOut = window.setTimeout(
                () => this.cycle(),
                this.options.cycleDelay
            )
        }
    }

    // endregion Controls
}
