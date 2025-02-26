import express, { Request, Response } from 'express';
import { Thought } from '../models/thoughtsModel';
import { User } from '../models/userModel';
import { Types } from 'mongoose';

const router = express.Router();

router.get('/', async(req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(400).json({ error: (err as Error).message });
    }
});

router.get('/:thoughtId', async(req: Request, res: Response) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if(!thought) {
            res.status(404).json({ error: 'Thought not found' });
        }
        res.json(thought);
    } catch (err) {
        res.status(400).json({ error: err.message});
    }
});

router.post('/', async(req: Request, res: Response) => {
    try {
        const { thoughtText, username, userId } = req.body;
        if (!thoughtText || !username || !userId) {
            res.status(400).json({ error: 'Required fields: thoughtText, username, userId' });
        }

        const newThought = new Thought(req.body);
        const savedThought = await newThought.save();

       
        const user = await User.findById(userId);
        if (user) {
            user.thoughts.push(savedThought._id as Types.ObjectId);
            await user.save();
        }

        res.status(201).json(savedThought);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


router.put('/:thoughtId', async (req: Request, res: Response) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
        if (!updatedThought) {
            res.status(404).json({ error: 'Thought not found' });
        }
        res.json(updatedThought);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:thoughtId', async (req: Request, res: Response) => {
    try {
        const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);
        if (!deletedThought) {
            res.status(404).json({ error: 'Thought not found' });
        }

        if (deletedThought) {
            const user = await User.findOne({ thoughts: deletedThought._id });
            if (user) {
                user.thoughts = user.thoughts.filter((thoughtId: Types.ObjectId) => !thoughtId.equals(deletedThought._id as Types.ObjectId))
                await user.save();
            }
        }
        res.json({ message: 'Thought deleted' });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

export default router;