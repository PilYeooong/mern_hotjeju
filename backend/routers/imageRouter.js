import express from "express";
import routes from "../routes";

import { randomImages } from "../controllers/imageController";

const imageRouter = express.Router();

imageRouter.get(routes.home, randomImages);

export default imageRouter;