import partydb from '../model/partydb';

class PartyController {
  static getAllParty(req, res) {
    return res.status(200).json({
      status: 200,
      data: partydb,
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
      status: 201,
      data,
    });
  }
}

export default PartyController;
