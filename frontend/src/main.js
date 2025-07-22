import { CharacterPartSelect, initTitle, initCanvas, initNameSelection, initSettingsSection } from './domStuff'
import './style.css'

initTitle()
await initCanvas()
initNameSelection()
initSettingsSection()
const characerPartSection = new CharacterPartSelect()
// initColorPickerSection()