import Article from '../../models/Article';
import User from '../../models/User';
import Comment from '../../models/Comment';
import authMiddleware from '../../utils/auth';
import connectDb from '../../utils/db';

connectDb();

export default async function handleRequest(req, res) {
  if (req.method === 'GET') {
    return handleGetRequest(req, res);
  } else if (req.method === 'POST') {
    return handlePostRequest(req, res);
  } else if (req.method === 'PUT') {
    return handlePutRequest(req, res);
  } else if (req.method === 'DELETE') {
    return handleDeleteRequest(req, res);
  }
}

async function handleGetRequest(req, res) {
  try {
    await authMiddleware(req, res);
    const { _id } = req.query;
    console.log('hello', _id);
    const article = await Article.findOne({ _id }).populate({
      path: 'comments',
      model: 'Comment',
    });
    res.status(200).json(article);
  } catch (error) {
    res.status(500).send('Internal server error.');
  }
}

async function handlePutRequest(req, res) {
  try {
    await authMiddleware(req, res);
    const { _id } = req.query;
    const { header, content } = req.body;
    const newArticle = await Article.findOneAndUpdate(
      { _id },
      { header, content },
      { $set: true }
    );
    res.status(201).json({ newArticle });
  } catch (error) {
    res.status(500).send('Internal server error');
  }
}

async function handlePostRequest(req, res) {
  try {
    const userId = await authMiddleware(req, res);

    const { header, content } = req.body;

    const user = await User.findOne({ _id: userId });

    if (user) {
      const article = await new Article({
        author: userId,
        header,
        content,
      }).save();

      const { _id } = article;

      await user.updateOne({ $push: { articles: { _id } } });

      res.status(201).json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
}

async function handleDeleteRequest(req, res) {
  try {
    await authMiddleware(req, res);
    const { _id } = req.query;
    await Article.findOneAndDelete({ _id });

    //remove from all users' list
    await User.updateMany(
      { 'readingLists.item': _id },
      { $pull: { readingList: { item: _id } } }
    );
    res.status(204).json({});
  } catch (error) {
    res.status(500).send('Internal server error.');
  }
}
