import { Image } from "../models/Image";

export const randomImages = async (req, res, next) => {
  const images = await Image.aggregate([{ $sample: { size: 4 }}]);
  let imageList = [];
  images.map(image => imageList.push(image.src));
  return res.status(200).send(imageList);
}