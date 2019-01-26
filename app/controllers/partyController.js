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
      return null;
    });
    return res.status(404).json({
      status: 404,
      error: 'Party record does not exist!',
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

  static editParty(req, res) {
    const id = parseInt(req.params.id, 10);
    let foundParty;
    let itemIndex;
    partydb.map((data, index) => {
      if (data.id === id) {
        foundParty = data;
        itemIndex = index;
      }
    });
    if (!foundParty) {
      return res.status(404).json({
        status: 404,
        error: 'Party record is not found!',
      });
    }
    if (!req.body.name) {
      return res.status(400).json({
        status: 400,
        error: 'name field is required!',
      });
    }
    const newData = {
      id: foundParty.id,
      name: req.body.name || foundParty.name,
      hqAddress: foundParty.hqAddress,
      logoUrl: foundParty.logoUrl,
    };
    partydb.splice(itemIndex, 1, newData);

    return res.status(201).json({
      message: 'Party name was successfully edited!',
      status: 201,
      newData,
    });
  }
}

export default PartyController;
