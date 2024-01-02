import dBase from '../model/db';
import * as queries from '../model/queries';

const candidateController = {
  async registerCandidate(req, res) {
    const candidate = req.params.id;
    const { party, office } = req.body;
    const values = [party, office, candidate];
    try {
      const { rows } = await dBase.query(queries.newCandidate(), values);
      await dBase.query(queries.updateInterestStatus(), [
        rows[0].office,
        rows[0].candidate,
      ]);
      res
        .status(201)
        .json({
          status: 201,
          message: 'You have successfully registered as candidate!',
          data: [{ office: rows[0].office }],
        });
    } catch (error) {
      res
        .status(422)
        .json({ status: 422, message: 'The submission was not accepted!' });
    }
  },

  async candidateInterest(req, res) {
    const candidate = req.user.id;
    const { party, office } = req.body;
    const values = [party, office, candidate];
    try {
      const { rows } = await dBase.query(queries.candidateInterest(), values);
      res
        .status(201)
        .json({
          status: 201,
          message: 'You have successfully submitted your interest!',
          data: [rows[0]],
        });
    } catch (error) {
      res
        .status(422)
        .json({
          status: 422,
          message: 'You are allowed to register only once!',
        });
    }
  },

  async getAllCandidates(req, res) {
    try {
      const { rows } = await dBase.query(queries.getInterestedCandidate());
      if (!rows[0]) {
        res
          .status(404)
          .json({ status: 404, message: 'No record found!', data: [{}] });
      }
      res
        .status(200)
        .json({
          status: 200,
          message: 'Lists of candidates successfully retrieved!',
          data: rows,
        });
    } catch (error) {
      res
        .status(500)
        .json({ status: 500, message: 'Candidates lists cannot be fetched' });
    }
  },

  async getRegisteredCandidate(req, res) {
    try {
      const { rows } = await dBase.query(queries.getRegisteredCandidates());

      res
        .status(200)
        .json({
          status: 200,
          message: 'Lists of registered candidates successfully retrieved!',
          data: rows,
        });
    } catch (error) {
      res
        .status(500)
        .json({ status: 500, message: 'Candidates lists cannot be fetched' });
    }
  },
};

export default candidateController;
