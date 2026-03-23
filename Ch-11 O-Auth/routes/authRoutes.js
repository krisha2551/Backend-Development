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
    failureRedirect: "/auth/login",
  }),
  (req, res) => {
    res.redirect("/profile");
  }
);


// Logout
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

export default router;