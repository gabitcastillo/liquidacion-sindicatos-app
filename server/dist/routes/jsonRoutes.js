"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonController_1 = __importDefault(require("../controllers/jsonController"));
const express_1 = require("express");
class JsonRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/add', jsonController_1.default.addJson);
    }
}
const jsonRoutes = new JsonRoutes();
exports.default = jsonRoutes.router;
//# sourceMappingURL=jsonRoutes.js.map