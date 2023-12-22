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
const xlsx_1 = __importDefault(require("xlsx"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class ReadExcelController {
    readExcel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const excelPath = path_1.default.join(__dirname, '../../src/assets/Convenios.xlsx');
                console.log(excelPath);
                if (!fs_1.default.existsSync(excelPath)) { // Verificar si el archivo existe               
                    return res.status(404).send({ text: 'El archivo no existe o fue movido de su ubicación' });
                }
                const workbook = yield xlsx_1.default.readFile(excelPath); // Step 2
                let workbook_sheet = workbook.SheetNames; // Step 3
                let workbook_response = xlsx_1.default.utils.sheet_to_json(// Step 4
                workbook.Sheets[workbook_sheet[0]]);
                // if(workbook_response != null)
                return res.status(200).send({ message: workbook_response });
            }
            catch (error) {
                res.status(500).send({ text: 'El servidor no pudo procesar la solicitud' });
            }
        });
    }
}
const readExcelController = new ReadExcelController();
exports.default = readExcelController;
//# sourceMappingURL=excelController.js.map