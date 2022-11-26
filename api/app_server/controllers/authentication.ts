import { Request, Response } from 'express';
import passport from 'passport';
import { User } from "../models/users";

export const register = (req: Request, res: Response) => {
  if (!req.body.name || !req.body.email || !req.body.password || !req.body.role) {
    return res
      .status(400)
      .json({"message": "Todos los campos requeridos"});
  }

  const user = new User({...req.body});
  user.setPassword(req.body.password);

  user.save((err:any) => {
    if (err) {
      console.log({...err});
      if (err.code === 11000) {
        err.message = 'name' in err.keyPattern
        ? "El nombre de usuario ya se encuentra registrado."
        : "Este correo electronico ya se encuentra registrado." 
      } else {
        err.message = "Error desconocido. Vuelva a intentarlo más tarde."
      }

      res
        .status(400)
        .json({message: err.message});
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

