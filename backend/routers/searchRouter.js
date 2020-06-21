import express from "express";
import routes from "../routes";

import { searchPlace } from "../controllers/searchController";

const searchRouter = express.Router();

searchRouter.get(routes.searchPlace(), searchPlace);

export default searchRouter;
