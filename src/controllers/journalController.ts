import { Request, Response } from 'express';
import { Journal } from '../models';

// Create a new journal entry
const createJournal = async (req: Request, res: Response) => {
  const { title, content, category } = req.body;
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const newJournal = await Journal.create({
      title,
      content,
      category,
      userId,
    });
    res.status(201).json(newJournal);
  } catch (error) {
    console.error('Error creating journal:', error);
    res.status(500).json({ message: 'Error creating journal', error: error.message });
  }
};

// Get all journals for the authenticated user
const getJournals = async (req: Request, res: Response) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const journals = await Journal.findAll({ where: { userId } });
    res.json(journals);
  } catch (error) {
    console.error('Error fetching journals:', error);
    res.status(500).json({ message: 'Error fetching journals', error: error.message });
  }
};

// Update a journal entry
const updateJournal = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content, category } = req.body;
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const journal = await Journal.findOne({ where: { id, userId } });

    if (!journal) {
      return res.status(404).json({ message: 'Journal not found' });
    }

    journal.title = title;
    journal.content = content;
    journal.category = category;
    await journal.save();

    res.json(journal);
  } catch (error) {
    console.error('Error updating journal:', error);
    res.status(500).json({ message: 'Error updating journal', error: error.message });
  }
};

// Delete a journal entry
const deleteJournal = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const journal = await Journal.findOne({ where: { id, userId } });

    if (!journal) {
      return res.status(404).json({ message: 'Journal not found' });
    }

    await journal.destroy();
    res.json({ message: 'Journal deleted' });
  } catch (error) {
    console.error('Error deleting journal:', error);
    res.status(500).json({ message: 'Error deleting journal', error: error.message });
  }
};

export { createJournal, getJournals, updateJournal, deleteJournal };
