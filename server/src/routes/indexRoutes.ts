import { Router, Request, Response } from 'express';

class IndexRoutes{
	public router: Router = Router();
	constructor(){
		this.config();
	}
	config():void{
		this.router.get('/',(req:Request,res:Response)=> res.send('Hola Mundo!!!'));
	}
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;