import express from "express";
import routes from "../routes";
import { isAuthenticated, checkAuth } from "../middlewares/isAuthenticated";
import { uploadPlace, updatePlace, uploadS3 } from "../middlewares/upload";
import {
  addPlace,
  allPlaces,
  placeDetail,
  editPlace,
  deletePlace,
  categorizedPlace,
  toggleWish,
} from "../controllers/placeController";
import { newComment, getComments } from "../controllers/commentController";
import { toggleLike } from "../controllers/likeController";

const placeRouter = express.Router();

placeRouter.get(routes.home, allPlaces);
placeRouter.get(routes.placeDetail(), checkAuth, placeDetail);
placeRouter.post(routes.addPlace, isAuthenticated, uploadPlace, addPlace);
// placeRouter.post(routes.addPlace, isAuthenticated, uploadS3.array("images"), addPlace);
placeRouter.post(routes.editPlace(), isAuthenticated, updatePlace, editPlace);
placeRouter.post(routes.deletePlace(), isAuthenticated, deletePlace);

// Category
placeRouter.post(routes.categorizedPlace, categorizedPlace);

// Comment
placeRouter.post(routes.newComment(), isAuthenticated, newComment);
placeRouter.get(routes.commentList(), getComments);

// Like
placeRouter.post(routes.toggleLike(), isAuthenticated, toggleLike);

//Wish
placeRouter.post(routes.toggleWish(), isAuthenticated, toggleWish);

export default placeRouter;
