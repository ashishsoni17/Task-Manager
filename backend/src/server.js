import express from 'express';
import DBConnection from '../DB/db.js'
import dotenv from 'dotenv'
import cors from 'cors';
import cookieParser from 'cookie-parser';


dotenv.config({
    path: './.env'
})

const app = express();

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true   
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());

import userRouter from '../Routes/auth.route.js';
import taskRouter from '../Routes/task.route.js';

//mongoDB connection
DBConnection()
.then( () => {
    app.listen(process.env.PORT || 3000, () => {
    console.log("App is listening on port 3000");
    })
})
.catch( (error) => {
    console.error("Error while Connecting to MongoDB")
})


app.use('/', userRouter);
app.use('/', taskRouter);