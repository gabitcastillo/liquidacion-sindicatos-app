"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const readExcelRoutes_1 = __importDefault(require("./routes/readExcelRoutes"));
const liquidacionRoutes_1 = __importDefault(require("./routes/liquidacionRoutes"));
const jsonRoutes_1 = __importDefault(require("./routes/jsonRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        //El constructor ejecuta metodos que indicaran configuracion inicial del servidor
        this.config();
        this.routes();
    }
    config() {
        //Configuraciones
        this.app.set('port', process.env.PORT || 3000);
        //Middlewares
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)()); //iniciamos cors
        this.app.use(express_1.default.json()); //habilitamos el intercambio de objetos json entre aplicaciones
        this.app.use(express_1.default.urlencoded({ extended: false })); //habilitamos para recibir datos a traves de formularios html.
    }
    routes() {
        this.app.use(indexRoutes_1.default);
        this.app.use('/read', readExcelRoutes_1.default);
        this.app.use(jsonRoutes_1.default);
        this.app.use(liquidacionRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log("Server escuchando en puerto: " + this.app.get('port'));
        });
    }
}
const server = new Server();
server.start(); //Ejecutamos el metodo start en inicia el server
//# sourceMappingURL=index.js.map