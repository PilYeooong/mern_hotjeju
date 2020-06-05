import express from "express";
import { Category } from "../models/Category";

const categoryRouter = express.Router();

categoryRouter.post('/new', async (req, res, next) => {
  const category = await new Category ({
    name: req.body.name
  })
  category.save();
  return res.status(200).json({ success: true, category: category.name })
})

export default categoryRouter;