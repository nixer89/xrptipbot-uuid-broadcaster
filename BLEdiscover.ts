import * as noble from 'noble';

import * as uuid from 'uuid';

let foundUUIDs:string[] = [];

export function startDiscovery() {
    noble.on('stateChange', (state) => {
        if('poweredOn'===state)
            noble.startScanning();
        else
            noble.stopScanning();
    });
    
    noble.on('discover', (peripheral) => {
        if(peripheral && peripheral.advertisement && peripheral.advertisement.localName === 'XRPTIP') {
            //THIS IS A TIPBOT ACCOUNT
            let uuidv4:string = peripheral.advertisement.serviceUuids[0];
            console.log("FOUND: " + uuidv4);
            if(uuidv4) {

            }

        }
        
    });
}
