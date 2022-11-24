import { Request, Response } from 'express';
import { Challenge } from '../models/challenge';
import { subWeeks } from 'date-fns';

export const challengeList = async(req: Request, res: Response) => {
  const {filter} = req.query;
  const lastWeek = subWeeks(new Date(), 1);
  try {
    const results = filter 
      ? await Challenge.aggregate([
        { 
          $match: {
            [filter as string ]: "published"  // Harcoded TODO: link with data of 
                                              // searchbar.
          }
        }
      ]) 
      : await Challenge.aggregate([
        {
          $match: {
            creationDate: { $gte: lastWeek }
          }
        }
      ]);

    res
      .status(200)
      .json(results)
  } catch (err) {
    res
      .status(404)
      .json(err);
  }
};

export const challengeCreate = (req: Request, res: Response) => {
  if (req.auth.role !== 'instructor') {
    res
      .status(403)
      .json({ message: "Only for instructors"});
  }

  if (req.headers['content-type']?.includes('multipart/form-data')) {
    console.log('hello');
    res
      .status(201)
      .json({"success": true});
  }

  Challenge.create({...req.body, user: req.auth._id }, (err: any, challenge: any) => {
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
  const { challengeid } = req.params;

  if (req.auth.role !== 'instructor') {
    res
      .status(403)
      .json({ "message": "Only for instructors"});
  }

  if (!challengeid) {
    return res
      .status(404)
      .json({
        "message": "Not found, challenge id is required"
      });
  }

  Challenge
    .findById(req.params.challengeid)
    .exec((err: any, challenge: any) => {
      if (err) {
        res
          .status(400)
          .json(err);
      } else if (!challenge) {
        res
          .status(404)
          .json({"message": "Challenge not found"});
      } else if (challenge.user !== req.auth._id) {
        res
          .status(403)
          .json({"message": "User id does not match"});
      }

      challenge = {...challenge, ...req.body};
      challenge.save((err: any, challenge: any) => {
        if (err) {
          res
            .status(404)
            .json(err);
        } else {
          res
            .status(200)
            .json(challenge)
        }
      });
    });
};

export const challengeDeleteOne = (req: Request, res: Response) => {
  const { challengeid } = req.params;

  if (!challengeid) {
    return res
      .status(404)
      .json({
        "message": "Not found, challenge id is required"
      });
  }

  Challenge.findByIdAndDelete(
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

