import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import dbase from '../model/db';
import * as queries from '../model/queries';

dotenv.config();

const Auth = {
  async verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(403).json({
        error: 'Token is not provided',
      });
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);
      const { rows } = await dbase.query(queries.getUsers(), [decoded.id]);
      if (!rows[0]) {
        return res.status(403).json({
          error: 'The token you provided is invalid',
        });
      }
      req.user = decoded;
      return next();
    } catch (error) {
      return res.status(403).json({
        error,
        messsage: 'Authentication fails!',
      });
    }
  },
  verifyIsAdmin(req, res, next) {
    if (!req.user.isAdmin) {
      return res.status(403).json({
        status: 403,
        error: 'You cannot access this route!',
      });
    }
    return next();
  },
};

export default Auth;
