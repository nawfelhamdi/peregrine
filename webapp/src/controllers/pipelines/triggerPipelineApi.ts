import path from "path";
require("dotenv").config({ path: path.join(__dirname, "..","..", "..", ".env") });

import { Request, Response,   NextFunction } from "express";
import { CustomError } from "../../utils/CustomError";

const { BlobServiceClient } = require('@azure/storage-blob');

export const triggerPipelineApi = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const AZURE_STORAGE_CONNECTION_STRING = 
        process.env.AZURE_STORAGE_CONNECTION_STRING;
          if (!AZURE_STORAGE_CONNECTION_STRING) {
            throw Error('Azure Storage Connection string not found');
          }
        
        const blobServiceClient = BlobServiceClient.fromConnectionString(
          AZURE_STORAGE_CONNECTION_STRING
        );
        const {projectId} =  req.body;
        const containerName = 'web';
        const containerClient =  blobServiceClient.getContainerClient(containerName);
        const blobName = `trigger/api_call/${projectId}.txt`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        const data = '';
          const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
          
         return res.status(201).json({message:'Blob was uploaded successfully : web/trigger/api_call' });
        
    } catch (err) {
        const customError = new CustomError(
            "Can't upload blob",
            500,
            err,
          );
          return next(customError);
    }
};
