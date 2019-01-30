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
      isadmin || 'false',
    ];
    try {
      const { rows } = await dBase.query(queries.addUser(), values);
      const token = generateToken(rows[0].id);
      console.log(res.user);
      return res.status(200).json({
        status: 200,
        message: 'You have successfully registered!',
        data: [{
          user: rows[0],
          token,
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
      console.log(error);
      return res.json(error);
    }
  },
};

export default Users;
