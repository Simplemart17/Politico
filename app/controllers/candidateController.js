import dBase from '../model/db';
import * as queries from '../model/queries';

export default {
  async registerCandidate(req, res) {
    const { office, candidate } = req.body;
    const values = [
      office,
      candidate,
    ];
    try {
      const { rows } = await dBase.query(queries.newCandidate(), values);
      return res.status(201).json({
        message: 'You have successfully registered as candidate!',
        data: [
          rows[0],
        ],
      });
    } catch (error) {
      return res.status(422).json({
        status: 422,
        error,
        message: 'The submission was not accepted!',
      });
    }
  },
};
