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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listArchiveBlobs = void 0;
const path_1 = __importDefault(require("path"));
require("dotenv").config({ path: path_1.default.join(__dirname, "..", "..", "..", ".env") });
const { BlobServiceClient } = require('@azure/storage-blob');
const CustomError_1 = require("../../utils/CustomError");
const listArchiveBlobs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var e_1, _a;
    // console.log(typeof(req.query.prefix))
    let test = 'undefined';
    console.log(typeof (test));
    console.log(test ? 'pass' : 'no');
    const prefix = req.query.prefix !== undefined ? `${req.query.prefix}` : 'raw';
    // console.log(prefix)
    try {
        const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
        if (!AZURE_STORAGE_CONNECTION_STRING) {
            throw Error('Azure Storage Connection string not found');
        }
        const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
        const containerName = req.query.container !== undefined ? `${req.query.container}` : 'gmm';
        // const prefix = req.query.prefix !== undefined?`${req.query.prefix}`:'/raw';
        const containerClient = blobServiceClient.getContainerClient(containerName);
        let result = [];
        let blobs = containerClient.listBlobsFlat({ prefix: `${prefix}` });
        try {
            for (var blobs_1 = __asyncValues(blobs), blobs_1_1; blobs_1_1 = yield blobs_1.next(), !blobs_1_1.done;) {
                const blob = blobs_1_1.value;
                const item = {
                    fileName: blob.name.split('/').pop(),
                    projectId: blob.name.split('/')[blob.name.split('/').length - 2],
                    createdOn: blob.properties.createdOn,
                    lastModified: blob.properties.lastModified,
                    blobName: blob.name
                };
                result.push(item);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (blobs_1_1 && !blobs_1_1.done && (_a = blobs_1.return)) yield _a.call(blobs_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return res.status(201).json({ message: 'success', result });
    }
    catch (err) {
        const customError = new CustomError_1.CustomError("Can't list input files blobs", 500, err);
        return next(customError);
    }
});
exports.listArchiveBlobs = listArchiveBlobs;
