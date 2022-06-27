import path from "path";

require("dotenv").config({ path: path.join(__dirname, "..","..", "..", ".env") });

import { Request, Response,   NextFunction } from "express";

const { BlobServiceClient } = require('@azure/storage-blob');

import { CustomError } from "../../utils/CustomError";


export const listDiretories = async (req: Request, res: Response, next:NextFunction) => {
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

            let directories: any[]= []
            let blobs = containerClient.listBlobsByHierarchy("/", { prefix: "archive/processed/" }); 
            for await (const blob of blobs) {
              directories.push(blob)
              // console.log(blob)
            }
          
            return res.status(201).json({message:'success',directories  });
        
    } catch (err) {
      const customError = new CustomError(
        "Can't list archives blobs",
        500,
        err,
      );
      return next(customError);
    }
};
