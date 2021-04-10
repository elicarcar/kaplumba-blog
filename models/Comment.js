import mongoose from 'mongoose';
import User from './User';

const { String, ObjectId } = mongoose.Schema.Types;

const CommentSchema = mongoose.Schema({
  author: {
    type: ObjectId,
    ref: User,
  },
  body: {
    type: String,
    required: true,
  },
  created_at: DateTime,
});

export default mongoose.models.CommentSchema ||
  mongoose.model('Comment', CommentSchema);
