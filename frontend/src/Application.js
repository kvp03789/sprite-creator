import './settings'
import assetManifest from './assetManifest'  
import * as PIXI from 'pixi.js'
import { CANVAS_HEIGHT, CANVAS_WIDTH, ANIMATION_SPEED, SPRITE_SCALE } from './settings'
import parsedJson from '../json/parsedJson'
import NameSection from './NameSection'
import SettingsSection from './SettingsSection'
import CharacterPartSelect from './CharacterPartSelect'

export class Application{
    constructor(){
        this.app = new PIXI.Application()
        this.ticker = new PIXI.Ticker()
        this.app.stage.label = "main_stage"
        this.width = CANVAS_WIDTH
        this.height = CANVAS_HEIGHT

        //during init texturesObject is loaded with texture files from assetManifest.js
        //that are parsed into Animated Sprites and held in parsedSprites object 
        this.texturesObject = {
            hair: [],
            eyes: [],
            mouth: [],
            head: [],
            torso: [],
            legs: []
        }

        //this holds the loaded, final sprites
        this.parsedSprites = {
            head: [],
            hair: [],
            eyes: [],
            mouth: [],
            
            torso: [],
            legs: []
        }

        //this is for pixi chrome dev tool
        globalThis.__PIXI_APP__ = this.app
    }

    init = async () => {
        console.log('pixi app initing....')
        await this.app.init({width: this.width, height: this.height, preference: 'webgl'})

        //load spritesheet assets from manifest
        await PIXI.Assets.init({ manifest: assetManifest })
        //init the assets object that holds all the spritesheets
        for(let key in this.texturesObject){
            this[`${key}Bundle`] = await PIXI.Assets.loadBundle(key)
            const regex = /^[a-zA-Z0-9]+$/
            //clean up the bundle
            for(let jey in this[`${key}Bundle`]){
                if(jey.toString().match(regex)){
                    //assign a customId value that is same as alias in assetManifest
                    this[`${key}Bundle`][jey].customId = jey
                    this.texturesObject[key].push(this[`${key}Bundle`][jey])
                }
            }
        }

        await this.spriteSetup()

        //set up the actual canvas elements and its container
        const appDiv = document.querySelector('#app')
        const canvasDiv = document.createElement('div')
        canvasDiv.id = 'canvas-div'
        canvasDiv.classList.add('grid-section')
        this.app.canvas.id="preview-canvas"

        canvasDiv.append(this.app.canvas)
        appDiv.append(canvasDiv)

        //init separate part sections
        this.initPartSections()

        //add sprites to stage
        this.initStage()
    }

    initPartSections = () => {
        //init separate part sections
        this.NameSeciton = new NameSection()
        this.SettingsSection = new SettingsSection()
        this.CharacterPartSelect = new CharacterPartSelect(this.parsedSprites, this.texturesObject, this.buildSprite)
    }

    //init all spritesheets for each body part, adding each texture to parsedSprites object
    spriteSetup = async () => {
        console.log("asdfasd", this.texturesObject)
        for(let part in this.texturesObject){
            this.texturesObject[part].forEach(async (spritesheetTexture) => {
                const spriteData = parsedJson[part][spritesheetTexture.customId]
                const generateAnimations = spriteData.generateAnimations.bind(spriteData);
                // generateAnimations(this.texturesObject[part][textureKey]);
                generateAnimations(spritesheetTexture)                
                const spritesheet = new PIXI.Spritesheet(spritesheetTexture, spriteData)
                const parsedSpritesheet= await spritesheet.parse()
                const newAnimtedSprite = new PIXI.AnimatedSprite(spritesheet.animations.idle_down)
                newAnimtedSprite.anchor.set(.5, .5)
                const x = this.app.canvas.width / 2
                const y = this.app.canvas.height / 2
                newAnimtedSprite.position.set(x, y)
                newAnimtedSprite.scale.set(1.5)
                this.parsedSprites[part].push(newAnimtedSprite)  
            })
            
        }  
    }

    initStage = () => {
        for(let part in this.parsedSprites){
            const sprite = this.parsedSprites[part][0]
            sprite.animationSpeed = ANIMATION_SPEED
            sprite.play()
            this.app.stage.addChild(sprite)
        }
    }

    buildSprite = () => {
        //remove current sprite
        this.app.stage.removeChildren()
        //stop the ticker
        this.ticker.stop()
        this.CharacterPartSelect.sections.forEach((section) => {
            const sectionKey = section.subSectionTitle
            const newSprite = this.parsedSprites[sectionKey][section.spritesArrayIndex]
            newSprite.scale.set(SPRITE_SCALE)
            newSprite.animationSpeed = ANIMATION_SPEED
            
            //set sprite zIndex
            let zIndex
            switch (sectionKey) {
                case 'hair':
                    zIndex = 5   
                    break;
                case 'head':
                    zIndex = 4  
                    break;
                case 'eyes':
                    zIndex = 3  
                    break;
                case 'mouth':
                    zIndex = 3  
                    break;
                case 'torso':
                    zIndex = 2  
                    break;
                case 'legs':
                    zIndex = 1  
                    break;
                default:
                    return
                }
            newSprite.zIndex = zIndex    
            this.app.stage.addChild(newSprite)
        })
        //re start the ticker
        this.app.stage.children.forEach(child => child.play())
    }

    run = () => {
        
    }
}
