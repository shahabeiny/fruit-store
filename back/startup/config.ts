import fileUpload from 'express-fileupload';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { Express } from 'express';

type ConfigProjectParams = {
  app: Express;
  express: typeof import('express');
};

const configProject = ({ app, express }: ConfigProjectParams) => {
  app.use(express.json());
  app.use(cookieParser());
  app.use(morgan("common"));
  app.use(cors({
    origin: true,
    credentials: true
  }));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static("public"));

  app.use(fileUpload({
    createParentPath: true,
    useTempFiles: true,
    tempFileDir: "/tmp",
  }));
};

export default configProject;
