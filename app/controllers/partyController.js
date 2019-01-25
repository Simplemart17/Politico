import partydb from '../model/partydb';

class PartyController {
  static getAllParty(req, res) {
    return res.status(200).json({
      message: 'Political Party list was successfully retrieved',
      status: 200,
      data: partydb,
    });
  }

  static getParty(req, res) {
    const id = parseInt(req.params.id, 10);
    partydb.map((data) => {
      if (data.id === id) {
        return res.status(200).json({
          message: 'Party record retrieved successfully!',
          status: 200,
          data,
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'Party record does not exist!',
      });
    });
  }

  static createParty(req, res) {
    const data = {
      id: partydb.length + 1,
      name: req.body.name,
      hqAddress: req.body.hqAddress,
      logoUrl: req.body.logoUrl,
    };
    partydb.push(data);
    return res.status(201).json({
      message: 'political Party was successfully created!',
      status: 201,
      data,
    });
  }
}

export default PartyController;
