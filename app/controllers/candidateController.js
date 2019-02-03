import dBase from '../model/db';
import * as queries from '../model/queries';

export default {
  async registerCandidate(req, res) {
    const { office, candidate } = req.body;
    const values = [
      office,
      req.params.id,
    ];
    try {
      const { rows } = await dBase.query(queries.newCandidate(), values);
      return res.status(201).json({
        message: 'You have successfully registered as candidate!',
        data: [{
          id: rows[0].id,
          office: rows[0].office,
          user: rows[0].candidate,
        }],
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
