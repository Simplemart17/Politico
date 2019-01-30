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

const generateToken = (id) => {
  const token = jwt.sign({
    userid: id,
  },
  SECRET, { expiresIn: '2d' });
  return token;
};

export {
  generateHashPassword,
  comparePassword,
  generateToken,
};
