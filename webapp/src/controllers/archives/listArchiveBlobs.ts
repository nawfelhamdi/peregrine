import path from "path";

require("dotenv").config({ path: path.join(__dirname, "..","..", "..", ".env") });

import { Request, Response,   NextFunction } from "express";

const { BlobServiceClient } = require('@azure/storage-blob');

import { CustomError } from "../../utils/CustomError";


export const listArchiveBlobs = async (req: Request, res: Response, next:NextFunction) => {
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
            let result: any[]= []
            let blobs = containerClient.listBlobsFlat({ prefix: `${req.query.prefix}` }); 
            for await (const blob of blobs) {
              const item = {
                fileName: blob.name.split('/').pop(),
                projectId: blob.name.split('/')[blob.name.split('/').length - 2],
                createdOn: blob.properties.createdOn,
                lastModified: blob.properties.lastModified,
                blobName: blob.name

              }
              result.push(item)
              // console.log(blob)
            }
          
            return res.status(201).json({message:'success',result  });
        
    } catch (err) {
      const customError = new CustomError(
        "Can't list input files blobs",
        500,
        err,
      );
      return next(customError);
    }
};
