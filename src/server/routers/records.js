const router = require('express-promise-router')();
//import the result controller
const {saveRecord,getUsersRecords} = require('../controllers/records');
//import validators
const { authenticate, validateBody } = require('../helpers/validations');

router.route('/user').post(authenticate, saveRecord);
router.route('/').get(authenticate, getUsersRecords);

module.exports = router;