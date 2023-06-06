"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const list_1 = require("../controllers/governance/list");
const profiling_1 = require("../controllers/governance/profiling");
const router = (0, express_1.Router)();
router.get("/", list_1.list);
router.get("/profiling", profiling_1.profiling);
exports.default = router;
