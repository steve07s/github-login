import express from "express";
const router = express.Router();
import { ensureAuthenticated,ensureAdminRole } from "../middleware/checkAuth";
import passport from 'passport';


router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
});

router.get("/admin", ensureAdminRole, (req, res) => {
  // 提取所有 sessions
  if (req.sessionStore.all) {
    req.sessionStore.all((error, sessions) => {
      if (error) {
        console.error('Error retrieving sessions:', error);
        return res.status(500).send('Error retrieving sessions');
      }

      const typedSessions = sessions as { [sid: string]: any };

      if (typedSessions) {
        console.log(sessions)
        const activeSessions = Object.keys(typedSessions).map(sessionId => {
          const session = typedSessions[sessionId];
          const userID = session.passport ? session.passport.user : 'Unknown';


          return {
            sessionId: sessionId,
            userID: userID,
            revokeLink: `/revoke-session/${sessionId}` // 這是指向註銷路由的連結
          };
        });

        res.render("adminDashboard", {
          user: req.user,
          sessions: activeSessions,
          messages: req.flash('info'),
        });
      } else {
        // 如果 sessions 是 null 或 undefined，傳遞一個空陣列到模板
        res.render("adminDashboard", {
          user: req.user,
          sessions: [],
          messages: req.flash('info'),
        });
      }
    });
  }

});

router.get("/revoke-session/:sessionId", ensureAuthenticated, (req, res) => {
  const sessionIdToRevoke = req.params.sessionId;

  req.sessionStore.destroy(sessionIdToRevoke, (error) => {
    if (error) {
      return res.status(500).send('Error revoking session');
    }
    req.flash('info', `Session ${sessionIdToRevoke} has been revoked.`)
    return res.redirect('/admin');
  });
});

export default router;
