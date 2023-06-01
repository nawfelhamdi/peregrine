import path from "path";

require("dotenv").config({ path: path.join(__dirname, "..","..", "..", ".env") });

import { Request, Response,   NextFunction } from "express";

const { BlobServiceClient } = require('@azure/storage-blob');

import { CustomError } from "../../utils/CustomError";


export const getArchiveFiles = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const AZURE_STORAGE_CONNECTION_STRING = 
        process.env.AZURE_STORAGE_CONNECTION_STRING;
          if (!AZURE_STORAGE_CONNECTION_STRING) {
            throw Error('Azure Storage Connection string not found');
          }
        const blobServiceClient = BlobServiceClient.fromConnectionString(
          AZURE_STORAGE_CONNECTION_STRING
        );
        const containerName = `${req.query.container}`;
        const containerClient =  blobServiceClient.getContainerClient(containerName);
            let archivefiles: any[]= []
            let blobs = containerClient.listBlobsFlat({ prefix: `archive/processed/${req.params.directoryId}` }); 
            for await (const blob of blobs) {
              const item = {
                fileName: blob.name.split('/').pop(),
                createdOn: blob.properties.createdOn,
                lastModified: blob.properties.lastModified,
                blobName: blob.name

              }
              archivefiles.push(item)
            }
          
            return res.status(201).json({message:'success',archivefiles  });
        
    } catch (err) {
      const customError = new CustomError(
        "Can't list archive files",
        500,
        err,
      );
      return next(customError);
    }
};
