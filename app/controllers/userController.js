import dBase from '../model/db';
import { generateToken, generateHashPassword, comparePassword } from '../middleware/Helper';
import * as queries from '../model/queries';

const Users = {
  async signUpUsers(req, res) {
    const hashPassword = generateHashPassword(req.body.password);
    const {
      firstname, lastname, othernames, email, phonenumber, username, passportUrl, isadmin,
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
      isadmin,
    ];
    try {
      const { rows } = await dBase.query(queries.addUser(), values);
      const token = generateToken(rows[0].id, rows[0].isadmin);
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
      return res.status(400).json({
        status: 400,
        error,
        message: 'Account cannot be created!',
      });
    }
  },

  async userSignIn(req, res) {
    const text = 'SELECT * FROM users WHERE   EMAIL = $1';
    try {
      const { rows } = await dBase.query(text, [req.body.email]);
      if (!rows[0]) {
        return res.status(406).json({
          error: 'Incorrect email address',
        });
      }
      if (!comparePassword(rows[0].password, req.body.password)) {
        return res.status(406).json({
          error: 'Incorrect password!',
        });
      }
      const token = generateToken(rows[0].id, rows[0].isadmin);
      delete rows[0].password;
      return res.status(200).json({
        message: 'You have successfully signed in!',
        data: [{
          token,
          user: rows[0],
        }],
      });
    } catch (error) {
      return res.status(401).json({
        status: 401,
        error,
        message: 'You are denied access!',
      });
    }
  },
};

export default Users;
