import EventAbstractClass from 'event-abstract-class'
import Die from '../mechanics/Die'
import Attack from '../actions/Attack'

export const STATES = {
    SETUP:      0,
    IDLE:       1,
    ATTACKING:  2,
    DEFENDING:  3,
    WIN:        4,
    KO:         5
}

export const OPTIONS = {
    maxLife: 200,
    maxEnergy: 100,
    energyRecoveryIncrement: 20

}

export default class Character extends EventAbstractClass {
 	// region Constructor

    /**
     * Constructor
     *
     * @param {string} name Character name
     * @param {Object} name Components options
     */
	constructor(name, options = {}) {
		super()

        this.options = Object.assign({}, OPTIONS, options)

        this.name = name

        this.state       = STATES.SETUP
        this.actionIndex = undefined

        this.d9  = new Die(9, 0)

        this.life      = this.options.maxLife
        this.energy    = this.options.maxEnergy

        this.stats = {}

        this.attacks = [
            new Attack('Jab', 10, 10),
            new Attack('Punch', 15, 15),
            new Attack('Hook', 25, 25)
        ]

        this.rollStats()
	}

	// endregion Constructor
	
	// region Controls

    /**
     * Set character property
     *
     * @param {String} key   Property name to set
     * @param {*}      value Value to set
     */
    setProperty(key, value) {
        this.trigger('setProperty:pre', {
            key:    key,
            value:  value
        })

        this[key] = value

        this.trigger('setProperty:post', {
            key:    key,
            value:  value
        })
    }

    /**
     * Roll stats
     */
    rollStats() {
        this.trigger('rollStats:pre')

        this.setProperty('stats', {
            strength: this.d9.roll(3),
            defense: this.d9.roll(3),
            agility: this.d9.roll(3)
        })

        this.trigger('rollStats:post')
    }

    /**
     * Expend Energy
     *
     * @param {Number} value Amount of energy to expend
     */
    expend(value) {
        this.trigger('expend:pre', {
            value: value
        })

        if (value > 0) {
            this.energy = ((this.energy - value) > 0)
                ? (this.energy - value)
                : 0
        }

        this.trigger('expend:post', {
            value: value
        })
    }

    /**
     * Recover
     * @param {Number} value Amount of energy to recover
     */
    recover(value) {
        this.trigger('recover:pre', {
            value: value
        })

        if (value > 0) {
            this.energy = ((this.energy + value) > this.options.maxEnergy)
                ? this.options.maxEnergy
                : this.energy + value
        }

        this.trigger('recover:post', {
            value: value
        })
    }

    /**
     * Take Damage
     *
     * @param {Number} value Amount of damage to take
     */
    damage(value) {
        this.trigger('damage:pre', {
            value: value
        })

        if (value > 0) {
            this.life = ((this.life - value) > 0)
                ? (this.life - value)
                : 0
        }

        this.trigger('damage:post', {
            value: value
        })
    }

    /**
     * Heal characters
     *
     * @param {Number} value Amount of healing added to character
     */
    heal(value) {
        this.trigger('heal:pre', {
            value: value
        })

        if (value > 0) {
            this.life = ((this.life - value) > this.options.maxEnergy)
            ? this.options.maxEnergy
                : this.energy + value
        }

        this.trigger('heal:post', {
            value: value
        })
    }

    /**
     * Set next action to perform
     *
     * @param {Number} state       Character's defined state
     * @param {Number} actionIndex Action index if action requires it
     */
    setAction(state, actionIndex = undefined) {
        this.trigger('setAction:pre', {
            state: state,
            actionIndex: actionIndex
        })

        this.state = state
        this.actionIndex = actionIndex

        this.trigger('setAction:post', {
            state: state,
            actionIndex: actionIndex
        })
    }

    /**
     * Perform pre-selected action on target
     *
     * @param {Character} target Target charcter to attack
     */
    performAction(target) {
        let action,
            value

        this.trigger('performAction:pre', {
            target: target
        })

        switch(this.state) {
            case STATES.ATTACKING:
                action = this.attacks[this.actionIndex]

                if ( this.energy >= action.cost ) {
                    value = action.perform(this, target)
                } else {
                    this.recover(this.options.energyRecoveryIncrement)
                }
                break

            default:
            case STATES.DEFENDING:
                this.recover(this.options.energyRecoveryIncrement)
                break
        }

        this.trigger('performAction:post', {
            target: target,
            action: action,
            value: value
        })
    }

    // endregion COntrols

}
 