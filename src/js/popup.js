let bg = chrome.extension.getBackgroundPage();
if (bg) {
    if (bg.flags.status === 'cloud') {
        $('#cloud').css({'background': '#fa5050'});
    } else if (bg.flags.status === 'chart') {
        $('#chart').css({'background': '#fa5050'});
    }
    $('#cloud').click(() => {
        if (bg.flags.status === 'cloud') {
            $('#cloud').css({'background': '#409EFF'});
            bg.reloadTab()
        } else {
            bg.flags.status = 'cloud';
            $('#cloud').css({'background': '#fa5050'});
            $('#chart').css({'background': '#409EFF'});
            bg.sendMsg();
        }
    });
    $('#chart').click(() => {
        if (bg.flags.status === 'chart') {
            $('#chart').css({'background': '#409EFF'});
            bg.reloadTab()
        } else {
            bg.flags.status = 'chart';
            $('#chart').css({'background': '#fa5050'});
            $('#cloud').css({'background': '#409EFF'});
            bg.sendMsg();
        }
    })
}