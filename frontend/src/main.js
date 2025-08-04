import { Application } from './Application'
import { initTitle } from './domStuff'
import './style.css'

//init the old windows-style toolbar at the top of the app
initTitle()
//init the actual app - the pixi.js app and the canvas
const pixiApplication = new Application()
await pixiApplication.init()
//init each section of the application
pixiApplication.NameSeciton.initDom()
pixiApplication.SettingsSection.initDom()
pixiApplication.CharacterPartSelect.initDom()
