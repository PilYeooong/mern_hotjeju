import { Place } from "../models/Place";

export const searchPlace = async (req, res, next) => {
  const {
    params: { place },
  } = req;
  try { 
    const result = await Place.find({ name : { $regex : decodeURIComponent(place) }})
    return res.status(200).send(result);
  } catch(e) {
    console.error(e);
  }
};
