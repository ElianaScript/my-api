import express, { Request, Response } from 'express';
import User from '../models/userModels';

const router = express.Router();

router.get('/', async( req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/:userId', async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.params.userId)
        .populate('thoughts')
        .populate('friends');
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

router.post('/', async (req: Request, res: Response ) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put('/:userId', async(req: Request, res: Response) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:userId', async(req: Request, res: Response) => {
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.post('/:userId/friends/:friendId', async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.userId);
        const friend = await User.findById(req.params.friendId);

        if(!user || !friend) {
            return res.status(404).json({ error: 'User or Friend not found'});
        }

        user.friends.push(friend._id as any);
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:userId/friends/:friendId', async (req: Request, res: Response) =>{
    try {
        const user = await User.findById(req.params.userId);
        if(!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        user.friends = user.friends.filter(friendId => friendId.toString() !== req.params.friendId);
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;