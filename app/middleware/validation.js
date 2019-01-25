
// Function to check for input
let error = '';
const whiteSpace = /^\s+$/g;

class Validation {
  static input(req, res, next) {
    const { name, hqAddress, logoUrl } = req.body;
    if (!name || name.match(whiteSpace)) {
      error = 'Name field is required!';
    } else if (!hqAddress || hqAddress.match(whiteSpace)) {
      error = 'Enter headquarter address of the party!';
    } else if (!logoUrl || logoUrl.match(whiteSpace)) {
      error = 'Please upload party logo!';
    }
    if (error) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }
    return next();
  }
}

export default Validation;
