const router = require('express-promise-router')();
// import user controllers
const { SignUp, ViewUsers, Update, LogIn } = require('../controllers/users');
// import schemas
const { signUpSchema, userUpdateSchmema, loginSchema } = require('../helpers/schemas/users');
// import validators
const { validateBody, authenticate } = require('../helpers/validations');

//routes
router.route('/signup').post(validateBody(signUpSchema), SignUp);
router.route('/login').post(validateBody(loginSchema), LogIn);
router.route('/:userID').patch([ authenticate, validateBody(userUpdateSchmema) ], Update);
router.route('/').get(authenticate, ViewUsers);

module.exports = router;
