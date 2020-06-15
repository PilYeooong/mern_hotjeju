import { Image } from "../models/Image";

export const randomImages = async (req, res, next) => {
  const images = await Image.find({});
  let imageList = [];
  images.map(image => imageList.push(image.src));
  return res.status(200).send(imageList);
}