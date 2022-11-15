import { Request, Response } from 'express';
import { Challenge } from '../models/challenge';

export const challengeList = (req: Request, res: Response) => {
};

export const challengeCreate = (req: Request, res: Response) => {
};

export const challengeReadOne = (req: Request, res: Response) => {
  res
    .status(200)
    .json({"status" : "success"})
};

export const challengeUpdateOne = (req: Request, res: Response) => {
};

export const challengeDeleteOne = (req: Request, res: Response) => {
};

