import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import { createJournal, getJournals, updateJournal, deleteJournal } from '../controllers/journalController';

const router = Router();

router.post('/', authMiddleware, createJournal);
router.get('/', authMiddleware, getJournals);
router.put('/:id', authMiddleware, updateJournal);
router.delete('/:id', authMiddleware, deleteJournal);

export default router;
