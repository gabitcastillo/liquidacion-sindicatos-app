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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const liquidacionModel_1 = __importDefault(require("../models/liquidacionModel"));
class LiquidacionController {
    listNominaGeneral(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            //res.send('Listado de liquidacion!!!');
            const nomina = yield liquidacionModel_1.default.listarNominaGeneral();
            //console.log(nomina);
            return res.json(nomina);
        });
    }
    listConvenio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            //res.send('Listado de liquidacion!!!');
            const nomina = yield liquidacionModel_1.default.listarConvenio();
            //console.log(nomina);
            return res.json(nomina);
        });
    }
    findCovenio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params.id); //params lleva los datos que se pasan por URL o URI
            //res.send('Convenio '+ req.params.id +' encontrado!!!');
            const { id } = req.params;
            const nomina = yield liquidacionModel_1.default.buscarIdLiquidacion(id);
            if (nomina)
                return res.json(nomina);
            res.status(404).json({ text: "Nomina doesn't exists" });
        });
    }
}
const liquidacionController = new LiquidacionController();
exports.default = liquidacionController;
//# sourceMappingURL=readFileSindicatos.js.map