import express, { json } from 'express';
import compression from 'compression';
import cors from 'cors';
// import Database from './mongodb/database';
import cookieParser from 'cookie-parser';
// import userRouter from './routes/userRouter'
import dotenv from "dotenv";
dotenv.config();

const app = express();
// Database.connectToDatabase();
app.use(compression());
app.use(cookieParser());
app.use(json());
// server.applyMiddleware({ app, path: '/graphql' });
const port = process.env.PORT;
const corsOptions = {
  origin: process.env.ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  // allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
  credentials: true,
}

app.use(cors(corsOptions));


app.get('/api', (req, res, next) => {
    res.send('Works')
});

app.listen({port},() =>  console.log(`🚀 Server ready at http://localhost:${port}/`))

