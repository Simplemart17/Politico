import dBase from '../model/db';
import * as queries from '../model/queries';

const candidateController = {
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
      await dBase.query(queries.updateInterestStatus(), [rows[0].office, rows[0].candidate]);
      return res.status(201).json({
        status: 201,
        message: 'You have successfully registered as candidate!',
        data: [{
          office: rows[0].office,
          user: rows[0].candidate,
        }],
      });
    } catch (error) {
      return res.status(422).json({
        status: 422,
        message: 'The submission was not accepted!',
      });
    }
  },

  async candidateInterest(req, res) {
    const candidate = req.user.id;
    const { party, office } = req.body;
    const values = [
      party,
      office,
      candidate,
    ];
    try {
      const { rows } = await dBase.query(queries.candidateInterest(), values);
      return res.status(201).json({
        status: 201,
        message: 'You have successfully submitted your interest!',
        data: [
          rows[0],
        ],
      });
    } catch (error) {
      return res.status(422).json({
        status: 422,
        message: 'You are allowed to register only once!',
      });
    }
  },

  async getAllCandidates(req, res) {
    try {
      const { rows } = await dBase.query(queries.getInterestedCandidate());
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          message: 'No record found!',
          data: [
            {},
          ],
        });
      }
      return res.status(200).json({
        status: 200,
        message: 'Lists of candidates successfully retrieved!',
        data: rows,
      });
    } catch (error) {
      return res.status(422).json({
        status: 422,
        message: 'Candidates lists cannot be fecthed',
      });
    }
  },
};

export default candidateController;
