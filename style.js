function insertColorRule(selector, bgColor, color) { 
  let styleSheet, styleElement
  const styleSheetList = document.styleSheets
  
  if (styleSheetList.length) { // 기존 스타일이 있는 경우
    styleSheet = styleSheetList[styleSheetList.length-1]
  } else {
    styleElement = document.createElement('style')
    styleSheet = styleElement.sheet  
  }
  
  const cssText = `{background: ${bgColor}; color:${color}}`
  styleSheet.insertRule(selector + cssText, styleSheet.cssRules.length)
  
  if (!document.styleSheets.length) {
    styleElement.sheet = styleSheet
    document.head.appendChild(styleElement)
  }
}

export {insertColorRule}