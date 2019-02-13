// import {Message} from "./message"

export class Message {
    constructor(public sender?: string, public time?: string, public content: string = 'فایل', public likes: string = '0', public date?: string, public id?: number) { }
}

function collectMsgObjects(): Message[] {
    const msgs = document.getElementsByClassName("message");
    let msgObjs: Message[] = [], j = 0;
    for (let msg of <any>msgs) {
        let result = buildMsgObject(msg as HTMLElement)
        if (result != null) {
            result.id = j++;
            msgObjs.push(result);
        }
    }
    return msgObjs;
}

function buildMsgObject(msg: HTMLElement) {
    if (!msg.classList.contains("message--loading")) {
        let sender, content, time, likes;

        const senderEls = msg.getElementsByClassName('message__sender__name');
        if (senderEls.length > 0)
            sender = (senderEls[0] as HTMLElement).innerText;

        const timeEls = msg.getElementsByClassName('message__timestamp');
        if (timeEls.length > 0)
            time = (timeEls[0] as HTMLElement).innerText;

        const contentEls = msg.getElementsByClassName('message__content');
        if (contentEls.length > 0)
            content = (contentEls[0] as HTMLElement).innerText;

        if (msg.getElementsByClassName('counter').length > 0)
            likes = (msg.getElementsByClassName('counter')[0] as HTMLElement).innerText;
        return new Message(sender, time, content, likes, findDate(msg));
    }
}

function findDate(msg: HTMLElement): string {
    if (msg.previousElementSibling == null)
        return '';
    else if (msg.previousElementSibling.classList.contains('date-divider'))
        return (msg.previousElementSibling as HTMLElement).innerText;
    else {
        return findDate(msg.previousElementSibling as HTMLElement);
    }
}

function prepare_elastic_ingest() {
    let msgObjs = collectMsgObjects();
    let elastic_input: string = '';
    for (let msgObj of msgObjs) {
        elastic_input += `{ "index" : { "_index" : "bale", "_type" : "_doc", "_id" : "${msgObj.id}" } }
${JSON.stringify(msgObj)}\n`
    }
    return elastic_input;
}