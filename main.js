let currentBackgroundColor = '#000000'
let currentColor = '#ffffff'

const styleSheet = document.styleSheets[document.styleSheets.length-1]

function setSelectionBackground(backgroundColor, color) {
  const selector = '::selection'
  const cssText = `{background: ${backgroundColor}; color:${color}}`
  styleSheet.insertRule(selector + cssText, styleSheet.cssRules.length)
}

chrome.storage.sync.get("defaultColor", ({defaultColor}) => {
  currentBackgroundColor = defaultColor
  setSelectionBackground(currentBackgroundColor, currentColor)
})

chrome.runtime.onMessage.addListener(req => {
  if (req.message === 'change_color') {
    currentBackgroundColor = req.color
    setSelectionBackground(currentBackgroundColor, currentColor)
  }
})
