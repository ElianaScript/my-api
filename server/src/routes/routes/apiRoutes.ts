import express from 'express';
import { User } from '../models/userModel';
import { Thought } from '../models/thoughtsModel';

const router = express.Router();

router.get('/users', async (req, res) =>{
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/users', async (req, res) => {
    const { username, email } = req.body;

    const newUser = new User({
        username, 
        email,
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/thought', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(400).json({ message: ('Thought not found') });
    }
});

router.post('/thought', async (req, res) => {
    
})

export default router;