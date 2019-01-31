import dBase from '../model/db';
import { generateToken, generateHashPassword, comparePassword } from '../middleware/Helper';
import * as queries from '../model/queries';

const Users = {
  async signUpUsers(req, res) {
    const hashPassword = generateHashPassword(req.body.password);
    const {
      firstname, lastname, othernames, email, phonenumber, username, passportUrl,
    } = req.body;
    const values = [
      firstname,
      lastname,
      othernames,
      email,
      phonenumber,
      username,
      hashPassword,
      passportUrl,
    ];
    try {
      const { rows } = await dBase.query(queries.addUser(), values);
      const token = generateToken(rows[0].id);
      delete rows[0].password;
      return res.status(201).json({
        status: 201,
        message: 'You have successfully registered!',
        data: [{
          token,
          user: rows[0],
        }],
      });
    } catch (error) {
      if (error.constrainst === 'users_email_key') {
        return res.status(400).json({
          status: 400,
          error: 'Email already exist!',
        });
      } if (error === 'users_username_key') {
        return res.status(400).json({
          status: 400,
          error: 'Username already exist!',
        });
      }
      return res.json(error);
    }
  },
};

export default Users;
