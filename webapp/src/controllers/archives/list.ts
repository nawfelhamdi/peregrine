import path from "path";

require("dotenv").config({ path: path.join(__dirname, "..","..", "..", ".env") });

import { Request, Response,   NextFunction } from "express";

const { BlobServiceClient } = require('@azure/storage-blob');

import { CustomError } from "../../utils/CustomError";


export const list = async (req: Request, res: Response, next:NextFunction) => {
    try {
      
        const AZURE_STORAGE_CONNECTION_STRING = 
        process.env.AZURE_STORAGE_CONNECTION_STRING;
          if (!AZURE_STORAGE_CONNECTION_STRING) {
            throw Error('Azure Storage Connection string not found');
          }
        const blobServiceClient = BlobServiceClient.fromConnectionString(
          AZURE_STORAGE_CONNECTION_STRING
        );
        const containerName = 'gmm';
        const containerClient =  blobServiceClient.getContainerClient(containerName);
        
            let i = 1;
            let files: any[]= []
            let blobs = containerClient.listBlobsFlat({ prefix: "archive/processed/1231/" });
            for await (const blob of blobs) {
              files.push(blob)
            }
          
            return res.status(201).json({message:'success',files  });
        
    } catch (err) {
      const customError = new CustomError(
        "Can't list archives blobs",
        500,
        err,
      );
      return next(customError);
    }
};
