import express from "express";
import dotenv from 'dotenv';
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import Restaurant from './models/restaurantModel.js';
import restaurantRoute from './routes/restaurantsRoute.js';
import userRoute from './routes/userRoute.js';
import authRoute from  './routes/authRoute.js';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
app.use(express.json()); //alow json as the input of our backend
app.use(cookieParser());
//Middleware for handling CORS POLICY
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true, // Allow credentials (cookies)
  }));//to recieve data from different URLS
app.use(helmet());

// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET','PUT','POST','DELETE'],
//         allowHeaders: ['Content-Type'],
//     })
// );

app.get('/', (request,response)=>{
    console.log(request);
    return response.status(234).send('welcome');
});

app.use('/restaurant', restaurantRoute);
app.use('/user', userRoute);
app.use('/auth', authRoute);

mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log('App connected to database');
        app.listen(PORT, ()=> {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error)=>{
        console.log(error);
    });