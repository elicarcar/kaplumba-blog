import mongoose from 'mongoose';
import User from './User';

const { String, ObjectId, Date } = mongoose.Schema.Types;

const ArticleSchema = new mongoose.Schema(
  {
    author: {
      type: ObjectId,
      ref: 'User',
    },
    header: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    comments: [
      {
        type: ObjectId,
        ref: 'Comment',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Article ||
  mongoose.model('Article', ArticleSchema);
