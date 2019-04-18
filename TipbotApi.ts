import * as fetch from 'node-fetch';

export function lookupUserbyName(userName:string): Promise<any> {
    return callTipbotApi('/action:lookup/', 'POST', {'token': process.env.TIPBOT_API_KEY, 'query': userName});
}

export function lookupUserbyUUID(uuid:string): Promise<any> {
    return callTipbotApi('/action:lookup/', 'POST', {'token': process.env.TIPBOT_API_KEY, 'query': [uuid]});
}

export async function sendTip(network:string, user: string, xrp: number): Promise<any> {
    //maximum amount which can be sent at a time is 20. Use loop to send multiple payments
    if(xrp > 0 && xrp <= 20) {
        await callTipbotApi('/action:tip/', 'POST', {'token': process.env.TIPBOT_API_KEY, 'to': 'xrptipbot://'+network+'/'+user, 'amount': 20});
    } else {
        console.log("cannot send less than 0 or more than 20 xrp");
    }
}

export async function getBalance(): Promise<number> {
    let balanceResponse:any = await callTipbotApi('/action:balance/', 'POST', {'token': process.env.TIPBOT_API_KEY});
    if(balanceResponse && !balanceResponse.error)
        return balanceResponse.data.balance.XRP
    else {
        console.log("getBalance failed:")
        console.log(JSON.stringify(balanceResponse));
        return -1;
    }
}

async function callTipbotApi(path: string, method: string, body?: any) {
    try {
        let fetchResult = await fetch.default("https://www.xrptipbot.com/app/api"+path, { headers: {"Content-Type": "application/json"}, method: method, body: JSON.stringify(body)});
        if(fetchResult && fetchResult.ok)
            return fetchResult.json();
        else
            return null;
    } catch(err) {
        console.log(JSON.stringify(err));
        return null;
    }
}