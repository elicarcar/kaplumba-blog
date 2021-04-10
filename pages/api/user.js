import jwt from 'jsonwebtoken';
import User from '../../models/User';
import connectDb from '../../utils/db';

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
    const { authorization } = req.headers;
    if (!authorization) {
      res.status(401).send('Izin yok.');
    }
    const { userId } = await jwt.verify(authorization, process.env.JWT_SECRET);

    if (!userId) {
      return res.status(401).send('Yanlis token');
    }

    const users = await User.find({ _id: { $ne: userId } })
      .select('-password')
      .sort({ username: 'asc' });

    return res.status(200).json(users);
  } catch (error) {
    res.status(500).send('Internal server error.');
  }
}
