"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*	La clase Router nos permitira trabajar con el enrutador del back-end
    Request permitira que el servidor reciba peticiones.
    Response permitira que el servidor devuelva una respuesta.
    */
const express_1 = require("express");
const readFileController_1 = __importDefault(require("../controllers/readFileController"));
class ReadFilesRoutes {
    /*El constructor llama a config para que este al tanto de las rutas existentes y que hacer con ellas.*/
    constructor() {
        //Instanciamos el enrutador.
        this.router = (0, express_1.Router)();
        this.config();
    }
    /*Aqui se declaran las rutas que entiende nuestra aplicacion y las acciones a llevar
    a cabo. Generalmente se hara una llamada al metodo de un controlador existente.*/
    config() {
        this.router.get('/', (req, res) => {
            res.send('Main!!!');
        });
        this.router.get('/readExcel', readFileController_1.default.readExcelController);
    }
}
const readFilesRoutes = new ReadFilesRoutes();
exports.default = readFilesRoutes.router;
//# sourceMappingURL=readFileSindicatos.js.map