import { Like } from "../models/Like";

export const getLikes = (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    Like.find({ placeId: id }).exec((err, likes) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }
      return res.status(200).json({ success: true, likes });
    });
  } catch(err) {
    return res.status(400).json({ success: false, err });
  }
};

export const toggleLike = (req, res) => {
  const {
    params: { id },
    body: { isLiked },
  } = req;
  if (isLiked) {
    Like.findOneAndDelete({ placeId: id, userId: req.user._id }).exec(
      (err, result) => {
        if (err) {
          return res.status(400).json({ success: false, err });
        }
        return res.status(200).json({ success: true });
      }
    );
  } else {
    const like = new Like({ placeId: id, userId: req.user._id });
    like.save((err, like) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }
      return res.status(200).json({ success: true, like });
    });
  }
};
