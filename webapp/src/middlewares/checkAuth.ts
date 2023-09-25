import path from "path";
import { Request, Response, NextFunction } from 'express';
import { CustomError } from "../utils/CustomError";
import passport from 'passport';

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });


 function checkAuth(req: any, res: Response, next: NextFunction) {
  passport.authenticate('oauth-bearer', {
    session: false,
  }, (err, user, info) => {
    if (err) {
      return res.status(401).json({ error: err.message });
    }

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (info) {
      req.authInfo = info;
      return next();
    }
  })(req, res, next);
}

export default checkAuth;