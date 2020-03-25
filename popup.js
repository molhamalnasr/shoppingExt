function connect() {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        const port = chrome.tabs.connect(tabs[0].id);
        port.postMessage({function: 'html'});
        port.onMessage.addListener((response) => {
            let sessionStatus = response.status;
            if (sessionStatus) {
                document.getElementById('shoeSwitchKey').checked = sessionStatus;
                dropdownVisibility(sessionStatus);
            } else {
                document.getElementById('shoeSwitchKey').checked = sessionStatus;
                dropdownVisibility(sessionStatus);
            }
        })
    })
}

window.addEventListener('load', (event) => {
    chrome.tabs.query({active: true, currentWindow: true}, function (activeTabs) {
        chrome.tabs.executeScript(activeTabs[0].id, {file: 'content.bundle.js'}, () => {
            connect();
        });
    });
});

document.getElementById('shoeSwitchKey').addEventListener('change', function () {
    let getCheckBox = this.checked;
    dropdownVisibility(getCheckBox);
    chrome.tabs.query({active: true, currentWindow: true}, function (activeTabs) {
        chrome.tabs.executeScript(activeTabs[0].id, {
            code: `var status = ${getCheckBox}`
        }, function () {
            chrome.tabs.executeScript(activeTabs[0].id, {file: 'sessionStorage.js'});
        });
    });
});

document.getElementById('cusDropdown').addEventListener('click', ev => {
    if (ev.target.className === 'selImg') {
        var clickedImgId = ev.target.id;
        chrome.tabs.query({active: true, currentWindow: true}, function (activeTabs) {
            chrome.tabs.executeScript(activeTabs[0].id, {
                code: `var imgId = ${clickedImgId}`
            }, function () {
                chrome.tabs.executeScript(activeTabs[0].id, {file: 'insertImg.js'});
            });
        });
    }
});

function dropdownVisibility(checked) {
    const getDrobdown = document.getElementById('cusDropdown');
    if (checked === true) {
        getDrobdown.style.display = 'block';
    } else {
        getDrobdown.style.display = 'none';
    }
}