import jwt from 'jsonwebtoken';
import redisClient from '../services/redis.service.js';

export const authUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = req.cookies.token || (authHeader && authHeader.split(' ')[1]);

    if (!token) {
      return res.status(401).send({ error: 'Token not provided' });
    }

    const isBlackListed = await redisClient.get(token);
    if (isBlackListed) {
      return res.status(403).send({ error: 'Token has been revoked' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('JWT Auth Error:', error);
    res.status(401).send({ error: 'Invalid or expired token' });
  }
};
