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
}

export default officeController;
