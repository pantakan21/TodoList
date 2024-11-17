import express from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import todosRoute from "./routes/todosRoute.js";
import cors from "cors";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// app.use(cors());
app.use(cors(
    {
        origin: ["htt"]
    }
))

app.get("/", (request, response) => {
    console.log(request);
    return response.status(200).send("Welcome to my website");
});

app.use("/todos", todosRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("Connected to database");
        app.listen(PORT, () => {
            console.log(`App is listening to port : ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });

