const passport = require("passport");
//const jwt = require("jsonwebtoken")
const GoogleStrategy = require("passport-google-oauth20").Strategy;
//const keys = require("./key");
const User = require("../models/user");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      // options for google strategy
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      callbackURL: "https://taslens.onrender.com/auth/google/redirect",
    },
    // (accessToken, refreshToken, profile, done) => {
   
    //    // Check if user with same email or id exists in DB if not create one and save in DB
    //    const token = jwt.sign({ googleId:profile.id }, keys.session.JWTSecretKey,{ expiresIn:'14d'});
       

    //   // check if user already exists in our own db
    //   User.findOne({ googleId:profile.id }).then((currentUser) => {
    //     if (currentUser) {
    //       // already have this user
    //       console.log("user is: ", currentUser);
    //       done(null, currentUser);
    //     } else {
    //       // if not, create user in our db
    //       new User({
    //         googleId: profile.id,
    //         name: profile.displayName,
    //         email:profile.email,
    //         password:profile.password,
    //         verified:true,
    //         token:token,
    //       })
    //         .save()
    //         .then((newUser) => {
    //           console.log("created new user: ",newUser,bearToken)
    //           done(null, newUser);
    //         });
    //     }
    //   });
    // }

    /*======================================================== */
    (accessToken, refreshToken, profile, done) => {
      // console.log(profile);
      User.findOne({ googleid: profile.id }).then((currentUser) => {
        if (currentUser) {
          console.log(`User is ${currentUser}`);
          done(null, currentUser);
        } else {
          new User({
            googleId: profile.id,
                    name: profile.displayName,
                    email:profile.email,
                   password:profile.password,
                 verified:true,
          })
            .save()
            .then((newUser) => {
              console.log(`new user created ${newUser}`);
              done(null, newUser);
            });
        }
      });
      const dataInfo = {
        status: "success",
        message: "login successfull",
        accessToken:  accessToken,
      };
    console.log(dataInfo);
    }
  )
);
