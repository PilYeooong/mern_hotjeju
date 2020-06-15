import { Place } from "../models/Place";
import { Category } from "../models/Category";
import { Image } from "../models/Image";

export const addPlace = async (req, res, next) => {
  const {
    body: { category, name, description, address },
    files
  } = req;
  const placeCategory = await Category.findOne({ name: category })
  if(!placeCategory){
    return res.status(400).json({ success: false, message: "존재하지 않는 카테고리입니다. "})
  }
  const place = await new Place({
    category: placeCategory._id,
    name,
    description,
    address,
    creator: req.user._id,
  });
  req.user.places.push(place.id);
  req.user.save();
  files.map(async (file) => {
    place.images.push(file.path);
    await new Image({ src: file.path }).save();
  });
  place.save((err, placeInfo) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      placeInfo,
    });
  });
  placeCategory.places.push(place.id);
  placeCategory.save();
};

export const allPlaces = async (req, res) => {
  try {
    // const places = await Place.find({}, { name: true, images: true }).sort({ _id: -1 }); // 최신순 배치
    const places = await Place.find({}).select("name images").sort({ _id: -1 }); // 최신순 배치
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
    let isLiked = false;
    const place = await Place.findById(id).populate("creator", "name"); // creator의 name만 리턴
    if(!place){
      return res.status(404).send("존재하지 않는 페이지 입니다.")
    }
    if(req.user && place.likers.includes(req.user._id)){
      isLiked = true;
    }
    res.status(200).json({ place, isLiked });
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
    const category = await Category.findById(place.category);
    if (String(req.user._id) !== String(place.creator)) {
      return res
        .status(401)
        .json({ success: false, message: "권한이 없습니다. " });
    } else {
      await Place.findOneAndRemove({ _id: id });
      category.places.pull(place);
      category.save();
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

export const categorizedPlace = async (req, res, next) => {
  const {
    params: { category },
  } = req;
  try {
    const categorized = await Category.findOne({ name: category }).populate('places', "name images")
    const places = categorized.places;
    return res.status(200).json({ places });
  } catch(e){
    console.error(e);
    return res.status(404).json({ success: false, e });
  }
}