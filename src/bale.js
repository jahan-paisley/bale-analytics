"use strict";
// import {Message} from "./message"
exports.__esModule = true;
var Message = /** @class */ (function () {
    function Message(sender, time, content, likes) {
        this.sender = sender;
        this.time = time;
        this.content = content;
        this.likes = likes;
    }
    return Message;
}());
exports.Message = Message;
function collectMsgObjects() {
    var msgs = document.getElementsByClassName("message");
    var msgObjs = [];
    for (var _i = 0, _a = msgs; _i < _a.length; _i++) {
        var msg = _a[_i];
        var result = buildMsgObject(msg);
        if (result != null)
            msgObjs.push(result);
    }
    return msgObjs;
}
function buildMsgObject(msg) {
    if (!msg.classList.contains("message--loading")) {
        var sender = '', content = '', time = '', likes = '0';
        var senderEls = msg.getElementsByClassName('message__sender__name');
        if (senderEls.length > 0)
            sender = senderEls[0].innerText;
        var timeEls = msg.getElementsByClassName('message__timestamp');
        if (timeEls.length > 0)
            time = timeEls[0].innerText;
        var contentEls = msg.getElementsByClassName('message__content');
        if (contentEls.length > 0)
            content = contentEls[0].innerText;
        if (msg.getElementsByClassName('counter').length > 0)
            likes = msg.getElementsByClassName('counter')[0].innerText;
        return new Message(sender, time, content, likes);
    }
}
