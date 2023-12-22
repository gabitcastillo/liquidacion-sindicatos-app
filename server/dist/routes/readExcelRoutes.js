"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const excelController_1 = __importDefault(require("../controllers/excelController"));
const express_1 = require("express");
class ReadExcelRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/readExcel', excelController_1.default.readExcel);
    }
}
const readExcelRoutes = new ReadExcelRoutes();
exports.default = readExcelRoutes.router;
//# sourceMappingURL=readExcelRoutes.js.map