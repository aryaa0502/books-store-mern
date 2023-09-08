import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
//mongoose is a popular object data modelling library. It allows us to interact with mongodb easily with javaScript commands. Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node. js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS policy
//option 1: Allow All origins with default of cors(*)
app.use(cors());
//option 2: Allow custom origins
// app.use(cors({
//     origin: 'http://localhost:3000',
//     method: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
// }));


app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to my first MERN stack project");
});

app.use('/books', booksRoute);

//I want my express server to run only if my database connection is successful.
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
