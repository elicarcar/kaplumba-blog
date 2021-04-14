import authMiddleware from '../../utils/auth';
import User from '../../models/User';
import Article from '../../models/Article';

export default async (req, res) => {
  try {
    const _id = await authMiddleware(req, res);

    const { articleId } = req.body;

    if (!_id) {
      res.status(401).send('Izin yok. Lutfen yeniden giris yapin.');
    }
    let user = await User.findOne({ _id }).populate({
      path: 'readLists',
      model: 'Article',
    });

    const isInList = user.readLists.find((item) => item._id == articleId);

    if (!isInList) {
      user = await User.findByIdAndUpdate(
        { _id },
        { $push: { readLists: { _id: articleId } } },
        { new: true }
      );
    } else {
      user = await User.findByIdAndUpdate(
        { _id },
        { $pull: { readLists: { _id: articleId } } },
        { new: true }
      );
    }

    res.status(201).json(user.readLists);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error.');
  }
};
