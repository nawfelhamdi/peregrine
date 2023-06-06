"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const path_1 = __importDefault(require("path"));
require("dotenv").config({ path: path_1.default.join(__dirname, "..", "..", "..", ".env") });
const class_transformer_1 = require("class-transformer");
const { BlobServiceClient } = require('@azure/storage-blob');
const ormconfig_1 = require("../../config/ormconfig");
const Project_1 = require("../../entities/Project");
const CustomError_1 = require("../../utils/CustomError");
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield ormconfig_1.myDataSource.getRepository(Project_1.Project).create(req.body);
        const results = yield ormconfig_1.myDataSource.getRepository(Project_1.Project).save(project);
        try {
            let moodyProjectId = (0, class_transformer_1.instanceToPlain)(results).id;
            const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
            if (!AZURE_STORAGE_CONNECTION_STRING) {
                throw Error('Azure Storage Connection string not found');
            }
            const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
            const containerName = 'web';
            const containerClient = blobServiceClient.getContainerClient(containerName);
            const blobName = `trigger/data_preparation/${moodyProjectId}.txt`;
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);
            const data = '';
            const uploadBlobResponse = yield blockBlobClient.upload(data, data.length);
            return res.status(201).json({ message: 'Project created and Blob was uploaded successfully', project: results, blobResponce: uploadBlobResponse.requestId });
        }
        catch (err) {
            const customError = new CustomError_1.CustomError("Can't upload blob", 500, err);
            return next(customError);
        }
    }
    catch (err) {
        const customError = new CustomError_1.CustomError("Can't create Project", 500, err);
        return next(customError);
    }
});
exports.create = create;
