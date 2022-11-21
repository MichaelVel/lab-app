import express, {Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import apiRouter from './app_server/routes/index';
import passport from 'passport';

require('./app_server/models/db')
require('./app_server/config/passport')

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(passport.initialize());

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

app.get('/express', (req: Request, res: Response) => {
    res.send({token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzc2OGYxYWJlMmI1NGY1MDYxMDM3MjQiLCJlbWFpbCI6InRlc3Q1QHVzZXIuY29tIiwibmFtZSI6InRlc3RVc2VyMSIsInJvbGUiOiJpbnN0cnVjdG9yIiwiZXhwIjoxNjY5Mzk4ODU2LCJpYXQiOjE2Njg3OTQwNTZ9.IRvOiroEM8uBBZHYc3Z3tE5k8DvPy720zbR0R40bAhg'});
});
