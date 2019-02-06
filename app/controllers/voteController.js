import dBase from '../model/db';
import * as queries from '../model/queries';

const voteController = {
  async voteCandidate(req, res) {
    const voter = req.user.id;
    const { office, candidate } = req.body;
    const values = [
      office,
      candidate,
      voter,
    ];
    try {
      const { rows } = await dBase.query(queries.newVote(), values);
      return res.status(201).json({
        message: 'Your vote successfully submitted!',
        data: [{
          office: rows[0].office,
          candidate: rows[0].candidate,
          voter: rows[0].voter,
        }],
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message: 'Submission fails!',
      });
    }
  },

  async voteResult(req, res) {
    try {
      const { rows } = await dBase.query(queries.getResults(), [req.params.id]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'Result for election not found!',
        });
      }
      return res.status(201).json({
        status: 201,
        message: 'Election results was successfully retrieved',
        data: [
          rows[0],
        ],
      });
    } catch (error) {
      return res.status(404).json({
        status: 404,
        message: 'Election result could not be fetched!',
      });
    }
  },
};

export default voteController;
