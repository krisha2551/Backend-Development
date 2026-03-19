import express from "express";
import passport from "passport";

const router = express.Router();


// Login page
router.get("/login", (req, res) => {
  res.render("login");
});

// Google login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Callback
router.get(
  "/google/redirect",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session:false
  }),
  (req, res) => {
    res.send("This callback uri");
  }
);



export default router;