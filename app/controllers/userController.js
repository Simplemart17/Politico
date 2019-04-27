import sendMail from '../middleware/email';
import dBase from '../model/db';
import { generateToken, generateHashPassword, comparePassword } from '../middleware/Helper';
import * as queries from '../model/queries';
import { subject, content } from '../utils/mailContent';

const Users = {
  async signUpUsers(req, res) {
    const hashPassword = generateHashPassword(req.body.password);
    const {
      firstname, lastname, othername, email, phoneNumber, passportUrl,
    } = req.body;
    const values = [firstname, lastname, othername, email, phoneNumber, hashPassword, passportUrl];
    try {
      const { rows } = await dBase.query(queries.addUser(), values);
      const token = generateToken(rows[0].id, rows[0].isadmin);
      delete rows[0].password;
      return res.status(201).json({ status: 201, message: 'You have successfully registered!', data: [{ token, user: rows[0] }] });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).json({ status: 400, error: 'Email already exist!' });
      }
      return res.status(500).json({ status: 500, message: 'Account cannot be created!' });
    }
  },

  async userSignIn(req, res) {
    try {
      const { rows } = await dBase.query(queries.newSignIn(), [req.body.email]);
      if (!rows[0]) {
        return res.status(406).json({ error: 'Incorrect email address' });
      }
      if (!comparePassword(rows[0].password, req.body.password)) { return res.status(406).json({ error: 'Incorrect password!' }); }
      const token = generateToken(rows[0].id, rows[0].isadmin);
      delete rows[0].password;
      return res.status(200).json({ status: 200, message: 'You have successfully signed in!', data: [{ token, user: rows[0] }] });
    } catch (error) { return res.status(401).json({ status: 401, message: 'You are denied access!' }); }
  },

  async getUser(req, res) {
    try {
      const { rows } = await dBase.query(queries.getUsers(), [req.user.id]);
      const token = generateToken(rows[0].id, rows[0].isadmin);
      delete rows[0].password;
      return res.status(200).json({ status: 200, message: 'User successfully retrieved!', data: [{ token, user: rows[0] }] });
    } catch (error) { return res.status(500).json({ status: 500, message: 'Something went wrong!' }); }
  },

  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      const date = new Date(new Date().setDate(new Date().getDate() + 1));
      const { rows } = await dBase.query(queries.newSignIn(), [email]);
      if (!rows[0]) { return res.status(404).json({ error: 'There is no account with this email address' }); }
      const passwordResetToken = generateToken(rows[0].email);
      const values = [passwordResetToken, date, email];
      const message = content(passwordResetToken);
      const passwordResetInstruction = { email, subject, message };
      await dBase.query(queries.forgotPassword(), values);
      sendMail(passwordResetInstruction);
      return res.status(200).json({ status: 200, message: `Password reset instruction was sent to ${email}` });
    } catch (error) { return res.status(500).json({ status: 500, message: 'Something went wrong!' }); }
  },

  async resetPassword(req, res) {
    try {
      const { resetToken } = req.params;
      const date = new Date();
      const { rows } = await dBase.query(queries.resetPassword(), [resetToken]);
      if (!rows[0]) { return res.status(404).json({ status: 404, error: 'Invalid verification token, kindly re-authenticate!' }); }
      if (rows[0].passwordResetExpires <= date) return res.status(401).json({ status: 401, error: 'Token has expired!' });
      const hashPassword = generateHashPassword(req.body.password);
      const values = [hashPassword, resetToken];
      await dBase.query(queries.updatePassword(), values);
      return res.status(200).json({ status: 200, message: 'Password was successfully reset' });
    } catch (error) { return res.status(500).json({ status: 500, message: 'Something went wrong!' }); }
  },
};

export default Users;
