/**
 * Overall app entry point
 * Initialise all modules
 */
import '../scss/index.scss'
import App from './App'

window.app = new App()
window.app.init()
