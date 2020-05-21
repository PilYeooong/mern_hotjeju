import express from "express";
import routes from "../routes";

const globalRouter = express.Router();

globalRouter.get(routes.home, (req, res) => {
  res.send("This is home Page");
})

export default globalRouter;