import * as storage from 'node-persist';

export async function initStorageAndGetUUIDs(): Promise<string[]> {
    let uuids:string[];
    console.log("init storage");
    await storage.init({dir:"storage"});
    console.log("storage initialized");
    if(!(uuids = await storage.getItem("uuids"))) {
        uuids=[];
    }

    return uuids;
}

export async function saveUUID(uuid): Promise<void> {
    let uuids:string[];
    if(!(uuids = await storage.getItem("uuids"))) {
        uuids=[];
    }
    uuids.push(uuid);

    await storage.setItem('uuids', uuids);
}