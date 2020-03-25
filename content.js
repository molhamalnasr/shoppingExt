(() => {
    if (sessionStorage.getItem('shoppingSes') === null) sessionStorage.setItem('shoppingSes', '1');
    const insertEl = document.createElement('div');
    insertEl.setAttribute('id', 'resizable');
    document.body.insertAdjacentElement('beforeend', insertEl);
})();

chrome.runtime.onConnect.addListener((port) => {
    port.onMessage.addListener((msg) => {
        if (msg.function === 'html') {
            let shoppingSes = sessionStorage.getItem('shoppingSes'),
                sessionStatus;
            if (sessionStatus === '0') {
                sessionStatus = false;
            } else if (sessionStatus === '1') {
                sessionStatus = true;
            }
            port.postMessage({status: sessionStatus});
        }
    });
});