import User from '../models/User.js';
import  { body, validationResult } from 'express-validator';
import  validator from 'validator';


export const sign_up = async (req, res) => {
    let success = false
    //if there are errors return bad request and errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        //find user with this email already exists
        let user = await User.findOne({ email: req.body.email })
        
        
        if (user) {
            if(user.googleId!==""){
                return res.status(400).json({ success, error: 'Try to sign-in with google' })
            }else{
                return res.status(400).json({ success, error: 'heyy!!' })
            }
           
        }
        
        
        user = await User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email
        });

        
        // Generate JWT Token
        const authToken = user.getJwtToken();

        res.status(201).json({ success: true, authToken });

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ success, error: 'Server error' });
    }
}



export const sign_in =  async (req, res) => {
    let success = false;
    try {
       
        const { user, email, password } = req.body;
        // handle login with google
        if (user) {
            let userG = await User.findOne({ email: user.email });
            if (userG) {
                if (userG.googleId === "") {
                    return res.status(400).json({ success, error: 'Try login with traditional login' })
                } else {
                    // Generate JWT Token
                     let authToken = userG.getJwtToken();
                    return res.status(201).json({ success: true, authToken, message: 'You are successfully login with google' });
                }
            } else {
                userG = await User.create({
                    name: user.name,
                    email: user.email,
                    password:user.password,
                    googleId: user.sub, 
                });

                 // Generate JWT Token
                    let authToken = userG.getJwtToken();

               
                return res.status(201).json({ success: true, authToken, message: 'User signed up with Google successfully' });
            }
        }


        const errors = [];
        // Check if email is present and valid
        if (!email || !validator.isEmail(email)) {
            errors.push({ msg: 'Enter a valid email address' });
        }

        // Check if password is present
        if (!password || password.trim().length === 0) {
            errors.push({ msg: 'Password cannot be empty' });
        }

        if (errors.length > 0) {
            return res.status(400).json({ success, errors });
        }




        //finding user with email
        const userL = await User.findOne({ email });

        if (!userL) {
            return res.status(400).json({ success, error: 'Please try to login with correct credentials' })
        }
        
        if(userL.googleId!=="")return res.status(400).json({ success, error: 'Try login with google' })
        // Check if password is correct
       const isPasswordMatched = await userL.comparePassword(password);
        if (!isPasswordMatched) {
            return res.status(400).json({ success, error: 'Please try to login with correct credentials' })
        }

        /// Generate JWT Token
        let authToken = userL.getJwtToken();

        res.status(201).json({ success: true, authToken });


    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ success, error: 'Server error' });
    }

}

export const getUser = async (req, res) => {

    try {
        const userId = req.userId;
        let user = await User.findById(userId).select('-password')
        if (!user) { return res.status(401).send({ error: 'User not find with this token' }) }
        res.status(201).json({ user })
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Server error' });
    }

}

