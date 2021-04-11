import authMiddleware from '../../utils/auth';
import User from '../../models/User';
import Article from '../../models/Article';
import connectDb from '../../utils/db';

connectDb();

export default async (req, res) => {
  try {
    const userId = await authMiddleware(req, res);
    if (!userId) {
      return res.status(401).send('Yanlis token');
    }

    const users = await User.find({ _id: { $ne: userId } })
      .populate({ path: 'articles', model: 'Article' })
      .populate({ path: 'readingLists', model: 'Article' })
      .select('-password')
      .sort({ username: 'asc' });

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error.');
  }
};
