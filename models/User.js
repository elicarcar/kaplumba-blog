import mongoose from 'mongoose';

const { String, ObjectId } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  readLists: [
    {
      type: ObjectId,
      ref: 'Article',
    },
  ],
  articles: [{ type: ObjectId, ref: 'Article' }],
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
