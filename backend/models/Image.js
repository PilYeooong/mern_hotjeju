import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  src: {
    type: String,
    required: true,
  },
  placeId: {
    type: String,
  },
});

export const Image = mongoose.model("Image", imageSchema);
