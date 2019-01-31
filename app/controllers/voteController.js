import dBase from '../model/db';
import * as queries from '../model/queries';

export default {
  async voteCandidate(req, res) {
    const { office, candidate, voter } = req.body;
    const values = [
      office,
      candidate,
      voter,
    ];
    try {
      const { rows } = await dBase.query(queries.newVote(), values);
      return res.status(201).json({
        message: 'You have successfully registered as candidate!',
        data: [
          rows[0],
        ],
      });
    } catch (error) {
      return res.json(error);
    }
  },
};
