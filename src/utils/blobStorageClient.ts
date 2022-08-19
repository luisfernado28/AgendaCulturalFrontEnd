/*
 * File: blobStorageClient.ts
 * Project: Agenda Cultural Front End React
 * Author: Luis Fernando Choque (luisfernandochoquea@gmail.com)
 * -----
 * Copyright 2021 - 2022 Universidad Privada Boliviana La Paz, Luis Fernando Choque Arana
 */
import { BlobServiceClient } from "@azure/storage-blob";


//TODO code for blob containers
//getImage();
async function uploadImage(file: File) {
    //Info strings
    const account = process.env.REACT_APP_STORAGERESOURCENAME;
    const sas = process.env.REACT_APP_STORAGESASTOKEN;
    const containerName = "eventsimages";

    //services 
    const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net?${sas}`);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    
    // create blobClient for container
    const blobClient = containerClient.getBlockBlobClient(file.name);

    // set mimetype as determined from browser with file upload control
    const options = { blobHTTPHeaders: { blobContentType: file.type } };

    // upload file
    await blobClient.uploadData(file, options);


}

export async function postImage(file:File): Promise<any> {
    try {

        await uploadImage(file);
        return file.name;
    } catch (error) {
        throw new Error();
    }
}