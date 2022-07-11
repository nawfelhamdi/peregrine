import path from "path";

require("dotenv").config({ path: path.join(__dirname, "..","..", "..", ".env") });

import { Request, Response,   NextFunction } from "express";

const { BlobServiceClient } = require('@azure/storage-blob');

import { CustomError } from "../../utils/CustomError";


export const listArchiveBlobs = async (req: Request, res: Response, next:NextFunction) => {
  // console.log(typeof(req.query.prefix))
  let test = 'undefined'
  console.log(typeof(test))
  console.log(test?'pass': 'no')
  const prefix = req.query.prefix !== undefined?`${req.query.prefix}`:'raw';
  // console.log(prefix)
    try {
        const AZURE_STORAGE_CONNECTION_STRING = 
        process.env.AZURE_STORAGE_CONNECTION_STRING;
          if (!AZURE_STORAGE_CONNECTION_STRING) {
            throw Error('Azure Storage Connection string not found');
          }
        const blobServiceClient = BlobServiceClient.fromConnectionString(
          AZURE_STORAGE_CONNECTION_STRING
        );
        const containerName = req.query.container !== undefined ?`${req.query.container}`:'gmm';
        // const prefix = req.query.prefix !== undefined?`${req.query.prefix}`:'/raw';
        const containerClient =  blobServiceClient.getContainerClient(containerName);
            let result: any[]= []
            let blobs = containerClient.listBlobsFlat({ prefix: `${prefix}` }); 
            for await (const blob of blobs) {
              const item = {
                fileName: blob.name.split('/').pop(),
                projectId: blob.name.split('/')[blob.name.split('/').length - 2],
                createdOn: blob.properties.createdOn,
                lastModified: blob.properties.lastModified,
                blobName: blob.name

              }
              result.push(item)
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
