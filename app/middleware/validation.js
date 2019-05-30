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

const inputCheck = (arg, min, max) => check(arg)
  .trim()
  .isLength({ min, max })
  .withMessage(`Input must be minimum of ${min} character`)
  .isString()
  .withMessage('This field is required!');
const middleware = {
  signUp: [
    inputCheck('firstname', 3),
    inputCheck('lastname', 3),
    inputCheck('password', 6),
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
    inputCheck('name', 8),
    inputCheck('hqAddress', 8),
    validatorFunction,
  ],
  createOffice: [
    inputCheck('name'),
    inputCheck('type'),
    validatorFunction,
  ],
  editParty: [
    inputCheck('name', 8),
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

  voteInput: [
    candidateInputCheck('office'),
    candidateInputCheck('candidate'),
    validatorFunction,
  ],
};
export default middleware;
