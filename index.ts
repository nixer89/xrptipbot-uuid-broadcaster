import * as advertiser from './BLEadvertise';
import * as discoverer from './BLEdiscover';

function start() {
    advertiser.startAdvertise();
    discoverer.startDiscovery();
}

start();