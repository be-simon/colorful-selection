async function markSelection (bgColor, color) {
  const style = chrome.runtime.getURL('style.js')
  const {insertColorRule} = await import(style)

  const className = `marking_${bgColor.slice(1)}`
  const selection = window.getSelection()
  const range = selection.rangeCount ? selection.getRangeAt(0) : null
  
  sc = range.startContainer
  ec = range.endContainer

  if (sc === ec) {
    const newNode = document.createElement('span')
    newNode.classList.add(className)
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
        newNode.classList.add(className)
        newNode.appendChild(parent.cloneNode())
        parent.parentNode.replaceChild(newNode, parent)
      }

      return parent
    })(range.extractContents())
    range.insertNode(rangeNode)
  }

  insertColorRule('.'+className, bgColor, color)

  selection.removeAllRanges()
  selection.empty()
}


export {markSelection}