const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

passport.use(
  new GoogleStrategy(
    {
      clientID: "696276461235-24u6m1vvpe0jfmj3enut3hv26q85kbvd.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://locslhost:8080/auth/google/callback",
      scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, callback) {
      callback(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
