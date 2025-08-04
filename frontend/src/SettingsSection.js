export default class SettingsSection{
    constructor(){

    }

    initDom = () => {
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
        this.gridSizeSelect = document.createElement('select')
        this.gridSizeSelect.id = 'grid-size-select'
        this.gridSizeSelect.name = 'grid-size-select'
        const option1 = document.createElement('option')
        option1.textContent = '32px'
        option1.value = 32
        const option2 = document.createElement('option')
        option2.textContent = '48px'
        option2.value = 48
        this.gridSizeSelect.append(option1, option2)

        //append everything to correct divs
        sectionTitleContainer.append(settingsSectionTitle)
        sectionContentsContainer.append(gridSizeSelectLabel, this.gridSizeSelect)
        settingsContainer.append(sectionTitleContainer, sectionContentsContainer)
        appDiv.append(settingsContainer)
    }
}