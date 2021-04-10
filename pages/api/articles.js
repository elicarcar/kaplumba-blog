import Article from '../../models/Article';
import authMiddleware from '../../utils/auth';
import connectDb from '../../utils/db';

connectDb();

export default async function (req, res) {
  try {
    await authMiddleware(req, res);
    const articles = await Article.find().populate({
      path: 'author',
    });
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
}
