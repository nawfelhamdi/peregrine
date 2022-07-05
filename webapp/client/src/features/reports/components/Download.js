import React from 'react';
import { saveAs } from 'file-saver';

const { BlobServiceClient } = require('@azure/storage-blob');

export default function Download() {
  const account = 'peregrineblob';
  const sas =
    '?sp=r&st=2022-07-03T14:21:53Z&se=2022-07-03T22:21:53Z&spr=https&sv=2021-06-08&sr=c&sig=D2SrnvpmlT6TiP1lYQ1XvzV5dar0njFz55va8GyK4fo%3D';
  const containerName = 'moody/output/1193';
  const blobName = 'lm_audits-2022-05-16T15-11-37Z.csv';

  const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net${sas}`
  );
  async function download() {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(blobName);

    const downloadBlockBlobResponse = await blobClient.download();
    const downloaded = await blobToString(
      await downloadBlockBlobResponse.blobBody
    );
    console.log('Downloaded blob content', downloaded);
    // var blob = new Blob([downloaded], { type: 'text/plain;charset=utf-8' });
    // saveAs(blob, 'demo.svg');
    var file = new File([downloaded], 'mydemo.csv', {
      type: 'application/octet-stream',
    });
    saveAs(file);

    // [Browsers only] A helper method used to convert a browser Blob into string.
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
  return (
    <div>
      <button
        onClick={download}
        className="flex items-center my-8 h-12 px-8 md:px-12 font-medium tracking-wide transition duration-200 rounded-md shadow-md text-gray-900 bg-skin-button-accent disabled:opacity-70 float-left"
      >
        Download
      </button>
    </div>
  );
}
