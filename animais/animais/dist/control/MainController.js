"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PrimayScreen_1 = __importDefault(require("../view/PrimayScreen"));
class MainController {
    constructor() {
        this.ps = new PrimayScreen_1.default();
        this.ps.getFirstScreen();
    }
}
exports.default = MainController;
