import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const SECRET = process.env.SECRET;

function generateHashPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

function comparePassword(hashPassword, password) {
  return bcrypt.compareSync(password, hashPassword);
}

function generateToken(id) {
  const token = jwt.sign({
    userid: id,
  },
  SECRET, { expiresIn: '2d' });
  return token;
}

export {
  generateHashPassword,
  comparePassword,
  generateToken,
};
