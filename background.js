import { markSelection } from "./marking.js"

const colorSet = ["#000000", "#ED8975", "#F2D096", "#8FB9AA", "#304D63", "#D2D8FB"]
let defaultColor = colorSet[1]

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({"colorSet": colorSet})
  chrome.storage.sync.set({"selectedColor": defaultColor})
})

chrome.commands.onCommand.addListener(async (c) => {
  if (c === 'marking-selection') {
    const [tab] = await chrome.tabs.query({active: true, currentWindow: true})
    
    let bgColor = '#000000'
    let color = '#ffffff'
    chrome.storage.sync.get("selectedColor", (({selectedColor}) => {
      bgColor = selectedColor
      
      chrome.scripting.executeScript({
        target: {tabId: tab.id},
        func: markSelection,
        args:[bgColor, color]
      })
    }))
  }
})