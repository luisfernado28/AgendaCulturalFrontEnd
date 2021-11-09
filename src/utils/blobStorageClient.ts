import { BlobServiceClient } from "@azure/storage-blob";

let blobConnectionString: string;

if (process.env.REACT_APP_Blob_API !== undefined) {
    blobConnectionString = `${process.env.REACT_APP_Blob_API}`
}


//TODO code for blob containers
//getImage();
async function uploadImage(file: File) {
    //Info strings
    const account = process.env.REACT_APP_STORAGERESOURCENAME;
    const sas = process.env.REACT_APP_STORAGESASTOKEN;
    const containerName = "eventsimages";
    const blobName = "cat.jpg";

    //services 
    const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net?${sas}`);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    //const blobClient = containerClient.getBlobClient(blobName);

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