import { Like } from "../models/Like";
import { Place } from "../models/Place";

export const toggleLike = async (req, res) => {
  const {
    params: { id },
    body: { isLiked },
  } = req;
  const isExistingPlace = await Place.findById(id);
  if (!isExistingPlace) {
    return res.status(404).send("존재하지 않는 핫플입니다.");
  }
  if (isLiked) {
    Like.findOneAndDelete({ placeId: id, userId: req.user._id }).exec(
      async (err, result) => {
        if (err) {
          return res.status(400).send("잘못된 요청입니다.");
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
        return res.status(400).send("잘못된 요청입니다.");
      }
      await Place.findByIdAndUpdate(id, {
        $push: { likers: req.user._id },
        $inc: { likersLength: 1 },
      });
      return res.status(200).json({ likeResult: true });
    });
  }
};
