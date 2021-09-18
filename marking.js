function markSelection () {
  const selection = window.getSelection()
  const range = selection.rangeCount ? selection.getRangeAt(0) : null
  
  sc = range.startContainer
  ec = range.endContainer

  if (sc === ec) {
    const newNode = document.createElement('span')
    newNode.classList.add('marking')
    range.surroundContents(newNode)
  } else {
    console.log(range.cloneContents())
    const rangeNode = (function marking(parent) {
      if (parent.hasChildNodes()) {
        parent.childNodes.forEach((c) => {
          marking(c)
        })
      } else {
        const newNode = document.createElement('span')
        newNode.classList.add('marking')
        newNode.appendChild(parent.cloneNode())
        parent.parentNode.replaceChild(newNode, parent)
      }

      return parent
    })(range.extractContents())
    range.insertNode(rangeNode)
  }

  let styleSheet, styleElement
  const styleSheetList = document.styleSheets

  if (styleSheetList.length) {
    styleSheet = styleSheetList[styleSheetList.length-1]
  } else {
    styleElement = document.createElement('style')
    styleSheet = styleElement.sheet  
  }

  const backgroundColor = '#000000'
  const color = '#ffffff'
  const selector = '.marking'
  const cssText = `{background: ${backgroundColor}; color:${color}}`
  styleSheet.insertRule(selector + cssText, styleSheet.cssRules.length)

  if (!document.styleSheets.length) {
    styleElement.sheet = styleSheet
    document.head.appendChild(styleElement)
  }

  selection.removeAllRanges()
  selection.empty()

}


export {markSelection}