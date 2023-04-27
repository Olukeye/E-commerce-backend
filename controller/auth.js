 const User = require('../model/user')
 const jwt  = require('jsonwebtoken')
 const expressJwt = require('express-jwt'); //

//  signup to App =============================>
 exports.signup = (req, res) => {
   const user = new User(req.body)
   user.save((err, user) => {
     if(err) {
       return res.status(400).send(
         "not processed"
       );
     }
     console.log(user)
     user.salt = undefined
     user.hashed_password = undefined;
     res.json({user});
   });
 };
 
//  Signin to the app and check if user already exist ============>
 exports.signin = (req, res) => {
    //saerch for user with match email and password
    const { email , password } = req.body;
    
    User.findOne({ email }, (err, user) => {
      if (err || !user ) {
        return res.status(400).json({
          err: "User does not exist. Please signup !"
        });
      }
 
      if(!user.authenticate(password)) {
        return res.status(401).json({
          error : 'Email or password dont match!'
        })
      }

      const token = jwt.sign({_id: user._id},"" + process.env.JWT_SECRET);

      res.cookie('t', token, {expire: new Date() + 9999})

      const { _id, name, email, role } = user;
      return res.json({token, user: { _id, name, email, role }});
    });
 };
 

 

// Authentication route for a regular user 
exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if(!user) {
    return res.status(403).json({
      error: "Access Denied"
    })
  }
  next()
}

// route for only Admin =============================>
exports.isAdmin = (req, res, next) => {
  if(req.profile.role === 0) {
    return res.status(403).json({
      error: "Must be an Admin! Access not allowed"
    })
  }
  next()
}

// Signout of the App ===============================>
exports.signout = (req, res) => {
  res.clearCookie('t')
  res.json({
    message: "Signout successfully!"
  })
}

// proected route for only loged in user
exports.requireSignin = expressJwt({
  secret:"" + process.env.JWT_SECRET,
  userProperty: 'auth',
  algorithms:['HS256']
})