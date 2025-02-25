import mongoose, { Schema, Document } from 'mongoose';

interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: mongoose.Types.ObjectId[];
    reactionCount: number;
}

const ThoughtSchema: Schema<IThought> = new Schema (
    {
        thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
        createdAt: { type: Date, default: Date.now },
        username: {type: String, required: true},
        reactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reaction' }],
    },
    {
        toJSON: { getters: true},
    }
);

ThoughtSchema.virtual('reactionCount').get(function (this: IThought) {
    return this.reactions.length;
});

ThoughtSchema.virtual('formattedCreatedAt').get(function (this: IThought) {
    return this.createdAt.toLocaleString();
});

const Thought = mongoose.model<IThought>('Thought', ThoughtSchema);

export { Thought, IThought};