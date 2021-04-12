import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../models/User';
import connectDb from '../../utils/db';

connectDb();
export default async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    console.log(user);

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
    res.status(500).send('Internal server error');
  }
};
