import jwt from 'jsonwebtoken';

export default async function authMiddleware(req, res) {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res
        .status(401)
        .send('Izin yok. Lutfen yeniden giris yapmayi deneyin.');
    }
    const decode = await jwt.verify(authorization, process.env.JWT_SECRET);

    if (decode) {
      return decode._id || decode.newUser._id;
    }
  } catch (error) {
    return res.status(401).send('Izin yokkk');
  }
}
