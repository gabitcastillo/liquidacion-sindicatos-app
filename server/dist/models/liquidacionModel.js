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
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = require("mysql2/promise");
class LiquidacionModel {
    constructor() {
        this.config(); //aplicamos la conexion con la BD.
    }
    config() {
        return __awaiter(this, void 0, void 0, function* () {
            this.db = yield (0, promise_1.createPool)({
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'axton_bd',
                connectionLimit: 10
            });
        });
    }
    /* Nota: Aqui cada uno tiene que setear los parametros de su propio servidor MySQL / MariaDB.*/
    listarNominaGeneral(objeto) {
        return __awaiter(this, void 0, void 0, function* () {
            //const db=this.connection;
            const liquidacion = yield this.db.query('SELECT * FROM liquidaciones_20231103');
            console.log(liquidacion[0]);
            //devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
            return liquidacion[0];
        });
    }
    //Devuelve un objeto cuya fila en la tabla usuarios coincide con id.
    //Si no la encuentra devuelve null
    buscarIdLiquidacion(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const encontrado = yield this.db.query('SELECT * FROM liquidaciones_20231103 WHERE id = ?', [id]);
            //Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
            if (encontrado.length > 1)
                return encontrado[0][0];
            return null;
        });
    }
}
const liquidacionModel = new LiquidacionModel();
exports.default = liquidacionModel;
//# sourceMappingURL=liquidacionModel.js.map