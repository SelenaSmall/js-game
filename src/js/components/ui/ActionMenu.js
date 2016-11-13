import EventAbstractClass from 'event-abstract-class'
import { STATES } from '../character/Character'

const OPTIONS = {
    containerClass:  'action-menu',
    actionNameClass: 'action-menu-item-name',
    actionCostClass: 'action-menu-item-cost',
    attackItemClass: 'action-menu-item-attack',
    defendItemClass: 'action-menu-item-defend',
    disabledClass:   'is-disabled',

    defendItemText: 'Defend'
}

/**
 * Action menu component
 */
export default class ActionMenu extends EventAbstractClass {
    // region Constructor

    /**
     * Constructor
     *
     * @param {Character} character Character that this action menu is for
     * @param {Object}    options   Component options
     */
    constructor(character, options = {}) {
        super()

        this.options   = Object.assign({}, OPTIONS, options)
        this.character = character

        this.container = document.createElement('menu')
        this.ul        = document.createElement('ul')
    }

    // endregion Constructor

    // reigon Event handlers

    /**
     * Handle attack item element click event
     *
     * @param {MouseEvent} attackIndex Character attack object
     * @param {MouseEvent} evt         Event object
     */
    handleAttackItemClick(attackIndex, evt) {
        this.character.setAction(STATES.ATTACKING,attackIndex)
    }

    /**
     * Handle defend item element click event
     *
     * @param {MouseEvent} evt    Event object
     */
    handleDefendItemClick(evt) {
        this.character.setAction(STATES.DEFENDING)
    }

    // endregion Event handlers

    // region Controls

    /**
     * Initialise component
     */
    init() {
        this.trigger('init:pre')

        this.render()

        this.trigger('init:post')
    }

    /**
     * Render component
     */
    render() {
        let defendItem = document.createElement('li')

        this.trigger('render:pre')

        this.ul.innerHTML = ''
        this.container.className = this.options.containerClass

        for (let index in this.character.attacks) {
            let attack = this.character.attacks[index],
                li = document.createElement('li')

            li.innerHTML = `<span class="${this.options.actionNameClass}">${attack.name}</span>`
            li.innerHTML += `<span class="${this.options.actionCostClass}">-${attack.cost}</span>`
            li.classList.add(this.options.attackItemClass)

            if (this.character.energy < attack.cost) {
                li.classList.add(this.options.disabledClass)
            } else {
                li.addEventListener('click', this.handleAttackItemClick.bind(this, index))
            }

            this.ul.appendChild(li)
        }

        defendItem.innerHTML = `<span class="${this.options.actionNameClass}">${this.options.defendItemText}</span>`
        defendItem.innerHTML += `<span class="${this.options.actionCostClass}">+${this.character.options.energyRecoveryIncrement}</span>`
        defendItem.classList.add(this.options.defendItemClass)
        defendItem.addEventListener('click', this.handleDefendItemClick.bind(this))

        this.ul.appendChild(defendItem)

        this.container.appendChild(this.ul)

        this.trigger('render:post')
    }

    // endregion Controls
}