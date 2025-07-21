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
    canvasDiv.classList.add('grid-section')

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
    nameSelectContainer.classList.add('grid-section')

    const sectionTitleContainer = document.createElement('div')
    sectionTitleContainer.classList.add('section-title-container')
    const nameSectionTitle = document.createElement('h3')
    nameSectionTitle.classList.add('section-title')
    nameSectionTitle.id = 'name-section-title'
    nameSectionTitle.textContent = 'sprite name'
    
    const sectionContentsContainer = document.createElement('div')
    sectionContentsContainer.classList.add('section-contents-container')
    const nameInput = document.createElement('input')
    nameInput.type = 'text'
    nameInput.placeholder = "name"

    //append everything to correct divs
    sectionTitleContainer.append(nameSectionTitle)
    sectionContentsContainer.append(nameInput)
    nameSelectContainer.append(sectionTitleContainer, sectionContentsContainer)
    appDiv.append(nameSelectContainer)
}

export const initSettingsSection = () => {
    const appDiv = document.querySelector('#app')

    const settingsContainer = document.createElement('div')
    settingsContainer.id='settings-select-container'
    settingsContainer.classList.add('grid-section')

    const sectionTitleContainer = document.createElement('div')
    sectionTitleContainer.classList.add('section-title-container')
    const settingsSectionTitle = document.createElement('h3')
    settingsSectionTitle.classList.add('section-title')
    settingsSectionTitle.id = 'settings-section-title'
    settingsSectionTitle.textContent = 'settings'
    
    const sectionContentsContainer = document.createElement('div')
    sectionContentsContainer.classList.add('section-contents-container')
    const gridSizeSelectLabel = document.createElement('label')
    gridSizeSelectLabel.textContent = 'grid size:'
    const gridSizeSelect = document.createElement('select')
    gridSizeSelect.id = 'grid-size-select'
    gridSizeSelect.name = 'grid-size-select'
    const option1 = document.createElement('option')
    option1.textContent = '32px'
    option1.value = 32
    const option2 = document.createElement('option')
    option2.textContent = '48px'
    option2.value = 48
    gridSizeSelect.append(option1, option2)

    //append everything to correct divs
    sectionTitleContainer.append(settingsSectionTitle)
    sectionContentsContainer.append(gridSizeSelectLabel, gridSizeSelect)
    settingsContainer.append(sectionTitleContainer, sectionContentsContainer)
    appDiv.append(settingsContainer)
}

export const initCharacterPartSection = () => {
    const appDiv = document.querySelector('#app')

    const navDiv = document.createElement('div')
    navDiv.id = 'character-part-select-container'
    navDiv.classList.add('grid-section')
    const partSelectList = document.createElement('ul')

    const hairListItem = document.createElement('li')
    const hairTitle = document.createElement('h3')
    hairTitle.textContent = 'hair' 
    hairListItem.append(hairTitle)

    const headListItem = document.createElement('li')
    const headTitle = document.createElement('h3')
    headTitle.textContent = 'head' 
    headListItem.append(headTitle)

    const torsoListItem = document.createElement('li')
    const torsoTitle = document.createElement('h3')
    torsoTitle.textContent = 'torso' 
    torsoListItem.append(torsoTitle)

    const legListItem = document.createElement('li')
    const legTitle = document.createElement('h3')
    legTitle.textContent = 'leg' 
    legListItem.append(legTitle)

    partSelectList.append(hairListItem, headListItem, torsoListItem, legListItem)
    navDiv.append(partSelectList)
    appDiv.append(navDiv)
}

export const initColorPickerSection = () => {
    const appDiv = document.querySelector('#app')

    const sectionContainer = document.createElement('div')
    sectionContainer.id = 'color-select-container'
    sectionContainer.classList.add('grid-section')
    const titleContainer = document.createElement('div')
    const colorTitle = document.createElement('h3')
    colorTitle.classList.add('section-title')
    colorTitle.textContent = 'color'
    const contentContainer = document.createElement('div')

    titleContainer.append(colorTitle)
    sectionContainer.append(titleContainer, contentContainer)
    appDiv.append(sectionContainer)
}