import {storageGetSelected, storageGetColorSet} from './storage.js'

(async function () {
  let selectedElement = null
  const colorSet = await storageGetColorSet()
  setColorList(colorSet)

  async function setColorList(colors) {
    const colorContainer = document.getElementsByClassName("color_container")[0]
    
    let selected = await storageGetSelected()
    
    for (const c of colors) {
      const colorDiv = document.createElement('div')
      colorDiv.classList.add('color_div')
      
      const colorBtn = document.createElement('button')
      colorBtn.classList.add('color_btn')
      colorBtn.style.backgroundColor = c
      
      if (selected == c) {
        colorBtn.classList.add('selected')
        selectedElement = colorBtn
      }
      
      colorBtn.addEventListener("click", (e) => selectColorEvent(e.target, c))
      
      colorDiv.appendChild(colorBtn)
      colorContainer.appendChild(colorDiv)
    }
  }
  
  async function selectColorEvent(target, color) {
    selectedElement && selectedElement.classList.remove('selected')
    selectedElement = target
    selectedElement.classList.add('selected')
    
    chrome.storage.sync.set({"selectedColor": color})
    const req = {
      "message": "change_color",
      "color": color
    }
    const [tab] = await chrome.tabs.query({active: true, currentWindow: true})
    chrome.tabs.sendMessage(tab.id, req)
  }
  
})()