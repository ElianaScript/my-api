import express, { Request, Response } from 'express';
import { Thought } from '../models/thoughtsModel';
import { User } from '../models/userModels';

const router = express.Router();

router.get('/', async(req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/:thoughtId', async(req: Request, res: Response) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if(!thought) {
            return res.status(404).json({ error: 'Thought not found' });
        }
        res.json(thought);
    } catch (err) {
        res.status(400).json({ error: err.message});
    }
});

router.post('/', async(req: Request, res: Response) => {
    try {
        const newThought = new Thought(req.body);
        const savedThought = await newThought.save();

        const user = await User.findById(req.body.userId);
        user?.thoughts.push(savedThought._id as any);
        await user?.save();

        res.json(savedThought);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put('/:thoughtId', async (req: Request, res: Response) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtIdd, req.body, { new: true });
        res.json(updatedThought);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:thoughtId', async(req: Request, res: Response) => {
    try {
        await Thought.findByIdAndDelete(req.params.thoughtId);
        res.json({ message: 'Thought deleted '});
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;