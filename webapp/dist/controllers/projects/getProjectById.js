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
exports.getProjectById = void 0;
const ormconfig_1 = require("../../config/ormconfig");
const Project_1 = require("../../entities/Project");
const CustomError_1 = require("../../utils/CustomError");
const getProjectById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield ormconfig_1.myDataSource.getRepository(Project_1.Project)
            .createQueryBuilder("project")
            .where("project.id = :id", { id: req.params.projectId })
            .orderBy('project.id', 'DESC')
            .getOne();
        res.status(200).json({ message: "find project by id", project });
    }
    catch (err) {
        const customError = new CustomError_1.CustomError("Can't retrieve list of projects", 400, err);
        return next(customError);
    }
});
exports.getProjectById = getProjectById;
