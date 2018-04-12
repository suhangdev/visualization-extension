var flags = {
    status: 0
}

var tabId = null
function sendMsg() {
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //     chrome.tabs.sendMessage(tabs[0].id, flags)
    // });
    console.log(tabId)
    chrome.tabs.sendMessage(tabId, flags)
}
function reloadTab() {
    chrome.tabs.reload()
    flags.status = 0
    chrome.tabs.sendMessage(tabId, flags)
}
chrome.tabs.onActivated.addListener(function (tabs) {
    tabId = tabs.tabId
    flags.status = 0
    chrome.tabs.sendMessage(tabId, flags)
})