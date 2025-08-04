import * as PIXI from 'pixi.js'
import TitleImg from './img/title.png'
import ArrowRight from  './img/icons/arrow-right.gif'
import ArrowLeft from  './img/icons/arrow-left.gif'
import { hslToRgb } from './utils'
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './settings'
import parsedJson from '../json/parsedJson'

export default class CharacterPartSelect {
    constructor(parsedSprites, texturesObject, buildSprite){
        this.characterPartSectionContainer = document.createElement('div')
        this.characterPartSectionContainer.id = 'character-part-select-container'
        this.characterPartSectionContainer.classList.add('grid-section')

        //buildSprite is function passed down from Application. Removes the sprites in
        //the main preview container and re-paints the canvas with new sprites
        //representing the ones set in each character part section. this function
        //is called when arrow buttons are clicked to select sprites in each section.
        this.buildSprite = buildSprite

        //object with an array for each sprite part that contains all the 
        //different options for each section
        this.parsedSprites = parsedSprites
        //textures is the loaded bundles of textures from the assetManifest,
        //passed from the Application class as texturesObject
        this.texturesObject = texturesObject

        this.sections = [new HairSection('hair', this.characterPartSectionContainer, true, this.texturesObject.hair, this.buildSprite), new HeadSection('head', this.characterPartSectionContainer, false, this.texturesObject.head, this.buildSprite), new TorsoSection('torso', this.characterPartSectionContainer, false, this.texturesObject.torso, this.buildSprite), new LegsSection('legs', this.characterPartSectionContainer, false, this.texturesObject.legs, this.buildSprite)]
        this.selected = this.sections[0]

        
    }

