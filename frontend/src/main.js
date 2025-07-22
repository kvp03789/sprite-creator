import { CharacterPartSelect, initTitle, initCanvas, initNameSelection, initSettingsSection, initColorPickerSection } from './domStuff'
import './style.css'

initTitle()
await initCanvas()
initNameSelection()
initSettingsSection()
const characerPartSection = new CharacterPartSelect()
initColorPickerSection()