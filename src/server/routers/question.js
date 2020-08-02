const router = require('express-promise-router')();
//import question controllers
const { create, updateByID, getQuestionsByCategory, getQuestionsByTopic } = require('../controllers/question');
//import Schemas
const {questionSchema} = require('../helpers/schemas/questions')
//import validators
const { authenticate, validateBody } = require('../helpers/validations');

//routes
router.route('/').post([ authenticate,validateBody(questionSchema) ], create);
router.route('/:questionID').patch([ authenticate ], updateByID);
router.route('/topic/:topic').get( getQuestionsByTopic);
router.route('/category/:category').get([ authenticate ], getQuestionsByCategory);

module.exports = router;
