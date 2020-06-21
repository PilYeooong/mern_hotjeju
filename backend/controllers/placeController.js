import { Place } from "../models/Place";
import { Category } from "../models/Category";
import { Image } from "../models/Image";
import { User } from "../models/User";

export const addPlace = async (req, res, next) => {
  const {
    body: { category, name, description, address },
    files,
  } = req;
  const placeCategory = await Category.findOne({ name: category });
  if (!placeCategory) {
    return res
      .status(400)
      .json({ success: false, message: "존재하지 않는 카테고리입니다. " });
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
    await new Image({ src: file.path, placeId: place.id }).save();
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
  let term = req.body.term;

  try {
    if (term) {
      const places = await Place.find({})
        .select("name images likers likersLength")
        .sort({ likersLength: -1 });
      return res.json({ places });
    } else {
      const places = await Place.find({})
        .select("name images likers")
        .sort({ _id: -1 }); // 최신순 배치
      return res.json({ places });
    }
  } catch (error) {
    console.error(error);
    return res.json({ success: false, error });
  }
};

export const placeDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    let isLiked = false;
    let isWished = false;
    const place = await Place.findById(id)
      .populate("creator", "name")
      .populate("category", "name"); // creator의 name만 리턴
    if (!place) {
      return res.status(404).send("존재하지 않는 페이지 입니다.");
    }
    if (req.user && place.likers.includes(req.user._id)) {
      isLiked = true;
    }
    if (req.user && req.user.wishList.includes(place._id)) {
      isWished = true;
    }
    res.status(200).json({ place, isLiked, isWished });
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
    body: { category, name, description, address, images },
  } = req;
  try {
    const place = await Place.findByIdAndUpdate(id, {
      name,
      description,
      address,
      images,
    });
    const prevCategory = await Category.findById(place.category);
    const editCategory = await Category.findOne({ name: category });
    if (place.category !== editCategory) {
      place.category = editCategory;
      editCategory.places.push(place._id);
      editCategory.save();
      prevCategory.places.pull(place._id);
      prevCategory.save();
      place.save();
    }
    return res.status(200).send(place);
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error });
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
      return res.status(200).send(place);
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
    const categorized = await Category.findOne({ name: category }).populate(
      "places",
      "name images likers likersLength"
    );
    const places = categorized.places;
    return res.status(200).json({ places });
  } catch (e) {
    console.error(e);
    return res.status(404).json({ success: false, e });
  }
};

export const toggleWish = async (req, res, next) => {
  const {
    params: { placeId },
    body: { isWished },
  } = req;
  try {
    const user = await User.findById(req.user._id);
    if (isWished) {
      user.wishList.remove(placeId);
      user.save();
      return res.status(200).json({ wishResult: false, placeId });
    } else {
      user.wishList.push(placeId);
      user.save();
      return res.status(200).json({ wishResult: true });
    }
  } catch (e) {
    console.error(e);
    return res.status(400).send(e);
  }
};
