"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const xlsx_1 = __importDefault(require("xlsx"));
class ReadExcelController {
    readExcel(req, res) {
        const workbook = xlsx_1.default.readFile('../1234.xlsx'); // Step 2
        let workbook_sheet = workbook.SheetNames; // Step 3
        let workbook_response = xlsx_1.default.utils.sheet_to_json(// Step 4
        workbook.Sheets[workbook_sheet[0]]);
        res.status(200).send({
            message: workbook_response,
        });
    }
}
const readExcelController = new ReadExcelController();
exports.default = readExcelController;
//# sourceMappingURL=readExcelController.js.map