(async function (){
  const src = chrome.runtime.getURL('storage.js'); 
  const {storageGetSelected} = await import(src);

  const currentColor = '#ffffff'
  const currentBackgroundColor = await storageGetSelected()
  
  setSelectionBackground(currentBackgroundColor, currentColor)  
  chrome.runtime.onMessage.addListener(req => {
    if (req.message === 'change_color')
      setSelectionBackground(req.color, currentColor)
  })
})()
  

function setSelectionBackground(backgroundColor, color) {
  let styleSheet, styleElement
  const styleSheetList = document.styleSheets

  if (styleSheetList.length) {
    styleSheet = styleSheetList[styleSheetList.length-1]
  } else {
    styleElement = document.createElement('style')
    styleSheet = styleElement.sheet  
  }

  const selector = '::selection'
  const cssText = `{background: ${backgroundColor}; color:${color}}`
  styleSheet.insertRule(selector + cssText, styleSheet.cssRules.length)

  if (!document.styleSheets.length) {
    styleElement.sheet = styleSheet
    document.head.appendChild(styleElement)
  }
}
