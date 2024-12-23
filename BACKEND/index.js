import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

//middleware for handling CORS policy
// Allow All origins (if needed for development)
app.use(cors());

//middleware for parsing body
app.use(express.json());

// Define routes after CORS middleware
app.use('/books', booksRoute);

app.get('/', (req, res) => {
    return res.status(234).send("Welcome");
});

mongoose.connect(mongoDBURL)
    .then(() => {
        console.log("App connected to database");
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
