import * as express from 'express';


declare global {
  namespace Express {
    interface Request {
      files?:any;
      user?:AuthRequest | null
    }
  }
}
