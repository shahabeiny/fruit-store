import express, { Express } from 'express';
import dotenv from 'dotenv';
import router from './src/routes/index';
import configProject from './startup/config';
import connectDB from './startup/db';
import logging from './startup/logging';

dotenv.config();

const app: Express = express();

configProject({ app, express });
connectDB();
logging();


app.use('/api', router);


const port = 4000;
app.listen(port, () => console.log(`listening on port : ${port}`));
