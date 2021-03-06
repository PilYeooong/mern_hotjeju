import express from "express";
import routes from "../routes";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import {
  signUp,
  login,
  authenticate,
  logOut,
  loadUser,
  editNickName,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.post(routes.signUp, signUp);
userRouter.post(routes.login, login);
userRouter.get(routes.logout, isAuthenticated, logOut);
userRouter.get(routes.authenticate, isAuthenticated, authenticate);
userRouter.get(routes.loadUser(), isAuthenticated, loadUser);
userRouter.patch(routes.editNickName(), isAuthenticated, editNickName);

export default userRouter;
