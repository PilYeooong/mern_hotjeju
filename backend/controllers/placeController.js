import { Place } from "../models/Place";
import { validationResult } from "express-validator";

export const addPlace = async (req, res, next) => {
  const {
    body: { name, description, address },
    file: { path },
  } = req;
  const place = await new Place({
    name,
    image: path,
    description,
    address,
    creator: req.user._id,
  });
  req.user.places.push(place.id);
  req.user.save();
  place.save((err, placeInfo) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      placeInfo,
    });
  });
};

export const allPlaces = async (req, res) => {
  try {
    const places = await Place.find({}).sort({ _id: -1 }); // 최신순 배치
    return res.json({ places });
  } catch (error) {
    return res.json({ success: false, error });
  }
};

export const placeDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const place = await Place.findById(id).populate("creator", "name"); // creator의 name만 리턴
    res.status(200).json({ success: true, place });
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ success: false, message: "유효하지 않은 접근입니다.", error });
  }
};

export const editPlace = async (req, res) => {
  const {
    params: { id },
    body: { name, description, address },
  } = req;
  try {
    const place = await Place.findById(id);
    if (String(req.user._id) !== String(place.creator)) {
      return res
        .status(401)
        .json({ success: false, message: "권한이 없습니다." });
    }
    const editedPlace = await Place.updateOne({ name, description, address });
    return res.status(200).json({ success: true, place: editedPlace });
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false, error });
  }
};

export const deletePlace = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const place = await Place.findById(id);
    if (String(req.user._id) !== String(place.creator)) {
      return res
        .status(401)
        .json({ success: false, message: "권한이 없습니다. " });
    } else {
      await Place.findOneAndRemove({ _id: id });
      req.user.places.pull(place);
      req.user.save();
      return res.status(200).json({ success: true, message: "삭제 완료 " });
    }
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "유효한 주소가 아닙니다." });
  }
};
