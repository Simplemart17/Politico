import moment from 'moment';
import officedb from '../model/officedb';

class officeController {
  static createOffice(req, res) {
    const data = {
      id: officedb.length + 1,
      type: req.body.type,
      name: req.body.name,
      createdOn: moment(),
    };
    officedb.push(data);
    return res.status(201).json({
      message: 'Political Office was successfully created!',
      status: 201,
      data,
    });
  }

  static getAllOffice(req, res) {
    return res.status(200).json({
      message: 'Government office lists was successfully retrieved',
      status: 200,
      data: officedb,
    });
  }

  static getOffice(req, res) {
    const id = parseInt(req.params.id, 10);
    officedb.map((data) => {
      if (data.id === id) {
        return res.status(200).json({
          message: 'Government office was successfully retreived!',
          status: 200,
          data,
        });
      }
      return null;
    });
    return res.status(404).json({
      status: 404,
      error: 'Governmenent office does not exist!',
    });
  }
}

export default officeController;
