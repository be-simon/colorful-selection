const colorSet = ["#000000", "#ED8975", "#F2D096", "#8FB9AA", "#304D63", "#D2D8FB"]
let defaultColor = colorSet[1]

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({"colorSet": colorSet})
  chrome.storage.sync.set({"selectedColor": defaultColor})
})