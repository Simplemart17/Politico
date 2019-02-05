// export default Validation;
const whiteSpace = /^\s+$/g;
class Validation {
  // Validation for name
  static inputName(req, res, next) {
    let error = '';
    const { name } = req.body;
    const { id } = req.params;
    if (!name || name.match(whiteSpace)) {
      error = 'Name field is required!';
    }
    if (error) {
      return res.status(400).json({ error });
    }
    return next();
  }

  // validation for party creation
  static inputParties(req, res, next) {
    let error = '';
    const { hqAddress, logoUrl } = req.body;
    if (!hqAddress || hqAddress.match(whiteSpace)) {
      error += 'Enter headquarter address of the party!';
    }
    if (!logoUrl || logoUrl.match(whiteSpace)) {
      error += 'Please upload party logo!';
    }
    if (error) {
      return res.status(400).json({ error });
    }
    return next();
  }

  // Validation for office type input
  static officeType(req, res, next) {
    let error = '';
    const { type } = req.body;
    if (!type || type.match(whiteSpace)) {
      error += 'Type field cannot be empty';
    }
    if (error) {
      return res.status(400).json({ error });
    }
    return next();
  }

  // validation for users signup
  static userSignUp(req, res, next) {
    let error = '';
    const {
      firstname, lastname, othername, email, phoneNumber, username, password, passportUrl,
    } = req.body;
    if (!firstname || firstname.match(whiteSpace)) {
      error += 'Firstname field cannot be empty';
    }
    if (!lastname || lastname.match(whiteSpace)) {
      error += 'Enter your lastname';
    }
    if (!othername || othername.match(whiteSpace)) {
      error += 'Enter your othername';
    }
    if (!phoneNumber || phoneNumber.match(whiteSpace)) {
      error += 'Enter phone number';
    }
    if (!username || username.match(whiteSpace)) {
      error += 'Username is required!';
    }
    if (!password || password.match(whiteSpace)) {
      error += 'Password field cannot be empty';
    } if (!email || email.match(whiteSpace)) {
      error += 'Email field cannot be empty';
    }
    if (error) {
      return res.status(400).json({ error });
    }
    return next();
  }

  // validation for users signin
  static userSignIn(req, res, next) {
    let error = '';
    const { email, password } = req.body;
    if (!email || email.match(whiteSpace)) {
      error = 'Enter a valid email address!';
    }
    if (!password || password.match(whiteSpace)) {
      error += 'Password field cannot be empty';
    }
    if (error) {
      return res.status(400).json({ error });
    }
    return next();
  }
}
export default Validation;
