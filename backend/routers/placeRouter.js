import express from "express";
import routes from "../routes";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { uploadPlace } from "../middlewares/uploadPlace";
import { addPlace, allPlaces, placeDetail, editPlace, deletePlace } from "../controllers/placeController";


const placeRouter = express.Router();

placeRouter.get(routes.home, allPlaces)
placeRouter.get(routes.placeDetail(), placeDetail);
placeRouter.post(routes.addPlace, isAuthenticated, uploadPlace, addPlace);
placeRouter.post(routes.editPlace(), isAuthenticated, editPlace);
placeRouter.post(routes.deletePlace(), isAuthenticated, deletePlace);


export default placeRouter;