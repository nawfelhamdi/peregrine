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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApiCallPiplineLog = void 0;
const ormconfig_1 = require("../../config/ormconfig");
const Pipeline_1 = require("../../entities/Pipeline");
const CustomError_1 = require("../../utils/CustomError");
const getApiCallPiplineLog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const piplineLog = yield ormconfig_1.myDataSource.getRepository(Pipeline_1.Pipeline)
            .createQueryBuilder("pipline")
            .where("pipline.project_id = :id", { id: req.params.projectId })
            .andWhere("pipline.pipeline_name = :pipeline_name", { pipeline_name: "Full_API_Call" })
            .orderBy('pipline.id', 'DESC')
            .getOne();
        res.status(200).json({ message: "Data_Preparation Pipline", piplineLog });
    }
    catch (err) {
        const customError = new CustomError_1.CustomError("Can't retrieve project pipeline", 400, err);
        return next(customError);
    }
});
exports.getApiCallPiplineLog = getApiCallPiplineLog;
