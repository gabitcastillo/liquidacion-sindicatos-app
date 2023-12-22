"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const xlsx_1 = __importDefault(require("xlsx"));
class ReadFileController {
    readExcelController(req, res) {
        const workbook = xlsx_1.default.readFile('./../1234.xlsx');
        let workbook_sheet = workbook.SheetNames;
        let workbook_response = xlsx_1.default.utils.sheet_to_json(workbook.Sheets[workbook_sheet[0]]);
        if (workbook_response != null)
            return res.status(200).send({
                message: workbook_response,
            });
        res.status(404).json({ text: 'No se encuentra el archivo' });
    }
}
const readFileController = new ReadFileController();
exports.default = readFileController;
//# sourceMappingURL=readFileController.js.map