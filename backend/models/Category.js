// name, description, address, image, --- creator, comments, Likes
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: "name is required"
  },
  places:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Place",
    default: []
  }]
})

export const Category = mongoose.model("Category", categorySchema);