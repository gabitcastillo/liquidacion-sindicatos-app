import {Request, Response} from 'express';
import liquidacionModel from '../models/liquidacionModel';
import { Nomina } from '../models/nominaModel';


class LiquidacionController{

	public async listNominaGeneral(req:Request,res:Response){
		console.log(req.body);
        const objeto : Nomina = req.body;
        const nomina: Nomina[] = await liquidacionModel.listarNominaGeneral(objeto);
        return res.json(nomina);
         
	}

    
	public async findCovenio(req:Request,res:Response){
		console.log(req.params.id); //params lleva los datos que se pasan por URL o URI
        //res.send('Convenio '+ req.params.id +' encontrado!!!');
        const { id } = req.params;
        const nomina:Nomina = await liquidacionModel.buscarIdLiquidacion(id);
        if (nomina)
            return res.json(nomina);
        res.status(404).json({ text: "Nomina doesn't exists" });
	}
}
const liquidacionController = new LiquidacionController();
export default liquidacionController;