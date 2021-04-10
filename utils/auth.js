import jwt from 'jsonwebtoken';

export default async function authMiddleware(req, res) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res
        .status(401)
        .send('Izin yok. Lutfen yeniden giris yapmayi deneyin.');
    }
    const { userId } = await jwt.verify(authorization, process.env.JWT_SECRET);

    if (userId) {
      return userId;
    }
  } catch (error) {
    res.status(401).send('Izin yokkk');
  }
}
