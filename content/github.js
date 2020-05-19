chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        var oldMessage = $("textarea[name='pull_request_review[body]']").val();
        var attr = $("textarea[name='pull_request_review[body]']");
        var brStr = "";
        if (oldMessage) {
            brStr = "\n\n";
        }
        attr.val(oldMessage + brStr + request.image);
        return true
    }
);
