import dBase from '../model/db';
import * as queries from '../model/queries';

const PartyController = {
  async getAllParty(req, res) {
    try {
      const { rows, rowCount } = await dBase.query(queries.getParties());
      if (!rows[0]) {
        res.status(404).json({
          status: 404,
          message: 'No record found!',
          data: [{}],
        });
      }
      res.status(200).json({
        status: 200,
        message: 'Political Party list was successfully retrieved',
        data: rows,
        Total: rowCount,
      });
    } catch (error) {
      res.status(422).json({
        status: 422,
        message: 'Party list was not fetched',
      });
    }
  },

  async getParty(req, res) {
    try {
      const { rows } = await dBase.query(queries.getParty(), [req.params.id]);
      if (!rows[0]) {
        res.status(404).json({
          status: 404,
          message: 'Party record does not exist!',
          data: [{}],
        });
      }
      res.status(200).json({
        status: 200,
        message: 'Party record retrieved successfully!',
        data: [rows[0]],
      });
    } catch (error) {
      res.status(422).json({
        status: 422,
        message: 'Party list cannot be fetched',
      });
    }
  },

  async createParty(req, res) {
    const { name, hqAddress, logoUrl } = req.body;
    const values = [name, hqAddress, logoUrl];
    try {
      const { rows } = await dBase.query(queries.newParty(), values);
      res.status(201).json({
        status: 201,
        message: 'political Party was successfully created!',
        data: [
          {
            id: rows[0].id,
            name: rows[0].name,
          },
        ],
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: 'Party cannot be created!',
      });
    }
  },

  async deleteParty(req, res) {
    try {
      const { rows } = await dBase.query(queries.deleteParty(), [
        req.params.id,
      ]);
      if (!rows[0]) {
        res.status(404).json({
          status: 404,
          message: 'Political Party record cannot be found!',
        });
      }
      res.status(200).json({
        status: 200,
        data: [
          {
            message: 'Political Party was successfully deleted!',
          },
        ],
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: 'Party cannot be deleted!',
      });
    }
  },

  async editParty(req, res) {
    try {
      const values = [req.body.name, req.params.id];
      const { rows } = await dBase.query(queries.updateParty(), values);
      if (!rows[0]) {
        res.status(404).json({
          status: 404,
          message: 'Party record cannot be found!',
        });
      }
      res.status(200).json({
        status: 200,
        message: `Party name was successfully changed to '${rows[0].name}'`,
        data: [
          {
            id: rows[0].id,
            name: rows[0].name,
          },
        ],
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: 'Party name cannot be updated!',
      });
    }
  },
};

export default PartyController;
