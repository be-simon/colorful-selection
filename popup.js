chrome.storage.sync.get("colorSet", ({colorSet}) => {
  setColorList(colorSet)
})

function setColorList(colors) {
  const colorContainer = document.getElementsByClassName("color_container")[0]
  for (let i = 0; i < colors.length; i++) {
    const colorDiv = document.createElement('div')
    
    colorDiv.classList.add('color_div')
    colorDiv.style.backgroundColor = colors[i]
    
    colorDiv.addEventListener("click", async () => {
      await chrome.storage.sync.set({"selectedColor": colors[i]})
      
      const req = {
        "message": "change_color",
        "color": colors[i]
      }
      const [tab] = await chrome.tabs.query({active: true, currentWindow: true})
      chrome.tabs.sendMessage(tab.id, req)
    })
    
    colorContainer.appendChild(colorDiv)
  } 
}