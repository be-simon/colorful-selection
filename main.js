const root = document.documentElement
let currentColor = '#000000'

chrome.storage.sync.get("defaultColor", ({defaultColor}) => {
  currentColor = defaultColor
  root.style.setProperty('--selected-color', currentColor)    
})

chrome.runtime.onMessage.addListener(req => {
  if (req.message === 'change_color') {
    currentColor = req.color
    root.style.setProperty('--selected-color', currentColor)    
  }
})
