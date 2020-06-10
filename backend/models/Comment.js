// name, description, address, image, --- creator, comments, Likes
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref: "User"
  },
  placeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Place"
  },
  text: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
})

export const Comment = mongoose.model("Comment", commentSchema);