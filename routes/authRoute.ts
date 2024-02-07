import express from "express";
import passport from "passport";
import { forwardAuthenticated } from "../middleware/checkAuth";

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    failureMessage: true,
  })
);

// router.post('/login', (req, res, next) => {
//   passport.authenticate('local', (err, user, info) => {
//     if (err) { return next(err); }
//     if (!user) {
//       req.session.errorMessage = info.message;
//       return res.redirect('/auth/login');
//     }
//     req.logIn(user, (err) => {
//       if (err) { return next(err); }
//       return res.redirect('/dashboard');
//     });
//   })(req, res, next);
// });


router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  res.redirect("/auth/login");
});

export default router;
