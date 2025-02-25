import mongoose, { Schema, Document } from 'mongoose';

interface IReaction extends Document {
    reactionId: mongoose.Types.ObjectId;
    reactionBody: string;
    username: string;
    createdAt: Date;
}

const ReactionSchema: Schema<IReaction> = new Schema(
    {
        reactionId: { type: mongoose.Schema.Types.ObjectId, default: new mongoose.Types.ObjectId },
        reactionBody: { type: String, required: true, maxLength: 280 },
        username: { type: String, required: true },
        createdAt: { type: Date, default: Date.now}
    },
    {
        toJSON: { getters: true },
    }
);

export { ReactionSchema, IReaction };