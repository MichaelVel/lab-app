import express, {Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import apiRouter from './app_server/routes/index';
import passport from 'passport';
import path from 'path';

require('./app_server/models/db')
require('./app_server/config/passport')

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(passport.initialize());


console.log(path.join(__dirname, 'public', 'index.html'));
app.use(express.static(path.join(__dirname,'public')));
app.use('/api', apiRouter);

app.use((err: any, req: Request, res: Response, next: any) => {
  if (err.name === "UnauthorizedError") {
    res
      .status(401)
      .json({"message": err.name + ": " + err.message});
  }
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.get('/*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname,'public', 'index.html'));
});
