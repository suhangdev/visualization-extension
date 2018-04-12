var flags = {
    status: 0
}
function sendMsg() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, flags);
    });
}