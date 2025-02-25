import express, { Request, Response } from 'express';
import { Thought } from'../models/thoughtsModel';
import { ReactionSchema } from '../models/reactionModel';

const router = express.Router();

router.post('/:thoughtId/reactions', async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if(!thought) {
            return res.status(404).json({ error: 'Thought not found' });
        }

        const newReaction = new ReactionSchema(req.body);
        thought.reactions.push(newReaction);
        await thought,save();

        res.json(newReaction);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:thoughtId/reactions/:reactionId', async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ error: 'Thought not found' });
        }

        thought.reactions.pull(req.params.reactionId);
        await thought.save();

        res.json({ message: 'Reaction deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;