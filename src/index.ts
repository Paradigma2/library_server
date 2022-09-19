import express from 'express';
import 'reflect-metadata';
import indexRoutes from './routes/index';
import cors from 'cors';
import { createConnection } from 'typeorm';
import { ormConfig } from './ormconfig'

createConnection(ormConfig).then(async (connection) => {
    const app = express();

    // middleware
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended: false}))
    app.use(express.static('public'));

    app.use(indexRoutes);
    app.listen(3000);
    console.log('Server started on port ', 3000);
}).catch((error) => console.log(error));
