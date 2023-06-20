import { NextFunction, Request, Response } from 'express';
import { Match } from '../models';

const getMatchesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const matches = await Match.findAll();
  console.log(matches);

  res.send(matches);
};

export default getMatchesController;
