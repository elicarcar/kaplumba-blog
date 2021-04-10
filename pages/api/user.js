import jwt from 'jsonwebtoken';
import User from '../../models/User';
import connectDb from '../../utils/db';
import authMiddleware from '../../utils/auth';

connectDb();

export default function handler(req, res) {
  if (req.method === 'GET') {
    return handleGetUsers(req, res);
  } else if (req.method === 'PUT') {
    return handleUpdateUser(req, res);
  } else if (req.method === 'DELETE') {
    return handleDeleteUser(req, res);
  }
}

async function handleGetUsers(req, res) {
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
}

async function handleUpdateUser(req, res) {
  try {
    const { username } = req.body;

    const userId = await authMiddleware(req, res);
    if (userId) {
      const userUpdate = await User.findOneAndUpdate(
        { _id: userId },
        { $set: { username } },
        { new: true }
      );

      res.status(201).json(userUpdate);
    } else {
      res.status(401).send('Bu eylemi yapmaya yetkiniz yok.');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error.');
  }
}

async function handleDeleteUser(req, res) {
  try {
    const userId = await authMiddleware(req, res);

    if (userId) {
      await User.findOneAndDelete({ _id: userId });

      res.status(204).send('Kullanici basarili bir sekilde silindi.');
    } else {
      res.status(404).send('Boyle bir kullanici yok.');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
}
