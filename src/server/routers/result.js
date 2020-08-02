const router = require('express-promise-router')();
//import the resu;t controller
const { Save, resultsByUserID } = require('../controllers/result');
//import validators
const { authenticate, validateBody } = require('../helpers/validations');

router.route('/').post(authenticate, Save);
router.route('/score').get(authenticate, resultsByUserID);

module.exports = router;