    initDom = async () => {
        const appDiv = document.querySelector('#app')

        const partSelectList = document.createElement('ul')

        //init the different sections
        this.sections.forEach(async section => {
            const sectionListItem = document.createElement('li')
            const sectionTitle = document.createElement('h3')
            sectionTitle.textContent = `${section.subSectionTitle}`
            sectionListItem.append(sectionTitle)
            partSelectList.append(sectionListItem)
            this.initEvents(sectionListItem)

            await section.init()
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

        li.addEventListener("click", () => {this.setSelected(li.textContent, li)})
    }

    setSelected = (subSectionTitle, liElement) => {
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

        //whichever <li> clicked should get the "selected" class
        const liNodeList = document.querySelectorAll('li')
        liNodeList.forEach(li => li.textContent != subSectionTitle ? li.classList?.remove("selected") : li.classList.add("selected"))
    }
}

class CharacterPartSubSection {
    constructor(subSectionTitle, parentContainer, initAsSelected, texturesArray, buildSprite){
        this.subSectionTitle = subSectionTitle
        this.parentContainer = parentContainer
        this.initAsSelected = initAsSelected
        this.texturesArray = texturesArray

        this.buildSprite = buildSprite
        console.log("andrew rayel",this.buildSprite)

        this.pixiApp = new PIXI.Application()
        this.ticker = new PIXI.Ticker()
        
        this.width = CANVAS_WIDTH
        this.height = CANVAS_HEIGHT

        //sprites array will hold all the sprites for this section after they
        //are converted from the textures in texturesArray
        this.spritesArray = []

        //spritesARrayIndex is which index of spritesArray is displaying
        this.spritesArrayIndex = 0

        this.colorCanvasHeight = 128
        this.colorCanvasWidth = 128
        //an array that holds the color presets that are used to create 
        //the color swatch grid 
        this.presetColorsArray = []

        //this represents which index of the sprites array for corresponding 
        //sprite part is being displayyed currently. starts at 0 and is incrememnted
        //and derememnted with arrow buttons
        this.partIndex = 0
    }

    init = async () => {
        
        //init pixi portion
        await this.pixiApp.init({width: this.width, height: this.height, preference: 'webgl'})
        this.pixiApp.stage.label = `${this.subSectionTitle}_stage`
        this.pixiApp.canvas.classList.add("selection-preview-box")
        
        //init sprites and add first one in array to preview canvas
        this.loadSprites()
        //init dom stuff for this section
        this.initSectionDom()
        //init some colors into the presetColorsArray
        this.initPresetColorsArray()
        //init color picker for this section
        this.initColorPicker()
    }

    loadSprites = async () => {
        //oki first turn all textures in texturesArray into pixi sprites~!
        this.texturesArray.forEach(async texture => {
            const rectangle = new PIXI.Rectangle(0, 0, 16, 16)
            const slicedTexture = new PIXI.Texture(texture, rectangle)
            const sprite = new PIXI.Sprite(slicedTexture)
            //add customId prop to sprite that corresponds with texture's customId
            sprite.customId = texture.customId
            //set scale and position
            sprite.scale.set(1.5)
            sprite.x = 10
            sprite.y = 10
            this.spritesArray.push(sprite)
        })
        console.log("team on his back do: ", this.spritesArray)
        //add first one to the pixi canvas for this section
        this.pixiApp.stage.addChild(this.spritesArray[this.spritesArrayIndex])
    }

    initSectionDom = () => {
        this.container = document.createElement('div')
        this.container.classList.add('character-part-content-section')
        if(!this.selected){this.container.classList.add('hidden')}
        this.container.id = `${this.subSectionTitle}-container`

        this.subSectionHeader = document.createElement('h5')
        this.subSectionHeader.textContent = this.subSectionTitle

        this.container.append(this.subSectionTitle)
        this.parentContainer.append(this.container)

        this.selectContainer = document.createElement("div")
        this.selectContainer.classList.add("character-part-select-container")
        this.leftArrow = new Image()
        this.leftArrow.src = ArrowLeft
        this.leftArrow.classList.add("nav-arrow")
        this.rightArrow = new Image()
        this.rightArrow.src = ArrowRight
        this.rightArrow.classList.add("nav-arrow")

        this.leftArrow.addEventListener("click", () => {
            this.handleLeftArrowClick()
            this.buildSprite()
        })
        this.rightArrow.addEventListener("click", () => {
            this.handleRightArrowClick()
            this.buildSprite()
        })
        this.selectContainer.append(this.leftArrow, this.pixiApp.canvas, this.rightArrow)        
        this.container.append(this.selectContainer)
    }

    initColorPicker = () => {
        //init's THIS sub section's color picker
        const appDiv = document.querySelector('#app')

        this.colorPickerContainer = document.createElement('div')
        this.colorPickerContainer.id = `${this.subSectionTitle}-color-select-container`
        this.colorPickerContainer.classList.add('color-select-container')
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
        //initColorCanvas inits the canvas's hsl square
        this.initColorCanvas()
        
        //init color preview section
        this.colorPreviewContainer = document.createElement('div')
        this.colorPreviewContainer.id = 'color-preview-container'
        //init 3 columns to contain all the color presets/swatches
        //each column contains 6 swatches
        for(let i = 1; i <= 3; i++){
            this[`colorPreviewColumn${i}`] = document.createElement('div')
            this[`colorPreviewColumn${i}`].id=`color-preview-column-${i}`
            this[`colorPreviewColumn${i}`].classList.add('color-preview-column')
            this.colorPreviewContainer.append(this[`colorPreviewColumn${i}`])

            //init each column with 6 colors
            const numberOfPreviewsPerColumn = 6
            for(let j = 0; j < numberOfPreviewsPerColumn; j++){
                this[`colorSwatch${j}`] = document.createElement('div')
                this[`colorSwatch${j}`].id = `color-swatch-${j}`
                this[`colorSwatch${j}`].classList.add('color-swatch')
                //set the custom data-color attribute. the value of this
                //will correspond to one of the swatch color values
                //init this.presetColorsArray
                this[`colorSwatch${j}`].setAttribute('data-color', `${this.presetColorsArray[i*j]}`)
                // console.log(this[`colorSwatch${j}`].dataset.color)
                this[`colorSwatch${j}`].style.backgroundColor = this[`colorSwatch${j}`].dataset.color
                this[`colorPreviewColumn${i}`].append(this[`colorSwatch${j}`])
            }
        }

        this.colorTitleContainer.append(this.colorPickerTitle)
        this.colorContentContainer.append(this.colorCanvas)
        this.colorPickerContainer.append(this.colorTitleContainer, this.colorContentContainer, this.colorPreviewContainer)
        this.container.append(this.colorPickerContainer)
    }

    initPresetColorsArray = () => {
        for (let h = 0; h < 360; h += 20) {
            this.presetColorsArray.push(`hsl(${h}, 100%, 50%)`);
        }
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

    handleLeftArrowClick = () => {
        //remove the current sprite
        this.pixiApp.stage.removeChild(this.spritesArray[this.spritesArrayIndex])
        //if index is 0, reset index to last one in array
        this.spritesArrayIndex == 0 ? this.spritesArrayIndex = this.spritesArray.length - 1 : this.spritesArrayIndex--
        this.pixiApp.stage.addChild(this.spritesArray[this.spritesArrayIndex])
    }

    handleRightArrowClick = () => {
        this.pixiApp.stage.removeChild(this.spritesArray[this.spritesArrayIndex])
        this.spritesArrayIndex == (this.spritesArray.length - 1)
        ? this.spritesArrayIndex = 0
        : this.spritesArrayIndex ++
        this.pixiApp.stage.addChild(this.spritesArray[this.spritesArrayIndex])
    }

    getActiveTexture = () => {
        return this.spritesArray[this.spritesArrayIndex]
    }
}

class HairSection extends CharacterPartSubSection{
    constructor(subSectionTitle, parentContainer, initAsSelected, texturesArray, buildSprite){
        super(subSectionTitle, parentContainer, initAsSelected, texturesArray, buildSprite)
    }
}

class HeadSection extends CharacterPartSubSection{
    constructor(subSectionTitle, parentContainer, initAsSelected, texturesArray, buildSprite){
        super(subSectionTitle, parentContainer, initAsSelected, texturesArray, buildSprite)
    }
}

class TorsoSection extends CharacterPartSubSection{
    constructor(subSectionTitle, parentContainer, initAsSelected, texturesArray, buildSprite){
        super(subSectionTitle, parentContainer, initAsSelected, texturesArray, buildSprite)
    }
}

class LegsSection extends CharacterPartSubSection{
    constructor(subSectionTitle, parentContainer, initAsSelected, texturesArray, buildSprite){
        super(subSectionTitle, parentContainer, initAsSelected, texturesArray, buildSprite)
    }
}