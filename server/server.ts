import express, { Application } from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import thoughtRoutes from './routes/thoughtRoutes';

const app: Application = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());


app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

mongoose.connect('mongodb://localhost/socialnetworkDB')
    .then(() => { 
        console.log('MongoDB connected');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });
