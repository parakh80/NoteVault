import express from 'express';
import { body, validationResult } from 'express-validator';
import {fetchUser}  from '../middleware/fetchUser.js';
import { sign_up, sign_in, getUser } from '../controllers/authController.js';

const Router = express.Router();

//Route 1 : Creating a anew User using POST '/api/auth/sign-up'.   no login required!
Router.post('/sign-up', [
    body('name', 'Enter valid name (must be at least 3 characters)').isLength({ min: 3 }),
    body('email', 'Enter valid email').isEmail(),
    body('password', 'Enter valid password (must contain at least 5 characters)').isLength({ min: 5 })
], sign_up );

//Route 2 : Authenticate user using POST '/api/auth/sign-in' no login required
Router.post('/sign-in', sign_in);

//Route 3 : Get logged  user detail  using POST '/api/auth/getUser' login required.
Router.post('/getUser', fetchUser, getUser);

export default Router;