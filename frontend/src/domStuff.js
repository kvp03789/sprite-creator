
import CloseIcon from './img/icons/close.png'
import MinimizeIcon from './img/icons/minimize.png'
import MaximizeIcon from './img/icons/maximize.png'
import MoogleIcon from './img/icons/moogle.png'

//inits top window bar
export const initTitle = () => {
    const appDiv = document.querySelector('#app')
    const topDivBar = document.createElement('div')
    const iconsContainer = document.createElement('div')
    const titleContainer = document.createElement('div')
    const titleText = document.createElement('h5')
    const moogleIcon = new Image()
    moogleIcon.src = MoogleIcon
    titleText.textContent = 'kvp0\'s_sprite_creator'
    topDivBar.id = 'top-bar'
    titleContainer.id = 'top-bar-title-container'
    iconsContainer.id = 'top-bar-icons-container'
    const closeButton = new Image()
    closeButton.src = CloseIcon
    const minimizeButton = new Image()
    minimizeButton.src = MinimizeIcon
    const maximizeButton = new Image()
    maximizeButton.src = MaximizeIcon
    titleContainer.append(moogleIcon, titleText)
    iconsContainer.append(minimizeButton, maximizeButton, closeButton)
    topDivBar.append(titleContainer, iconsContainer)
    appDiv.append(topDivBar)
}



