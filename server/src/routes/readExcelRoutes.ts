import readExcelController from '../controllers/excelController';
import { Router, Request, Response } from 'express';

class ReadExcelRoutes{
	public router: Router = Router();
	constructor(){
		this.config();
	}
	config():void{
		this.router.get('/readExcel', readExcelController.readExcel);
	}
}

const  readExcelRoutes = new ReadExcelRoutes();
export default readExcelRoutes.router;