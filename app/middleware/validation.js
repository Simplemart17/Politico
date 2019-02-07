import { check, validationResult } from 'express-validator/check';

const validatorFunction = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 400,
      errors: errors.array(),
    });
  }
  return next();
};

const integerCheck = (arg, min, max) => check(arg)
  .escape()
  .trim()
  .isLength({ min, max })
  .withMessage(`Phone number must be between ${min} -${max}`, 11, 13)
  .isInt()
  .withMessage('The field must be an integer');

const inputCheck = (arg, min, max) => check(arg)
  .escape()
  .trim()
  .isLength({ min, max })
  .isString()
  .withMessage('This field is required!');
const middleware = {
  signUp: [
    inputCheck('firstname'),
    inputCheck('password'),
    inputCheck('lastname'),
    inputCheck('othername'),
    integerCheck('phoneNumber', 11, 13),
    check('email').trim().isEmail().normalizeEmail()
      .withMessage('email is required!'),
    validatorFunction,
  ],
  signIn: [
    check('email').trim().isEmail().normalizeEmail()
      .withMessage('email is required'),
    validatorFunction,
  ],
  createParty: [
    inputCheck('name'),
    inputCheck('hqAddress'),
    validatorFunction,
  ],
  createOffice: [
    inputCheck('name'),
    inputCheck('type'),
    validatorFunction,
  ],
  editParty: [
    inputCheck('name'),
    validatorFunction,
  ],
};
export default middleware;
