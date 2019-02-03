import dBase from '../model/db';
import * as queries from '../model/queries';

const PartyController = {
  async getAllParty(req, res) {
    try {
      const { rows, rowCount } = await dBase.query(queries.getParties());
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          message: 'No record found!',
        });
      }
      return res.status(200).json({
        status: 200,
        message: 'Political Party list was successfully retrieved',
        data: [
          rows,
        ],
        Total: rowCount,
      });
    } catch (error) {
      return res.status(422).json({
        status: 422,
        error,
        message: 'Party list was fecthed',
      });
    }
  },

  async getParty(req, res) {
    try {
      const { rows } = await dBase.query(queries.getParty(), [req.params.id]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          message: 'Party record does not exist!',
        });
      }
      return res.status(200).json({
        status: 200,
        message: 'Party record retrieved successfully!',
        data: [
          rows[0],
        ],
      });
    } catch (error) {
      return res.status(422).json({
        status: 422,
        error,
        message: 'Party list was fecthed',
      });
    }
  },

  async createParty(req, res) {
    const { name, hqAddress, logoUrl } = req.body;
    const values = [
      name,
      hqAddress,
      logoUrl,
    ];
    try {
      const { rows } = await dBase.query(queries.newParty(), values);
      return res.status(201).json({
        status: 201,
        message: 'political Party was successfully created!',
        data: [
          rows[0],
        ],
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error,
        message: 'Party cannot be created!',
      });
    }
  },

  async deleteParty(req, res) {
    try {
      const { rows } = await dBase.query(queries.deleteParty(), [req.params.id]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          message: 'Political Party record cannot be found!',
        });
      }
      return res.status(200).json({
        status: 200,
        message: 'Political Party was successfully deleted!',
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error,
        message: 'Party cannot be deleted!',
      });
    }
  },

  async editParty(req, res) {
    try {
      const values = [
        req.body.name,
        req.params.id,
      ];
      const { rows } = await dBase.query(queries.updateParty(), values);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          message: 'Party record cannot be found!',
        });
      }
      return res.status(200).json({
        status: 200,
        message: `Party name was successfully changed to '${rows[0].name}'`,
        data: rows,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error,
        message: 'Party name cannot be updated!',
      });
    }
  },
};

export default PartyController;
