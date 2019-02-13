"use strict";
// import {Message} from "./message"
exports.__esModule = true;
var Message = /** @class */ (function () {
    function Message(sender, time, content, likes, date, id) {
        if (content === void 0) { content = 'فایل'; }
        if (likes === void 0) { likes = '0'; }
        this.sender = sender;
        this.time = time;
        this.content = content;
        this.likes = likes;
        this.date = date;
        this.id = id;
    }
    return Message;
}());
exports.Message = Message;
function collectMsgObjects() {
    var msgs = document.getElementsByClassName("message");
    var msgObjs = [], j = 0;
    for (var _i = 0, _a = msgs; _i < _a.length; _i++) {
        var msg = _a[_i];
        var result = buildMsgObject(msg);
        if (result != null) {
            result.id = j++;
            msgObjs.push(result);
        }
    }
    return msgObjs;
}
function buildMsgObject(msg) {
    if (!msg.classList.contains("message--loading")) {
        var sender = void 0, content = void 0, time = void 0, likes = void 0;
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
        return new Message(sender, time, content, likes, findDate(msg));
    }
}
function findDate(msg) {
    if (msg.previousElementSibling == null)
        return '';
    else if (msg.previousElementSibling.classList.contains('date-divider'))
        return msg.previousElementSibling.innerText;
    else {
        return findDate(msg.previousElementSibling);
    }
}
function prepare_elastic_ingest() {
    var msgObjs = collectMsgObjects();
    var elastic_input = '';
    for (var _i = 0, msgObjs_1 = msgObjs; _i < msgObjs_1.length; _i++) {
        var msgObj = msgObjs_1[_i];
        elastic_input += "{ \"index\" : { \"_index\" : \"bale\", \"_type\" : \"_doc\", \"_id\" : \"" + msgObj.id + "\" } }\n" + JSON.stringify(msgObj) + "\n";
    }
    return elastic_input;
}
