import { Request, Response, NextFunction } from 'express';

function trimBody(req: Request, res: Response, next: NextFunction): void {
  for (const key in req.body) {
    if (typeof req.body[key] === 'string') {
      req.body[key] = req.body[key].trim();
    }
  }
  next();
}

export default trimBody;
