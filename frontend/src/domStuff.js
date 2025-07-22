import * as PIXI from 'pixi.js'
import TitleImg from './img/title.png'
import ArrowRight from  './img/icons/arrow-right.gif'
import ArrowLeft from  './img/icons/arrow-left.gif'
import CloseIcon from './img/icons/close.png'
import MinimizeIcon from './img/icons/minimize.png'
import MaximizeIcon from './img/icons/maximize.png'
import MoogleIcon from './img/icons/moogle.png'
import { hslToRgb } from './utils'

export const initTitle = () => {
    // const titleImage = document.createElement('img');
    // titleImage.src = TitleImg
    // titleImage.id = "title-img"
    // document.body.prepend(titleImage)

    //init top window bar
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

// export const initColorPickerSection = () => {
//     const appDiv = document.querySelector('#app')

//     const sectionContainer = document.createElement('div')
//     sectionContainer.id = 'color-select-container'
//     sectionContainer.classList.add('grid-section')
//     const titleContainer = document.createElement('div')
//     const colorTitle = document.createElement('h3')
//     colorTitle.classList.add('section-title')
//     colorTitle.textContent = 'color'
//     const contentContainer = document.createElement('div')

//     titleContainer.append(colorTitle)
//     sectionContainer.append(titleContainer, contentContainer)
//     appDiv.append(sectionContainer)
// }

export class CharacterPartSelect {
    constructor(){
        this.characterPartSectionContainer = document.createElement('div')
        this.characterPartSectionContainer.id = 'character-part-select-container'
        this.characterPartSectionContainer.classList.add('grid-section')
        this.sections = [new HairSection('hair', this.characterPartSectionContainer, true), new HeadSection('head', this.characterPartSectionContainer, false), new TorsoSection('torso', this.characterPartSectionContainer, false), new LegsSection('legs', this.characterPartSectionContainer, false)]
        this.selected = this.sections[0]
        console.log("SELECTED: ", this.selected)
        this.init()
        
    }

    init = () => {
        const appDiv = document.querySelector('#app')

        const partSelectList = document.createElement('ul')

        //init the different sections
        this.sections.forEach(section => {
            const sectionListItem = document.createElement('li')
            const sectionTitle = document.createElement('h3')
            sectionTitle.textContent = `${section.subSectionTitle}`
            sectionListItem.append(sectionTitle)
            partSelectList.append(sectionListItem)
            this.initEvents(sectionListItem)
        })

        this.characterPartSectionContainer.prepend(partSelectList)
        appDiv.append(this.characterPartSectionContainer)


    }

    initEvents = (li) => {
        li.addEventListener("mouseenter", () => {
            li.classList.add("highlight")
        })

        li.addEventListener("mouseleave", () => {
            li.classList.remove("highlight")
        })

        li.addEventListener("click", () => {this.setSelected(li.textContent)})
    }

    setSelected = (subSectionTitle) => {
        //first, set this.selected to the title of whichever li clicked
        this.selected = subSectionTitle
        //then, set all sub sections to hidden except the one
        //corresponding to the one clicked
        const subSections = document.querySelectorAll(".character-part-content-section")
        subSections.forEach(subSection => {
            if(!subSection.id.includes(subSectionTitle)){
                subSection.classList.add("hidden")
            }
            else subSection.classList.remove("hidden")
        })
    }
}

class CharacterPartSubSection {
    constructor(subSectionTitle, parentContainer, initAsSelected){
        this.subSectionTitle = subSectionTitle
        this.parentContainer = parentContainer
        this.initAsSelected = initAsSelected

        this.colorCanvasHeight = 128
        this.colorCanvasWidth = 128

        this.init()
    }

    init = () => {
        this.container = document.createElement('div')
        this.container.classList.add('character-part-content-section')
        if(!this.selected){this.container.classList.add('hidden')}
        this.container.id = `${this.subSectionTitle}-container`

        this.subSectionHeader = document.createElement('h5')
        this.subSectionHeader.textContent = this.subSectionTitle

        this.container.append(this.subSectionTitle)
        this.parentContainer.append(this.container)

    }

    initColorPicker = () => {
        //init's THIS sub section's color picker
        const appDiv = document.querySelector('#app')

        this.colorPickerContainer = document.createElement('div')
        this.colorPickerContainer.id = `${this.subSectionTitle}-color-select-container`
        this.colorTitleContainer = document.createElement('div')
        this.colorTitleContainer.classList.add('color-title-container')
        this.colorPickerTitle = document.createElement('h3')
        this.colorPickerTitle.classList.add('section-title')
        this.colorPickerTitle.textContent = `${this.subSectionTitle} color`
        this.colorContentContainer = document.createElement('div')
        this.colorContentContainer.classList.add('color-canvas-container')
        this.colorCanvas = document.createElement('canvas')
        this.colorCanvas.classList.add('color-canvas')
        this.colorCanvas.id=`${this.subSectionTitle}-color-canvas`
        this.colorCanvas.height = this.colorCanvasHeight
        this.colorCanvas.width = this.colorCanvasWidth
        this.initColorCanvas()

        this.colorTitleContainer.append(this.colorPickerTitle)
        this.colorContentContainer.append(this.colorCanvas)
        this.colorPickerContainer.append(this.colorTitleContainer, this.colorContentContainer)
        this.container.append(this.colorPickerContainer)
    }

    initColorCanvas = () => {
        this.ctx = this.colorCanvas.getContext('2d')
        let imageData = this.ctx.createImageData(this.colorCanvasWidth, this.colorCanvasHeight);

        for (let y = 0; y < this.colorCanvasHeight; y++) {
        const hue = (y / this.colorCanvasHeight) * 360; // hue from 0 to 360 vertically

        for (let x = 0; x < this.colorCanvasWidth; x++) {
            const saturation = x / this.colorCanvasWidth; // saturation from 0 (white) to 1 (full color)
            const lightness = 0.5; // fixed lightness, can also let this vary for brightness

            const [r, g, b] = hslToRgb(hue, saturation, lightness);
            const index = (y * this.colorCanvasWidth + x) * 4;

            imageData.data[index] = r;
            imageData.data[index + 1] = g;
            imageData.data[index + 2] = b;
            imageData.data[index + 3] = 255;
        }
        }

        this.ctx.putImageData(imageData, 0, 0);

        //add click event for color selection
        this.colorCanvas.addEventListener("click", this.handleColorCanvasClick)
    }

    handleColorCanvasClick = () => {
        console.log(`clicked the color canvas on the ${this.subSectionTitle}`)
    }
}

class HairSection extends CharacterPartSubSection{
    constructor(subSectionTitle, parentContainer, initAsSelected){
        super(subSectionTitle, parentContainer, initAsSelected)
        this.initHairSection()
        this.initColorPicker()
    }

    initHairSection = () => {
        this.selectContainer = document.createElement("div")
        this.selectContainer.classList.add("character-part-select-container")
        this.leftArrow = new Image()
        this.leftArrow.src = ArrowLeft
        this.leftArrow.classList.add("nav-arrow")
        this.rightArrow = new Image()
        this.rightArrow.src = ArrowRight
        this.rightArrow.classList.add("nav-arrow")
        this.selectionDiv = document.createElement('div')
        this.selectionDiv.classList.add("selection-preview-box")
        this.selectContainer.append(this.leftArrow, this.selectionDiv, this.rightArrow)

        this.leftArrow.addEventListener("click", ()  => {

        })
        this.rightArrow.addEventListener("click", () => {

        })

        this.container.append(this.selectContainer)
    }
}

class HeadSection extends CharacterPartSubSection{
    constructor(subSectionTitle, parentContainer, initAsSelected){
        super(subSectionTitle, parentContainer, initAsSelected)
        this.initHeadSection()
        this.initColorPicker()
    }

    initHeadSection = () => {
        this.selectContainer = document.createElement("div")
        this.selectContainer.classList.add("character-part-select-container")
        this.leftArrow = new Image()
        this.leftArrow.src = ArrowLeft
        this.leftArrow.classList.add("nav-arrow")
        this.rightArrow = new Image()
        this.rightArrow.src = ArrowRight
        this.rightArrow.classList.add("nav-arrow")
        this.selectionDiv = document.createElement('div')
        this.selectionDiv.classList.add("selection-preview-box")
        this.selectContainer.append(this.leftArrow, this.selectionDiv, this.rightArrow)        
        this.container.append(this.selectContainer)
    }
}

class TorsoSection extends CharacterPartSubSection{
    constructor(subSectionTitle, parentContainer, initAsSelected){
        super(subSectionTitle, parentContainer, initAsSelected)
        this.initTorsoSection()
        this.initColorPicker()
    }

    initTorsoSection = () => {
        this.selectContainer = document.createElement("div")
        this.selectContainer.classList.add("character-part-select-container")
        this.leftArrow = new Image()
        this.leftArrow.src = ArrowLeft
        this.leftArrow.classList.add("nav-arrow")
        this.rightArrow = new Image()
        this.rightArrow.src = ArrowRight
        this.rightArrow.classList.add("nav-arrow")
        this.selectionDiv = document.createElement('div')
        this.selectionDiv.classList.add("selection-preview-box")
        this.selectContainer.append(this.leftArrow, this.selectionDiv, this.rightArrow)        
        this.container.append(this.selectContainer)
    }
}

class LegsSection extends CharacterPartSubSection{
    constructor(subSectionTitle, parentContainer, initAsSelected){
        super(subSectionTitle, parentContainer, initAsSelected)
        this.initLegsSection()
        this.initColorPicker()
    }

    initLegsSection = () => {
        this.selectContainer = document.createElement("div")
        this.selectContainer.classList.add("character-part-select-container")
        this.leftArrow = new Image()
        this.leftArrow.src = ArrowLeft
        this.leftArrow.classList.add("nav-arrow")
        this.rightArrow = new Image()
        this.rightArrow.src = ArrowRight
        this.rightArrow.classList.add("nav-arrow")
        this.selectionDiv = document.createElement('div')
        this.selectionDiv.classList.add("selection-preview-box")
        this.selectContainer.append(this.leftArrow, this.selectionDiv, this.rightArrow)        
        this.container.append(this.selectContainer)
    }
}
