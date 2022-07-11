import path from "path";

require("dotenv").config({ path: path.join(__dirname, "..","..", "..", ".env") });

import { Request, Response,   NextFunction } from "express";

const { BlobServiceClient } = require('@azure/storage-blob');

import { CustomError } from "../../utils/CustomError";


export const getArchives = async (req: Request, res: Response, next:NextFunction) => {
    try {
      const AZURE_STORAGE_CONNECTION_STRING = 
      process.env.AZURE_STORAGE_CONNECTION_STRING;
        if (!AZURE_STORAGE_CONNECTION_STRING) {
          throw Error('Azure Storage Connection string not found');
        }
      const blobServiceClient = BlobServiceClient.fromConnectionString(
        AZURE_STORAGE_CONNECTION_STRING
      );
      const containerName = req.query.container;
      const prefix = "archive/processed/";
      const containerClient =  blobServiceClient.getContainerClient(containerName);

          let archives: any[]= []
          let blobs = containerClient.listBlobsByHierarchy("/", { prefix  }); 
          for await (const blob of blobs) {
            let item =  {
              name : blob.name.split('/')[2]
            }
            archives.push(item)
          }
        
          return res.status(201).json({message:'success',archives  });
        
    } catch (err) {
      const customError = new CustomError(
        "Can't list archives",
        500,
        err,
      );
      return next(customError);
    }
};
