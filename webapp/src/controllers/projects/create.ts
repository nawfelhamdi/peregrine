import path from "path";

require("dotenv").config({ path: path.join(__dirname, "..","..", "..", ".env") });

import { Request, Response,   NextFunction } from "express";

import { instanceToPlain } from 'class-transformer';
const { BlobServiceClient } = require('@azure/storage-blob');

import { myDataSource } from "../../config/ormconfig";
import { Project } from "../../entities/Project";
import { CustomError } from "../../utils/CustomError";


export const create = async (req: Request, res: Response, next:NextFunction) => {
    try {
      const project = await myDataSource.getRepository(Project).create(req.body)
      const results = await myDataSource.getRepository(Project).save(project)
        try{
            let moodyProjectId = instanceToPlain(results).id;
            const AZURE_STORAGE_CONNECTION_STRING = 
            process.env.AZURE_STORAGE_CONNECTION_STRING;
              if (!AZURE_STORAGE_CONNECTION_STRING) {
                throw Error('Azure Storage Connection string not found');
              }
            const blobServiceClient = BlobServiceClient.fromConnectionString(
              AZURE_STORAGE_CONNECTION_STRING
            );
            const containerName = 'web';
            const containerClient =  blobServiceClient.getContainerClient(containerName);
            const blobName = `trigger/data_preparation/${moodyProjectId}.txt`;
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);
            const data = '';
              const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
              
             return res.status(201).json({message:'Project created and Blob was uploaded successfully', project: results, blobResponce:uploadBlobResponse.requestId });
        }catch (err){
          const customError = new CustomError(
            "Can't upload blob",
            500,
            err,
          );
          return next(customError);
        }
    } catch (err) {
      const customError = new CustomError(
        "Can't create Project",
        500,
        err,
      );
      return next(customError);
    }
};
