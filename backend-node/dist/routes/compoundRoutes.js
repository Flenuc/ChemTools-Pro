"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compoundController_1 = require("../controllers/compoundController");
const router = express_1.default.Router();
router.post('/', compoundController_1.createCompound);
router.get('/', compoundController_1.getCompounds);
router.put('/:id', compoundController_1.updateCompound);
router.delete('/:id', compoundController_1.deleteCompound);
exports.default = router; // Asegúrate de exportar el router
