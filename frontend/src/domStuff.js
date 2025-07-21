import * as PIXI from 'pixi.js'
import TitleImg from './img/title.png'

export const initTitle = () => {
    const titleImage = document.createElement('img');
    titleImage.src = TitleImg
    titleImage.id = "title-img"
    document.body.prepend(titleImage)
}

export const initCanvas = async() => {
    const appDiv = document.querySelector('#app')

    const canvasDiv = document.createElement('div')
    canvasDiv.id = 'canvas-div'

    const width = 256
    const height = 256
    const app = new PIXI.Application()
    await app.init({width, height})
    app.canvas.id="preview-canvas"

    canvasDiv.append(app.canvas)
    appDiv.append(canvasDiv)
    console.log('canvas inited')
}

export const initNameSelection = () => {
    const appDiv = document.querySelector('#app')

    const nameSelectContainer = document.createElement('div')
    nameSelectContainer.id='name-select-container'

    const nameSectionTitle = document.createElement('h3')
    nameSectionTitle.classList.add('section-title')
    nameSectionTitle.id = 'name-section-title'
    nameSectionTitle.textContent = 'sprite name'
    
    const nameInput = document.createElement('input')
    nameInput.type = 'text'
    nameInput.placeholder = "name"

    nameSelectContainer.append(nameSectionTitle, nameInput)
    appDiv.append(nameSelectContainer)
}