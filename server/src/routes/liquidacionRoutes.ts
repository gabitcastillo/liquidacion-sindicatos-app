/*	La clase Router nos permitira trabajar con el enrutador del back-end
    Request permitira que el servidor reciba peticiones.
    Response permitira que el servidor devuelva una respuesta.
    */
   import { Router, Request, Response } from 'express';
   import liquidacionController from '../controllers/liquidacionController';

class LiquidacionRoutes {
    //Instanciamos el enrutador.
    public router: Router = Router();

    /*El constructor llama a config para que este al tanto de las rutas existentes y que hacer con ellas.*/
    constructor() {
        this.config();
    }
    /*Aqui se declaran las rutas que entiende nuestra aplicacion y las acciones a llevar
    a cabo. Generalmente se hara una llamada al metodo de un controlador existente.*/
    config(): void {
        this.router.get('/', (req: Request, res: Response) => {
            res.send('Main!!!');
        });
        this.router.get('/list', liquidacionController.listNominaGeneral);
    }
}

const liquidacionRoutes = new LiquidacionRoutes();
export default liquidacionRoutes.router;
