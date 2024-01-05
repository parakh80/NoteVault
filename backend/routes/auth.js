const express = require('express') ;
const Router = express.Router();
const { body, validationResult } =require('express-validator');
const fetchUser = require('../middleware/fetchUser');

const { sign_up, sign_in, getUser } =require('../controllers/authController');

//Route 1 : Creating a anew User using POST '/api/auth/sign-up'.   no login required!
Router.post('/sign-up', [
    body('name', 'Enter valid name (must be at least 3 characters)').isLength({ min: 3 }),
    body('email', 'Enter valid email').isEmail(),
    body('password', 'Enter valid password (must contain at least 5 characters)').isLength({ min: 5 })
], sign_up );

//Route 2 : Authenticate user using POST '/api/auth/sign-in' no login required
Router.post('/sign-in',sign_in);

//Route 3 : Get logged  user detail  using POST '/api/auth/getUser' login required.
Router.post('/getUser',fetchUser, getUser);

module.exports = Router;