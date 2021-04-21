import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../models/User';
import connectDb from '../../utils/db';

import Cors from 'cors';
import corsMiddleware from '../../utils/corsMiddleware';

// Initialize the cors middleware
const cors = corsMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST'],
  })
);

connectDb();
export default async (req, res) => {
  await cors(req, res);
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res
        .status(404)
        .send(
          'Bu mailde bir kullanici bulunmuyor, lutfen dogru maili girdiginize emin olun.'
        );
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });
      res.status(200).json(token);
    } else {
      res.status(401).send('Yanlis bir bilgi girdiniz');
    }
  } catch (error) {
    console.log(error);
    console.log('no login for you');
    res.status(500).send('Internal server error');
  }
};
