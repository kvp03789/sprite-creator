import './settings'
import assetManifest from './assetManifest'  
import * as PIXI from 'pixi.js'
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './settings'

export class Application{
    constructor(){
        this.app = new PIXI.Application()
        this.ticker = new PIXI.Ticker()
        this.app.stage.label = "main_stage"
        this.width = CANVAS_WIDTH
        this.height = CANVAS_HEIGHT

        //this is for pixi chrome dev tool
        globalThis.__PIXI_APP__ = this.app
    }

    init = async () => {
        console.log('pixi app initing....')
        await this.app.init({width: this.width, height: this.height, preference: 'webgl'})
        //load assets from manifest
        await PIXI.Assets.init({ manifest: assetManifest })
        
        const appDiv = document.querySelector('#app')
        const canvasDiv = document.createElement('div')
        canvasDiv.id = 'canvas-div'
        canvasDiv.classList.add('grid-section')
        this.app.canvas.id="preview-canvas"

        canvasDiv.append(this.app.canvas)
        appDiv.append(canvasDiv)

        this.app.ticker.add(this.run)
    }

    run = () => {
        
    }
}

class CustomSprite extends PIXI.AnimatedSprite{

}