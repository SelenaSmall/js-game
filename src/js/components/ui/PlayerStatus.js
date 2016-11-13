import EventAbstractClass from 'event-abstract-class'
import StatusBar from './StatusBar'

const OPTIONS = {
    containerClass: 'player-status',
    lifeBarClass:   'player-status-life-bar',
    energyBarClass: 'player-status-energy-bar'

}

/**
 * Player Status class component
 */
export default class PlayerStatus extends EventAbstractClass {
    // region Construct

    /**
     * Constructor
     *
     * @param {string} character Character name
     * @param {Object} options Components options
     */
    constructor(character, options = {}) {
        super()

        this.options = Object.assign({}, OPTIONS, options)
        this.character = character

        this.container = document.createElement('section')
        this.name      = document.createElement('h2')

        this.lifeBar = new StatusBar({
            maxValue: this.character.options.maxLife
        })

        this.energyBar = new StatusBar({
            maxValue: this.character.options.maxEnergy
        })
    }

    // endregion Construct

    // region Event handlers

    /**
     * Handle Character#setProperty:post event
     *
     * @param {Object} args   Event arguments
     */
    handleCharacterSetProperty(args) {
        if (args.key === 'name') {
            this.name.innerHTML = args.value
        }
    }

    /**
     * Handle Character#damage:pre event and Character#heal:pre event
     *
     * @param {Object} args   Event arguments
     */
    handlePlayerLifeChange(args) {
        this.lifeBar.setValue(this.character.life)
    }

    /**
     * Handle Character#expend:pre event and Character#recover:pre event
     *
     * @param {Object}    args   Event arguments
     */
    handlePlayerEnergyChange(args) {
        this.energyBar.setValue(this.character.energy)
    }

    // endregion Event handlers

    // region Controls

    /**
     * Initialise component
     *
     * @fires PlayerStatus#init:pre
     * @fires PlayerStatus#init:post
     */
    init() {
        this.trigger('init:pre')

        this.lifeBar.init()
        this.energyBar.init()

        this.bind()
        this.render()

        this.trigger('init:post')
    }

    /**
     * Bind functionality to events
     *
     * @fires PlayerStatus#bind:pre
     * @fires PlayerStatus#bind:post
     */
    bind() {
        this.trigger('bind:pre')

        this.character.on('setProperty:post', this.handleCharacterSetProperty.bind(this))
        //this.character.on('damage:post heal:post', this.handlePlayerLifeChange.bind(this))
        //this.character.on('expend:post recover:post', this.handlePlayerEnergyChange.bind(this))

        this.trigger('bind:post')
    }

    /**
     * Render component
     *
     * @fires PlayerStatus#render:pre
     * @fires PlayerStatus#render:post
     */
    render() {
        this.trigger('render:pre')

        this.name.innerHTML = this.character.name

        this.container.className = this.options.containerClass

        this.lifeBar.container.classList.add(this.options.lifeBarClass)
        this.energyBar.container.classList.add(this.options.energyBarClass)

        this.lifeBar.setValue(this.character.life)
        this.energyBar.setValue(this.character.energy)


        this.container.appendChild(this.name)
        this.container.appendChild(this.lifeBar.container)
        this.container.appendChild(this.energyBar.container)

        this.trigger('render:post')
    }

    // endregion Controls

}
