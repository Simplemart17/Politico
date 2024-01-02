import dBase from '../model/db';
import * as queries from '../model/queries';

const officeController = {
  async createOffice(req, res) {
    const { type, name } = req.body;
    const values = [type, name];
    try {
      const { rows } = await dBase.query(queries.newOffice(), values);
      res
        .status(201)
        .json({
          status: 201,
          message: 'Political Office was successfully created!',
          data: [rows[0]],
        });
    } catch (error) {
      res
        .status(422)
        .json({ status: 422, message: 'Office cannot be created!' });
    }
  },

  async getAllOffice(req, res) {
    try {
      const { rows, rowCount } = await dBase.query(queries.getOffices());
      if (!rows[0]) {
        res
          .status(404)
          .json({ status: 404, message: 'No record found!', data: [{}] });
      }
      res.status(200).json({
        status: 200,
        message: 'Government office lists was successfully retrieved',
        data: rows,
        Total: rowCount,
      });
    } catch (error) {
      res
        .status(422)
        .json({ status: 422, message: 'Office list was not fetched' });
    }
  },

  async getOffice(req, res) {
    try {
      const { rows } = await dBase.query(queries.getOffice(), [req.params.id]);
      if (!rows[0]) {
        res
          .status(404)
          .json({ status: 404, message: 'Government office does not exist!' });
      }
      res
        .status(200)
        .json({
          status: 200,
          message: 'Government office was successfully retrieved!',
          data: [rows[0]],
        });
    } catch (error) {
      res
        .status(422)
        .json({ status: 422, message: 'Office list was not fetched' });
    }
  },
};

export default officeController;
