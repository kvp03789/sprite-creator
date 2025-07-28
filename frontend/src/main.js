import { Application } from './spriteRender'
import { CharacterPartSelect, initTitle, initNameSelection, initSettingsSection } from './domStuff'
import './style.css'



const pixiApplication = new Application()
await pixiApplication.init()
initTitle()
initNameSelection()
initSettingsSection()
const characerPartSection = new CharacterPartSelect()
// initColorPickerSection()