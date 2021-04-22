import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../models/User';
import connectDb from '../../utils/db';
import micro from 'micro-cors';

import Cors from 'cors';

connectDb();

// const cors = Cors({
//   credentials: true,
//   origin: '*',
//   methods: ['GET', 'POST', 'OPTIONS'],
//   preflightContinue: true,
//   optionsSuccessStatus: 200,
// });

// function runMiddleware(req, res, fn) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result) => {
//       if (result instanceof Error) {
//         return reject(result);
//       }

//       return resolve(result);
//     });
//   });
// }

async function login(req, res) {
  try {
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    } else if (req.method === 'POST') {
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
    }
  } catch (error) {
    console.log(error);
    console.log('no login for you');
    res.status(500).send('Internal server error');
  }
}

const cors = micro();

export default cors(login);
