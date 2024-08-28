import IUser from "./IUser";
import { Request } from 'express';

export interface AuthRequest extends Request {
  user: IUser|null; 
}