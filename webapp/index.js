const { BlobServiceClient } = require('@azure/storage-blob');
// require('dotenv').config();

async function uploadBlobStorage() {
  const AZURE_STORAGE_CONNECTION_STRING =
    process.env.AZURE_STORAGE_CONNECTION_STRING;
  if (!AZURE_STORAGE_CONNECTION_STRING) {
    throw Error('Azure Storage Connection string not found');
  }

  const blobServiceClient = BlobServiceClient.fromConnectionString(
    AZURE_STORAGE_CONNECTION_STRING
  );

  const containerName = 'web';
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobName = 'trigger/data_preparation/0.txt';

  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const data = 'empty';
  const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
  console.log(
    'Blob was uploaded successfully. requestId: ',
    uploadBlobResponse.requestId
  );
}

uploadBlobStorage(0)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
