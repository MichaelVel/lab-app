import { Request, Response } from 'express';
import { Solution } from '../models/solution';

export const solutionList = (req: Request, res: Response) => {
  // TODO 
};

export const solutionCreate = (req: Request, res: Response) => {
  Solution.create({...req.body }, (err: any, challenge: any) => {
    if (err) {
      res
        .status(400)
        .json(err);
    } else {
      res
        .status(201)
        .json(challenge);
    }
  });
};

export const solutionReadOne = (req: Request, res: Response) => {
  Solution
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

export const solutionUpdateOne = (req: Request, res: Response) => {
  const { challengeid } = req.params;

  if (!challengeid) {
    return res
      .status(404)
      .json({
        "message": "Not found, challenge id is required"
      });
  }

  Solution.findByIdAndUpdate(
    req.params.challengeid,
    {...req.body }, 
    (err: any, challenge: any) => {
    if (err) {
      res
        .status(400)
        .json(err);
    } else if (!challenge) {
      res
        .status(404)
        .json({"message": "Challenge not found"});
    } else {
      res
        .status(200)
        .json(challenge);
    }
  });
};

export const solutionDeleteOne = (req: Request, res: Response) => {
  const { challengeid, solutionid } = req.params;

  if (!challengeid) {
    return res
      .status(404)
      .json({
        "message": "Not found, challenge id is required"
      });
  }

  Solution.findByIdAndDelete(
    challengeid,
    (err: any, challenge: any) => {
    if (err) {
      res
        .status(404)
        .json(err);
    } else if (!challenge) {
      res
        .status(404)
        .json({"message": "Challenge not found"});
    } else {
      res
        .status(204)
        .json(challenge);
    }
  });
};

