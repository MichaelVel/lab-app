import { Request, Response } from 'express';
import passport from 'passport';
import { User } from "../models/users";

export const register = (req: Request, res: Response) => {
  console.log(req.body);
  if (!req.body.name || !req.body.email || !req.body.password || !req.body.role) {
    return res
      .status(404)
      .json({"message": "All fields required"});
  }

  const user = new User({...req.body});
  user.save((err) => {
    if (err) {
      res
        .status(404)
        .json(err);
      } else { 
        const token = user.generateJwt();
        res
          .status(200)
          .json({token});
      }
  });
};

export const login = (req: Request, res: Response) => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(404)
      .json({"message": "All fields required"});
  }
  passport.authenticate('local', (err: any, user: any, info: any) => {
    let token;
    if (err) {
      return res
        .status(404)
        .json(err);
    }
    if (user) {
      token = user.generateJwt();
      res
        .status(200)
        .json({token});
    } else {
      res
        .status(401)
        .json(info);
    }
  }) (req,res);
};

