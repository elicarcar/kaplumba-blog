import mongoose from 'mongoose';
import User from './User';

const { String, ObjectId, Date } = mongoose.Schema.Types;

const ArticleSchema = new mongoose.Schema({
  author: {
    type: ObjectId,
    ref: 'User',
  },
  content: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.ArticleSchema;
