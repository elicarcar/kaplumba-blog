import Article from '../../models/Article';
import authMiddleware from '../../utils/auth';
import connectDb from '../../utils/db';

connectDb();

export default async function (req, res) {
  try {
    await authMiddleware(req, res);
    const { page, size } = req.query;
    const pageNum = Number(page);
    const pageSize = Number(size);
    let articles = [];
    const totalDocs = await Article.countDocuments();
    const totalPages = Math.ceil(totalDocs / pageSize);
    if (pageNum === 1) {
      articles = await Article.find().limit(pageSize);
    } else {
      const skips = pageSize * (pageNum - 1);
      articles = await Article.find()
        .populate({
          path: 'author',
        })
        .skip(skips)
        .limit(pageSize);
    }

    res.status(200).json({ articles, totalPages });
  } catch (error) {
    res.status(500).send('Internal server error');
  }
}
