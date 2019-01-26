
import moment from 'moment';
import officedb from '../model/officedb';

class officeController {
  static getAllOffice(req, res) {
    return res.status(200).json({
      message: 'Government office lists was successfully retrieved',
      status: 200,
      data: officedb,
    });
  }
}

export default officeController;
