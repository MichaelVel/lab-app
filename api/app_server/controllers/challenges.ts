import { Request, Response } from 'express';
import { Challenge } from '../models/challenge';

export const challengeList = (req: Request, res: Response) => {
};

export const challengeCreate = (req: Request, res: Response) => {
  console.log(req.body);
  res
    .status(201)
    .json({"test": req.body});
};

export const challengeReadOne = (req: Request, res: Response) => {
  Challenge
    .findById(req.params.challengeid)
    .exec( (err, challenge) => {
      if (!challenge) {
        return res
          .status(404)
          .json({
            "message": "challenge not found"
          });
      } else if (err) {
        return res
          .status(404)
          .json(err);
      }
      res
        .status(200)
        .json({"status": "yes", "response": challenge });
    }); 
};

export const challengeUpdateOne = (req: Request, res: Response) => {
};

export const challengeDeleteOne = (req: Request, res: Response) => {
};

