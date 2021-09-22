(async function (){
  const storage = chrome.runtime.getURL('storage.js'); 
  const style = chrome.runtime.getURL('style.js'); 
  const {storageGetSelected} = await import(storage);
  const {insertColorRule} = await import(style);
  
  const selector = '::selection'
  const curColor = '#ffffff'
  const curbgColor = await storageGetSelected()
  
  insertColorRule(selector, curbgColor, curColor)
  chrome.runtime.onMessage.addListener(req => {
    if (req.message === 'change_color')
      insertColorRule(selector, req.color, curColor)
  })
})()