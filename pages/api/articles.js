import Article from '../../models/Article';
import authMiddleware from '../../utils/auth';
import connectDb from '../../utils/db';
import NextCors from 'nextjs-cors';

connectDb();

export default async function (req, res) {
  try {
    await NextCors(req, res, {
      // Options
      methods: ['GET'],
      origin: '*',
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
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
