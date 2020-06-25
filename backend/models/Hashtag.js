import mongoose from "mongoose";

const hashtagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  places: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Place",
  }]
})

export const Hashtag = mongoose.model("Hashtag", hashtagSchema);