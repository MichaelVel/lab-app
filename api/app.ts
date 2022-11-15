import express, {Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import apiRouter from './app_server/routes/index';


require('./app_server/models/db')
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use('/api', apiRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('Express + Typescript Server. Test Change');
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

