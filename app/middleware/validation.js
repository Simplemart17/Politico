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

const candidateInputCheck = (arg, min, max) => check(arg)
  .trim()
  .isInt()
  .withMessage('This field is required to be an integer!');

const idCheck = (arg, min, max) => check(arg)
  .trim()
  .isInt()
  .withMessage('Id should be an integer');

const integerCheck = (arg, min, max) => check(arg)
  .trim()
  .isLength({ min, max })
  .withMessage(`Phone number must be between ${min} - ${max}`)
  .isInt()
  .withMessage('The field must be an integer');

const inputCheck = (arg, min, max) => check(arg)
  .trim()
  .isLength({ min, max })
  .withMessage(`Input must be between ${min} - ${max} character`)
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
    inputCheck('name', 8, 20),
    validatorFunction,
  ],

  idParamsCheck: [
    idCheck('id'),
    validatorFunction,
  ],

  candidateInput: [
    candidateInputCheck('party'),
    candidateInputCheck('office'),
    validatorFunction,
  ],
};
export default middleware;
