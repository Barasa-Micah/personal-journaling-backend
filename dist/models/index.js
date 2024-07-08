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
exports.dbInit = exports.Journal = exports.User = void 0;
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
const user_1 = __importDefault(require("./user"));
exports.User = user_1.default;
const journal_1 = __importDefault(require("./journal"));
exports.Journal = journal_1.default;
const dbInit = () => __awaiter(void 0, void 0, void 0, function* () {
    yield dbConfig_1.default.sync({ force: true });
});
exports.dbInit = dbInit;
