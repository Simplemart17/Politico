import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET = process.env.SECRET;

const generateHashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

const comparePassword = (hashPassword, password) => {
  return bcrypt.compareSync(password, hashPassword);
};

const generateToken = (id, isAdmin) => {
  const token = jwt.sign({
    id,
    isAdmin,
  },
  SECRET, { expiresIn: '24h' });
  return token;
};

export {
  generateHashPassword,
  comparePassword,
  generateToken,
};
