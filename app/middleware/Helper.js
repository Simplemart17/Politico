import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateHashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const comparePassword = (hashPassword, password) => bcrypt.compareSync(password, hashPassword);

const generateToken = (id, isAdmin) => {
  const token = jwt.sign({ id, isAdmin }, process.env.SECRET, { expiresIn: '1d' });
  return token;
};

export { generateHashPassword, comparePassword, generateToken };
