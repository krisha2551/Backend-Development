import dotenv from "dotenv";
dotenv.config({ path: "./.env" }); 


import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("Google Profile:", profile);

        return done(null, profile);
    }
  )
);



export default passport;