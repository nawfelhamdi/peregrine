import { saveAs } from 'file-saver';

const { BlobServiceClient } = require('@azure/storage-blob');

const useDownload = (container) => {
  const account = process.env.REACT_APP_ACCOUNT;
  const sas = process.env.REACT_APP_SAS;
  console.log('container' + container);

  const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net${sas}`
  );
  async function download(blobName, fileName) {
    const containerClient = blobServiceClient.getContainerClient(container);
    const blobClient = containerClient.getBlobClient(blobName);
    const downloadBlockBlobResponse = await blobClient.download();
    const downloaded = await blobToString(
      await downloadBlockBlobResponse.blobBody
    );
    var file = new File([downloaded], `${fileName}`, {
      type: 'application/octet-stream',
    });
    saveAs(file);
    async function blobToString(blob) {
      const fileReader = new FileReader();
      return new Promise((resolve, reject) => {
        fileReader.onloadend = (ev) => {
          resolve(ev.target.result);
        };
        fileReader.onerror = reject;
        fileReader.readAsText(blob);
      });
    }
  }

  return { download };
};

export default useDownload;
