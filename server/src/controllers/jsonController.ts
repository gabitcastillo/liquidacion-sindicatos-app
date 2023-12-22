import { Request, Response } from "express";
import fs from 'fs';
import path from 'path';

class JsonController {

    public async addJson(req: Request, res: Response){
        console.log(req.body);
        const data = req.body;

        try {
            const archivoPath = path.join(__dirname, '../../src/assets/data.json');
            console.log(archivoPath);
            
            if(!fs.existsSync(archivoPath)) {
                return res.status(404).send({ text: 'El archivo no existe o la ruta es incorrecta' });
            }
            await fs.writeFileSync(archivoPath, JSON.stringify(data));
            return res.status(200).send({message:'OK'});
        } catch (error) {
                res.status(500).send({text: '500: El servidor no pudo procesar la solicitud'});
        }
    }

}

const jsonController = new JsonController();
export default jsonController;