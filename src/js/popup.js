let bg = chrome.extension.getBackgroundPage()
if (bg) {
    if (bg.flags.status === 0) {
        $('#btn').html('打开')
    } else {
        $('#btn').html('关闭')
    }
    $('#btn').click(() => {
        console.log(bg)
        if (bg.flags.status === 0) {
            bg.flags.status = 1
            bg.sendMsg()
            $('#btn').html('关闭')
        } else {
            bg.flags.status = 0
            bg.sendMsg()
            $('#btn').html('打开')
        }
        console.log(bg.flags)
    })
    $('#reload').click(() => {
        $('#btn').html('打开')
        bg.reloadTab()
    })
}