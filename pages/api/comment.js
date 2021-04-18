import Comment from '../../models/Comment';
import Article from '../../models/Article';
import User from '../../models/User';
import authMiddleware from '../../utils/auth';

export default async (req, res) => {
  if (req.method === 'POST') {
    handlePostRequest(req, res);
  } else if (req.method === 'DELETE') {
    handleDeleteRequest(req, res);
  }
};

async function handlePostRequest(req, res) {
  const { aid } = req.query;
  const { body } = req.body;
  const _id = await authMiddleware(req, res);
  if (!_id) {
    res
      .status(401)
      .send(
        'Bu eylemi gerceklestirmeye yetkiniz yok. Lutfen yeniden giris yapmayi deneyin.'
      );
  }
  try {
    const user = await User.findOne({ _id });

    const comment = await new Comment({
      author: user,
      body: body,
    }).save();

    const updateArticle = await Article.findOneAndUpdate(
      { _id: aid },
      { $push: { comments: comment } },
      { new: true }
    );

    res.status(201).json(updateArticle);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
}

async function handleDeleteRequest(req, res) {
  const _id = await authMiddleware(req, res);
  try {
    const { cId, aId } = req.query;

    await Article.findByIdAndUpdate(
      { _id: aId },
      { $pull: { comments: cId } },
      { new: true }
    );
    await Comment.findOneAndDelete({ _id: cId });

    res.status(204).send({});
  } catch (error) {
    res.status(500).send('Internal server error.');
  }
}
