import express from "express";
import routes from "../routes";

import { uploadPlace } from "../middlewares/upload";
import { randomImages, addImages } from "../controllers/imageController";

const imageRouter = express.Router();

imageRouter.get(routes.home, randomImages);
imageRouter.post(routes.home, uploadPlace, addImages);

export default imageRouter;
