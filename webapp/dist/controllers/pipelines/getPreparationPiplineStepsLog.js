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
exports.getPreparationPiplineStepsLog = void 0;
const ormconfig_1 = require("../../config/ormconfig");
const Steps_1 = require("../../entities/Steps");
const CustomError_1 = require("../../utils/CustomError");
const getPreparationPiplineStepsLog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const piplineStepsLog = yield ormconfig_1.myDataSource.getRepository(Steps_1.Step)
            .createQueryBuilder("step")
            .where("step.pipeline_log_id = :id", { id: parseInt(req.params.preparationPiplineLogId) })
            .getMany();
        res.status(200).json({ message: "Get preparation pipeline steps log", piplineStepsLog });
    }
    catch (err) {
        const customError = new CustomError_1.CustomError("Can't retrieve the data preparation pipeline steps log", 400, err);
        return next(customError);
    }
});
exports.getPreparationPiplineStepsLog = getPreparationPiplineStepsLog;
