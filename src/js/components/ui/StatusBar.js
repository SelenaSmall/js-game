import EventAbstractClass from 'event-abstract-class'

const OPTIONS = {
    containerClass: 'status-bar',
    fillClass: 'status-bar-fill',
    percentageClass: 'status-bar-percentage',
    statsClass: 'status-bar-stats',

    maxValue: 100
}

/**\
 * Status bar component
 */
export default class StatusBar extends EventAbstractClass {
    // region Constructor

    /**
     * Constructor
     *
     * @param {Object} options Component options
     */
    constructor(options = {}) {
        super()

        this.options = Object.assign({}, OPTIONS, options)

        this.value = 0
        this.percent = 0

        this.isDisplayingPercentage = true

        this.container  = document.createElement('div')
        this.fill       = document.createElement('div')
        this.percentage = document.createElement('div')
        this.stats      = document.createElement('div')
    }

    // endregion Constructor

    // region Event handlers

    /**
     * Handle container element click event
     *
     * @param {MouseEvent} evt Event object
     */
    handleContainerClick(evt) {
        this.toggleDisplay()
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
        this.toggleDisplay(true)

        this.trigger('init:post')
    }

    /**
     * Bind functionality to events
     */
    bind() {
        this.trigger('bind:pre')

        this.container.addEventListener('click', this.handleContainerClick.bind(this))

        this.trigger('bind:post')
    }

    /**
     * Render component
     */
    render() {
        this.trigger('render:pre')

        this.container.className  = this.options.containerClass
        this.fill.className       = this.options.fillClass
        this.percentage.className = this.options.percentageClass
        this.stats.className      = this.options.statsClass

        this.container.appendChild(this.fill)
        this.container.appendChild(this.percentage)
        this.container.appendChild(this.stats)

        this.trigger('render:post')
    }

    /**
     * Set value
     *
     * @param {Number} value New value to set
     */
    setValue(value) {
        let percent,
            previousValue = this.value,
            previousPercent = this.percent

        value = (value > this.options.maxValue)
            ? this.options.maxValue
            : value

        percent = Math.floor((value / this.options.maxValue) * 100)

        this.trigger('setValue:pre', {
            previousValue:   previousValue,
            previousPercent: previousPercent,
            newValue:        value,
            newPercent:      percent
        })

        this.value = value
        this.percent = percent

        this.fill.style.width     = `${this.percent}%`
        this.percentage.innerHTML = `${this.percent}%`
        this.stats.innerHTML      = `${this.value} / ${this.options.maxValue}`

        this.trigger('setValue:post', {
            previousValue:   previousValue,
            previousPercent: previousPercent,
            newValue:        this.value,
            newPercent:      this.percent
        })
    }

    /**
     * Toggle percetentage/stats toggleDisplay
     *
     * @param {Boolean} isPercentage new display state to set
     */
    toggleDisplay (isPercentage) {
        if (isPercentage === undefined) {
            isPercentage = !this.isDisplayingPercentage
        }

        this.trigger('toggleDisplay:pre', {
            isPercentage: isPercentage
        })

        if (isPercentage) {
            this.container.removeChild(this.stats)
            this.container.appendChild(this.percentage)
        } else {
            this.container.removeChild(this.percentage)
            this.container.appendChild(this.stats)
        }

        this.isDisplayingPercentage = isPercentage

        this.trigger('toggleDisplay:post', {
            isPercentage: isPercentage
        })
    }

    // endregion Controls
}