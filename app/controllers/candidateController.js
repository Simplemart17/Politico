import dBase from '../model/db';
import * as queries from '../model/queries';

export default {
  async registerCandidate(req, res) {
    const candidate = req.params.id;
    const { party, office } = req.body;
    const values = [
      party,
      office,
      candidate,
    ];
    try {
      const { rows } = await dBase.query(queries.newCandidate(), values);
      return res.status(201).json({
        message: 'You have successfully registered as candidate!',
        data: [{
          office: rows[0].office,
          user: rows[0].candidate,
        }],
      });
    } catch (error) {
      console.log(error);
      return res.status(422).json({
        status: 422,
        message: 'The submission was not accepted!',
      });
    }
  },
};
