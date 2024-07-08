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
exports.deleteJournal = exports.updateJournal = exports.getJournals = exports.createJournal = void 0;
const models_1 = require("../models");
// Create a new journal entry
const createJournal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, category } = req.body;
    const userId = req.userId;
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const newJournal = yield models_1.Journal.create({
            title,
            content,
            category,
            userId,
        });
        res.status(201).json(newJournal);
    }
    catch (error) {
        console.error('Error creating journal:', error);
        res.status(500).json({ message: 'Error creating journal', });
    }
});
exports.createJournal = createJournal;
// Get all journals for the authenticated user
const getJournals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const journals = yield models_1.Journal.findAll({ where: { userId } });
        res.json(journals);
    }
    catch (error) {
        console.error('Error fetching journals:', error);
        res.status(500).json({ message: 'Error fetching journals', });
    }
});
exports.getJournals = getJournals;
// Update a journal entry
const updateJournal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, content, category } = req.body;
    const userId = req.userId;
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const journal = yield models_1.Journal.findOne({ where: { id, userId } });
        if (!journal) {
            return res.status(404).json({ message: 'Journal not found' });
        }
        journal.title = title;
        journal.content = content;
        journal.category = category;
        yield journal.save();
        res.json(journal);
    }
    catch (error) {
        console.error('Error updating journal:', error);
        res.status(500).json({ message: 'Error updating journal' });
    }
});
exports.updateJournal = updateJournal;
// Delete a journal entry
const deleteJournal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userId = req.userId;
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const journal = yield models_1.Journal.findOne({ where: { id, userId } });
        if (!journal) {
            return res.status(404).json({ message: 'Journal not found' });
        }
        yield journal.destroy();
        res.json({ message: 'Journal deleted' });
    }
    catch (error) {
        console.error('Error deleting journal:', error);
        res.status(500).json({ message: 'Error deleting journal', });
    }
});
exports.deleteJournal = deleteJournal;
