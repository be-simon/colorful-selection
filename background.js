const colorSet = ["#000000", "#ffffff", "#ED8975", "#F2D096", "#8FB9AA", "#304D63"]

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({"colorSet": colorSet})
  chrome.storage.sync.set({"defaultColor": colorSet[3]})
})