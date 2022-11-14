import express, {Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import * as db from './app_server/models/db';
//require('./app_server/models/db')

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Express + Typescript Server. Test Change');
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

