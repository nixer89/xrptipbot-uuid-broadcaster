import * as noble from 'noble';
import * as util from './util';
import * as tipbot from './TipbotApi';

let tippedUsers:string[] = [];

export async function startDiscovery() {
    let uuids:string[] = await util.initStorageAndGetUUIDs();
    noble.on('stateChange', (state) => {
        if('poweredOn'===state)
            noble.startScanning();
        else
            noble.stopScanning();
    });
    
    noble.on('discover', async (peripheral) => {
        if(peripheral && peripheral.advertisement && peripheral.advertisement.localName === 'XRPTIP') {
            //THIS IS A TIPBOT ACCOUNT
            let uuidv4:string = peripheral.advertisement.serviceUuids[0];
            console.log("FOUND: " + uuidv4);
            if(uuidv4) {
                let realUUIDv4 = uuidv4.substring(0,8)+'-'+uuidv4.substring(8,12)+'-'+uuidv4.substring(12,16)+'-'+uuidv4.substring(16,20)+'-'+uuidv4.substring(20,32);

                if(realUUIDv4) {
                    let user = await tipbot.lookupUserbyUUID(realUUIDv4);
                    if(user && !user.error) {
                        let userName = user.username;
                        let network = user.network;
                        await tipbot.sendTip(network, userName, 0.5);
                    }
                }
                
            }

        }
        
    });
}
