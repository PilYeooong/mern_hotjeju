import { Image } from "../models/Image";

export const randomImages = async (req, res, next) => {
  try {
    const images = await Image.aggregate([{ $sample: { size: 4 } }]);
    return res.status(200).send(images);
  } catch (e) {
    console.error(e);
    return res.status(500).send(e);
  }
};

export const addImages = async (req, res, next) => {
  return res.status(200).json(req.files.map((v) => v.path));
};
