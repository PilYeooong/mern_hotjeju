import { Comment } from "../models/Comment";

export const getComments = (req, res) => {
  const {
    params: { id },
    query: { offset },
  } = req;
  try {
    Comment.find({ placeId: id })
      .skip(parseInt(offset, 10))
      .limit(5)
      .populate("creator", "nickname")
      .sort({ _id: -1 })
      .exec((err, comments) => {
        if (err) {
          return res.status(400).send(err);
        }
        return res.status(200).send(comments);
      });
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

export const newComment = async (req, res) => {
  const {
    params: { id },
    body: { text },
  } = req;
  const comment = await new Comment({
    creator: req.user._id,
    placeId: id,
    text,
  });
  comment.save(async (err, comment) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    comment = await comment.populate("creator", "nickname").execPopulate();
    return res.status(201).send(comment);
  });
};
