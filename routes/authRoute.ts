//authRoute.ts
import express from "express";
import passport from "passport";
import { forwardAuthenticated } from "../middleware/checkAuth";

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => {
  
  res.render("login", { test: req.session.messages });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      req.flash('error', err.message);
      req.session.messages = err.message
      return res.redirect('/auth/login');
    }
    if (!user) {
      req.flash('error', info.message);
      req.session.messages = info.message
      return res.redirect('/auth/login');
    }
    req.logIn(user, (err) => {
      if (err) {
        req.flash('error', err.message);
        return res.redirect('/auth/login');
      }
      return res.redirect('/dashboard');
    });
  })(req, res, next);
});


router.get('/test', (req, res, next) => {
  req.session.messages = req.query.test
  return res.redirect('/auth/login');
});


router.get('/github', passport.authenticate('github'));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/dashboard');
  }
);


router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  res.redirect("/auth/login");
});

export default router;
