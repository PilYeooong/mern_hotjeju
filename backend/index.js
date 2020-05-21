import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import "./db";
import routes from "./routes";
import userRouter from "./routers/userRouter";

import { isAuthenticated } from "./middlewares/isAuthenticated";

dotenv.config();

const app = express()
const port = 5000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use(routes.users, userRouter);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))