import mongoose from 'mongoose';
import User from './User';

const { String, ObjectId } = mongoose.Schema.Types;

const ArticleSchema = new mongoose.Schema({
  author: {
    type: ObjectId,
    ref: User,
  },
  content: {
    type: String,
    required: true,
  },
  created_at: {
    type: DateTime,
  },
});

export default mongoose.models.ArticleSchema ||
  mongoose.model('Article', ArticleSchema);
