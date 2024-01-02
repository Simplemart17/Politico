import dBase from '../model/db';
import * as queries from '../model/queries';

const voteController = {
  async voteCandidate(req, res) {
    const voter = req.user.id;
    const { office, party, candidate } = req.body;
    const values = [office, party, candidate, voter];
    try {
      const { rows } = await dBase.query(queries.newVote(), values);
      await dBase.query(queries.updateVoteStatus(), [
        rows[0].office,
        rows[0].candidate,
      ]);

      res
        .status(201)
        .json({
          status: 201,
          message: 'Your vote successfully submitted!',
          data: [
            {
              office: rows[0].office,
              candidate: rows[0].candidate,
              voter: rows[0].voter,
            },
          ],
        });
    } catch (error) {
      res
        .status(400)
        .json({ message: 'You are allowed to vote once for a candidate' });
    }
  },

  async voteResult(req, res) {
    try {
      const { rows } = await dBase.query(queries.getResults(), [req.params.id]);
      if (!rows[0]) {
        res
          .status(404)
          .json({ status: 404, error: 'Result for election not found!' });
      }
      res
        .status(201)
        .json({
          status: 201,
          message: 'Election results was successfully retrieved',
          data: rows,
        });
    } catch (error) {
      res
        .status(404)
        .json({
          status: 404,
          message: 'Election result could not be fetched!',
        });
    }
  },
};

export default voteController;
