import { Place } from "../models/Place";
import { Comment } from "../models/Comment";

export const getComments = (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    Comment.find({ placeId: id }).exec((err, comments) => {
      if(err){
        return res.status(400).json({ success: false, err });
      }
      return res.status(200).json({ success: true, comments });
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
    return res.status(200).json({ success: true, comment });
  });
};
