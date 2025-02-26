import mongoose, { Schema, Document, Types } from 'mongoose';

const reactionSchema = new Schema (
    { 
        reactionId: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId() },
        reactionBody: { types: String, required: true, maxlength: 280 },
        username: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
},
{_id: false }
);

interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: typeof reactionSchema[];
    reactionCount: number;
}

const ThoughtSchema: Schema<IThought> = new Schema (
    {
        thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
        createdAt: { type: Date, default: Date.now },
        username: {type: String, required: true},
        reactions: [reactionSchema],
    },
    {
        toJSON: { virtuals: true},
        id: false
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