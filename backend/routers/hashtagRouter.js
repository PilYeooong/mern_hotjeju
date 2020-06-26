import express from "express";
import routes from "../routes";
import { searchHashtag } from "../controllers/hashtagController";

const hashtagRouter = express.Router();

hashtagRouter.get(routes.searchHashtag(), searchHashtag);

export default hashtagRouter;