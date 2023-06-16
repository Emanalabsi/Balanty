import { Request, Response, NextFunction, RequestHandler } from 'express';
import CustomError from './CustomError';

const errorMappings: { [name: string]: number } = {
  JsonWebTokenError: 401,
  Unauthorized: 401,
  ValidationError: 422,
  NotFound: 404,
};

type ErrorType = InstanceType<typeof CustomError>;

const errorWrapper =
  (controller: RequestHandler) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (error: unknown) {
      const customError = error as ErrorType;
      const status = errorMappings[customError?.name as string];
      customError.status = status;
      next(customError);
    }
  };

export default errorWrapper;
