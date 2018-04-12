chrome.runtime.onMessage.addListener(
    function(req, sender, sendResponse) {
        console.log(req)
        if(req.status){
                $("body").find("*").mouseenter(function(){
                    event.stopPropagation();
                    $(this).css({"box-shadow":"0 0 5px 1px #3AB2FF"});
                    $(this).one("click", function(){
                        event.stopPropagation();
                        $(this).hide();
                        return false;
                    })
                });
                $("body").find("*").mouseout(function(){
                    event.stopPropagation();
                    $(this).css("box-shadow", "none");
                })
        } else {
            $("body").find("*").unbind("mouseenter").unbind("mouseout").unbind("click");
        }
    });