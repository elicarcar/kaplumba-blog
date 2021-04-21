import User from '../../models/User';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import isLength from 'validator/lib/isLength';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connectDb from '../../utils/db';

connectDb();
export default async (req, res) => {
  const { username, email, password } = req.body;
  const isValidEmail = isEmail(email);
  const isEmptyUserName = isEmpty(username);
  const isValidPassword = isLength(password, { min: 5, max: 10 });
  try {
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res
        .status(422)
        .send(`${email} adresi ile bir kullanici zaten bulunmakta.`);
    }

    if (!isValidEmail) {
      return res
        .status(422)
        .send(
          'Gecersiz bir mail adresi girdiniz. Lutfen yazim hatasi yapmadiginizdan emin olun. '
        );
    } else if (isEmptyUserName) {
      return res
        .status(422)
        .send(
          'Gecersiz bir kullanici adi girdiniz. Kullanici adi en az 4 karajterden olusmalidir.'
        );
    } else if (!isValidPassword) {
      return res
        .status(422)
        .send(
          'Gecersiz bir parola girdiniz. Parolaniz en az 5 en fazla 10 karakterden olusmalidir.'
        );
    }

    // user does not exist then hash the password
    const hash = await bcrypt.hash(password, 10);

    const newUser = await new User({
      username,
      email,
      password: hash,
    }).save();

    const token = jwt.sign({ newUser }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    return res.status(201).json(token);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
