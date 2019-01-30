import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import dbase from '../model/db';

dotenv.config();
const SECRET = process.env.SECERET;

const Auth = {
  async verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(403).json({
        error: 'Token is not provided',
      });
    }
    try {
      const decoded = await jwt.verify(token, SECRET);
      const text = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await dbase.query(text, [decoded.userId]);
      if (!rows[0]) {
        return res.status(403).json({
          error: 'The token you provided is invalid',
        });
      }
      req.user = { id: decoded.userId };
      next();
    } catch (error) {
      return res.status(403).json(error);
    }
    return null;
  },
};

export default Auth;
