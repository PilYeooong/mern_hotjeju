import { Image } from "../models/Image";

export const randomImages = async (req, res, next) => {
  const images = await Image.aggregate([{ $sample: { size: 4 }}]);
  return res.status(200).send(images);
}