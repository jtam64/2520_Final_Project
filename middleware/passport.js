const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GitHubStrategy = require("passport-github").Strategy;
const userController = require("../controller/userController");
require('dotenv').config();

const githubLogin = new GitHubStrategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:3001/auth/github/callback",
        scope: 'user:email read:user',
    },
    // function (accessToken, refreshToken, profile, done) {
    //     done(null, profile.id);
    // }
    // function (accessToken, refreshToken, profile, done) {
    //     // asynchronous verification, for effect...
    //     process.nextTick(function () {

    //         // To keep the example simple, the user's GitHub profile is returned to
    //         // represent the logged-in user.  In a typical application, you would want
    //         // to associate the GitHub account with a user record in your database,
    //         // and return that user instead.
    //         return done(null, profile);
    //     });
    // }
    (accessToken, refreshToken, profile, done) => {
        const user = userController.getUserByGithubId(profile.id);
        if (user) {
            return done(null, user);
        } else {
            const newUser = userController.createUserByGithubId(profile.id);
            return done(null, newUser);
            // return done(null, false, {
            //     message: "Your login details are not valid. Please try again",
            // });
        }
    }
);

const localLogin = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user)
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  let user = userController.getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

module.exports = passport.use(githubLogin);
module.exports = passport.use(localLogin);
