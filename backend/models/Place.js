// name, description, address, image, --- creator, comments, Likes
import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
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
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref: "User"
  }
})

export const Place = mongoose.model("Place", placeSchema);