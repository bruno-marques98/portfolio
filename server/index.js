import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.js";

// mongo123
// mongodb+srv://admin:<password>@cluster0.zbwwa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const app = express();

app.use(morgan("dev"));
app.use(express.json( {limit: '30mb', extendend: true} ));
app.use(express.urlencoded( {limit: '30mb', extendend: true} ));
app.use(cors());

app.use("/users", userRouter); // http://localhost:5000/users/signup

const MONGODB_URL = "mongodb+srv://admin:mongo123@cluster0.zbwwa.mongodb.net/portfolio_db?retryWrites=true&w=majority";

const port = 5000;

mongoose.connect(MONGODB_URL)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    })
    .catch(err => console.log(err + " did not connect"));