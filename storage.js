function storageGetSelected () {
  return new Promise ((resolve, reject) => {
    chrome.storage.sync.get("selectedColor", ({selectedColor}) => {
      const err = chrome.runtime.lastError
      if (err) return reject(err)

      resolve(selectedColor)
    })
  })
}

function storageGetColorSet () {
  return new Promise ((resolve, reject) => {
    chrome.storage.sync.get("colorSet", ({colorSet}) => {
      const err = chrome.runtime.lastError
      if (err) return reject(err)

      resolve(colorSet)
    })
  })
}

export {storageGetSelected, storageGetColorSet}