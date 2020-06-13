// name, description, address, image, --- creator, comments, Likes
import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  },
  name: {
    type: String,
    maxlength: 50,
    required: true
  },
  description: {
    type: String,
    maxlength: 100,
    required: true
  },
  images: [{
    type: String,
  }],
  address: {
    type: String,
    maxlength: 50,
  },
  likers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref: "User"
  }
})

export const Place = mongoose.model("Place", placeSchema);