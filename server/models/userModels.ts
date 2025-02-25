import mongoose, { Schema, Document } from 'mongoose';
 
interface IUser extends Document {
  username: string;
  email: string;
  thoughts: mongoose.Types.ObjectId[];
  friends: mongoose.Types.ObjectId[];
  friendCount: number;
}

const UserSchema: Schema<IUser> = new Schema({
  username: {type: String, required: true, unique: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address'],
  },
  thoughts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Thought' }],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User '}],
});

UserSchema.virtual('friendCount').get(function(this: IUser) {
  return this.friends.length;
});

const User = mongoose.model<IUser>('User', UserSchema);

export { User, IUser };