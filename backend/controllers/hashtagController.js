import { Hashtag } from "../models/Hashtag";

export const searchHashtag = async (req, res, next) => {
  const {
    params: { tag },
  } = req;
  try {
    const hashtag = await Hashtag.find({ name: tag }).populate("places", "name images likers likersLength");
    if (!hashtag) {
      return res.status(400).send("해시태그를 포함하는 장소가 없습니다.");
    }
    return res.status(200).send(hashtag);
  } catch(e){
    console.error(e);
  }

};
