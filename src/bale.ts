// import {Message} from "./message"

export class Message{
    constructor(public sender: string, public time: string, public content: string, public likes: string){}
}

function collectMsgObjects(): Message[]{
    const msgs= document.getElementsByClassName("message");
    let msgObjs: Message[]= [];
    for(let msg of <any>msgs){
        let result= buildMsgObject(msg as HTMLElement)
        if(result != null)
            msgObjs.push(result);
    }
    return msgObjs;
}

function buildMsgObject(msg: HTMLElement){
    if(!msg.classList.contains("message--loading")){
        let sender= '', content='', time='', likes = '0';
        
        const senderEls = msg.getElementsByClassName('message__sender__name');
        if(senderEls.length>0)
            sender= (senderEls[0] as HTMLElement).innerText;
        
        const timeEls = msg.getElementsByClassName('message__timestamp');
        if(timeEls.length>0)
            time= (timeEls[0] as HTMLElement).innerText;
        
        const contentEls = msg.getElementsByClassName('message__content');
        if(contentEls.length>0)
            content= (contentEls[0] as HTMLElement).innerText;
        
        if(msg.getElementsByClassName('counter').length > 0)
            likes= (msg.getElementsByClassName('counter')[0] as HTMLElement).innerText;
        return new Message(sender, time, content, likes);    
    }
}