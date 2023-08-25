const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "kushagraisagood$boy";
const fetchUser = require('../middleware/fetchUser');

// This code is an Express router for handling authentication requests.
// It defines three routes:

// 1. `/createuser` allows users to create a new account.
//    * The user must provide their name, email, and password.
//    * The email and password are validated using the `express-validator` library.
//    * If the validation is successful, a new user is created and a JWT token is generated.
//    * The JWT token is returned to the user, which they can use to authenticate subsequent requests.


//ROUTE 1 : create a user using: POST '/api/auth/createuser' . Doesn't require auth/login
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password").isLength({ min: 3 }),
  ],
  async (req, res) => {
    let success = false;
    //If there are errors, return Bad req and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check whether the user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success, error: "Sorry user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password,salt);

      // Create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
    const data = {
        user:{
            id:user.id 
        }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    
    
    
     // res.json(user);
     success= true;
     res.json({success,"authToken":authToken});


    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
    // .then(user => res.json(user))
    //   .catch(err=> {console.log(err)
    //   res.json({error : "Please enter a valid email", message: err.message})})
  }
);

// 2. `/login` allows users to login to their account.
//    * The user must provide their email and password.
//    * The email is validated using the `express-validator` library.
//    * The password is compared to the password stored in the database.
//    * If the password is correct, a JWT token is generated and returned to the user.



//ROUTE 2: Authenticate a user using: POST: "/api/auth/login". No login required
router.post(
    "/login",
    [
      body("email", "Enter a valid email").isEmail(),
      body("password", "Password cannot be blank").exists(),
      
    ],
    async (req, res) => {
        let success = false;
         //If there are errors, return Bad req and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
          success = false;
            return res.status(400).json({error:"Please try to login with correct credentials"});
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!( passwordCompare)){
          success = false;
            return res.status(400).json({success,error:"Please try to login with correct credentials"});
        }

        const data = {
            user: {
                id: user.id 
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success= true;
        res.json({success,"authToken":authToken});

    } catch (error) {
        console.error(error.message);
      res.status(500).send("Internal server error");
    }
     

    })

// 3. `/getuser` allows authenticated users to get their user details.
//    * The user must be authenticated using the `fetchUser` middleware.
//    * The user's details are then returned to the user.

//ROUTE 3:Get loggedin user details using: POST: "/api/auth/getuser". Login required
router.post( "/getuser",fetchUser, async (req, res) => {
try {
    const userId = req.user.id; 
    const user = await User.findById(userId).select("-password");
    res.send(user);
} catch (error) {
    console.error(error.message);
      res.status(500).send("Internal server error");
}
    })
module.exports = router;


// The third route requires the user to be authenticated.
// The fetchUser middleware is used to get the currently authenticated user.
// The user's details are then returned to the user.

// The JWT_SECRET variable is used to sign the JWT tokens.
// This variable should be kept secret.

// The express-validator library is used to validate user input.
// This library provides a number of built-in validators, such as validators for email addresses and passwords.

// The bcrypt library is used to hash passwords.
// This helps to protect passwords from being stolen.

// The jsonwebtoken library is used to generate and verify JWT tokens.
// JWT tokens are a secure way to authenticate users.

// The fetchUser middleware is used to get the currently authenticated user.
// This middleware is useful for routes that only need to be accessed by authenticated users.

// The module.exports statement exports the router so that it can be used by other parts of the application.