import { Place } from "../models/Place";
import { Comment } from "../models/Comment";

export const getComments = (req, res) => {
  const {
    params: { id },
    query: { offset }
  } = req;
  console.log(offset);
  try {
    Comment.find({ placeId: id }).skip(parseInt(offset, 10)).limit(3).populate("creator", "nickname").exec((err, comments) => {
      if(err){
        return res.status(400).json({ success: false, err });
      }
      return res.status(200).send(comments);
    })
  } catch(error){
    return res.status(400).json({ success: false, error });
  }
};

export const newComment = (req, res) => {
  const comment = new Comment(req.body);
  comment.save((err, comment) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).send(comment);
  });
};
