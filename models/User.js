import mongoose from 'mongoose';
import Article from './Article';

const { String, ObjectId } = mongoose.Schema.Types;

const UserSchema = new Schema({
  name: {
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
  readList: [Article],
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
