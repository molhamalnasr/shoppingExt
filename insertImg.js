var getImgUrl = chrome.runtime.getURL(`imgs/${imgId}.png`);
document.getElementById('resizable').innerHTML = `<img src="${getImgUrl}">`;