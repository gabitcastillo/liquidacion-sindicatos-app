import { Request, Response } from 'express';
import xlsx from 'xlsx';
import path from 'path';
import fs from 'fs';

class ReadExcelController {

    public async readExcel(req: Request, res: Response) {

        try {
            const excelPath =  path.join(__dirname, '../../src/assets/Convenios.xlsx');
            console.log(excelPath);
            if (!fs.existsSync(excelPath)) { // Verificar si el archivo existe               
                return res.status(404).send({ text: 'El archivo no existe o fue movido de su ubicación' });
            }
            const workbook = await xlsx.readFile(excelPath);         // Step 2
            let workbook_sheet = workbook.SheetNames;                // Step 3
            let workbook_response = xlsx.utils.sheet_to_json(        // Step 4
                workbook.Sheets[workbook_sheet[0]]
            );
            // if(workbook_response != null)
                return res.status(200).send({ message: workbook_response });
        } catch (error) {
            res.status(500).send({text: 'El servidor no pudo procesar la solicitud'});
        }
    }
}

const readExcelController = new ReadExcelController();
export default readExcelController;