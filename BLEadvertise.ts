import * as bleno from 'bleno';

export function startAdvertise(): void {
    bleno.on('stateChange', function(state) {
        if('poweredOn' === state) {
            bleno.startAdvertising("XRPTIP", [process.env.TIPBOT_UUID || '8bea3b79-419f-47ca-9fdc-c21b581c90b8'], (error) => {
                console.log(error);
            });
        } else {
            bleno.stopAdvertising();
        }
    });
}