import { Like } from "../models/Like";
import { Place } from "../models/Place";

export const getLikes = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const place = await Place.findById(id);
    if (!place) {
      return res.status(400).send("존재하지 않는 페이지입니다.");
    }
    if (place.likers.includes(req.user._id)) {
      return res.status(200).send(true);
    }
    return res.status(200).send(false);
  } catch (e) {
    console.error(e);
  }
};

export const toggleLike = async (req, res) => {
  const {
    params: { id },
    body: { isLiked },
  } = req;
  if (isLiked) {
    Like.findOneAndDelete({ placeId: id, userId: req.user._id }).exec(
      async (err, result) => {
        if (err) {
          return res.status(400).json({ success: false, err });
        }
        await Place.findByIdAndUpdate(id, {
          $pull: { likers: req.user._id },
          $inc: { likersLength: -1 },
        });
        return res.status(200).json({ likeResult: false });
      }
    );
  } else {
    const like = new Like({ placeId: id, userId: req.user._id });
    like.save(async (err, like) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }
      await Place.findByIdAndUpdate(id, {
        $push: { likers: req.user._id },
        $inc: { likersLength: 1 },
      });
      return res.status(200).json({ likeResult: true });
    });
  }
};
