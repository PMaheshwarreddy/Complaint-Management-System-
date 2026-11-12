import passport from "passport";
// import GoogleStrategy from "passport-google-oauth20";
import { Strategy } from "passport-google-oauth20";
import { User, UserTypes } from "../models/UserModel.js";
import AsyncHandler from "express-async-handler";
import { backendDomain } from "../constants.js";
const GoogleStrategy = Strategy;

const getRollNo = (email) => {
  const match = email.match(/\d{2}[a-zA-Z]{3}\d{1,4}/i);

  if (match) {
    return match[0].toUpperCase();
  } else {
    return email.split("@")[0];
  }
};

const getUserObjectFromProfile = (profile) => {
  return {
    googleId: profile.id,
    displayName: profile.displayName || profile.name?.givenName || "User",
    email: profile.emails[0].value,
    userType: UserTypes.Complainant,
    rollNo: getRollNo(profile.emails[0].value),
  };
};

export function GoogleAuth() {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    console.warn("⚠️ Google OAuth credentials not set in backend/.env. Passport GoogleStrategy skipped.");
    return;
  }
  // Configure Passport to use the Google OAuth 2.0 strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        // callbackURL: `http://${serverIp}:${process.env.PORT}/grievance/auth/google/callback`,
        callbackURL: `${backendDomain}/grievance/auth/google/callback`,
      },
      AsyncHandler(async function (accessToken, refreshToken, profile, cb) {
        try {
          // Extract the user's email from the profile information
          let userEmail =
            profile.emails && profile.emails[0]
              ? profile.emails[0].value
              : null;
          if (!userEmail) throw new Error("No email found");

          let user = await User.findOne({ email: userEmail });
          // If the user doesn't exist, create a new user
          if (!user) {
            const allowedDomain = process.env.ALLOWED_EMAIL_DOMAIN;
            if (allowedDomain && !userEmail.endsWith(`@${allowedDomain}`)) {
              throw new Error(`Only @${allowedDomain} emails are allowed`);
            }
            await User.create(
              getUserObjectFromProfile(profile),
            );
          } else if (!user.googleId || user.flag) {
            user.googleId = profile.id;
            user.displayName = profile.displayName || profile.name?.givenName || user.displayName;
            await user.save();
          }
          // Pass the profile information to the next middleware
          return cb(null, profile);
        } catch (error) {
          cb(error, null);
        }
      }),
    ),
  );

  // Configure Passport to serialize and deserialize user instances to and from the session
  // Configure Passport to serialize and deserialize user instances to and from the session
  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  passport.deserializeUser(function (user, done) {
    done(null, user);
  });
}

