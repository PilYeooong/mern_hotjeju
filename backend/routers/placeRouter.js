import express from "express";
import routes from "../routes";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { uploadPlace } from "../middlewares/uploadPlace";
import {
  addPlace,
  allPlaces,
  placeDetail,
  editPlace,
  deletePlace,
  categorizedPlace,
} from "../controllers/placeController";
import {
  newComment, getComments
} from "../controllers/commentController";
import { toggleLike, getLikes } from "../controllers/likeController";
const placeRouter = express.Router();

placeRouter.get(routes.home, allPlaces);
placeRouter.get(routes.placeDetail(), placeDetail);
placeRouter.post(routes.addPlace, isAuthenticated, uploadPlace, addPlace);
placeRouter.post(routes.editPlace(), isAuthenticated, editPlace);
placeRouter.post(routes.deletePlace(), isAuthenticated, deletePlace);

// Category
placeRouter.post(routes.categorizedPlace, categorizedPlace);

// Comment
placeRouter.post(routes.newComment(), isAuthenticated, newComment);
placeRouter.get(routes.commentList(), isAuthenticated, getComments);

// Like
placeRouter.post(routes.likes(), isAuthenticated, getLikes);
placeRouter.post(routes.toggleLike(), isAuthenticated, toggleLike);

export default placeRouter;
