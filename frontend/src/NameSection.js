export default class NameSection{
    constructor(){

    }

    initDom = () => {
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
    this.nameInput = document.createElement('input')
    this.nameInput.type = 'text'
    this.nameInput.placeholder = "name"

    //append everything to correct divs
    sectionTitleContainer.append(nameSectionTitle)
    sectionContentsContainer.append(this.nameInput)
    nameSelectContainer.append(sectionTitleContainer, sectionContentsContainer)
    appDiv.append(nameSelectContainer)
}
}