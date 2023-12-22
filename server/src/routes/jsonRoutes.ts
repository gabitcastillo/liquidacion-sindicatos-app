import jsonController from '../controllers/jsonController';
import { Router } from 'express';


class JsonRoutes {
    public router : Router = Router();

    constructor(){
		this.config();
	}

    config():void {
        this.router.post('/add',jsonController.addJson);
    }
}

const jsonRoutes = new JsonRoutes();
export default jsonRoutes.router;