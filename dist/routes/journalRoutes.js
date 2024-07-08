"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const journalController_1 = require("../controllers/journalController");
const router = (0, express_1.Router)();
router.post('/', authMiddleware_1.default, journalController_1.createJournal);
router.get('/', authMiddleware_1.default, journalController_1.getJournals);
router.put('/:id', authMiddleware_1.default, journalController_1.updateJournal);
router.delete('/:id', authMiddleware_1.default, journalController_1.deleteJournal);
exports.default = router;
