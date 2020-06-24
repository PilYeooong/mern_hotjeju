import { User } from "../models/User";

export const signUp = async (req, res) => {
  await User.findOne({ email: req.body.email }).exec((err, userExist) => {
    if (err) {
      return res.status(400).json({ err });
    } else if (userExist) {
      return res
        .status(409)
        .json({ success: false, message: "이미 사용중인 이메일입니다." });
    } else {
      const user = new User(req.body);
      user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
          success: true,
          userInfo,
        });
      });
    }
  });
};

export const login = async (req, res) => {
  await User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 일치하지 않습니다. ",
        });
      }
      user.generateToken((err, user) => {
        if (err) {
          return res.status(400).send(err);
        }
        console.log(user);
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id, user });
      });
    });
  });
};

export const logOut = (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) {
      return res.json({ success: false, err });
    }
    res.cookie("x_auth", "");
    return res.status(200).json({
      logoutSuccess: true,
      isAuth: false,
    });
  });
};

export const authenticate = (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
  });
};

export const loadUser = async (req, res, next) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id)
      .select("places wishList email nickname")
      .populate("places", "name images likers")
      .populate("wishList", "name images likers");
    if (!user) {
      res.status(400).json({ message: "존재하지 않는 사용자입니다. " });
    }
    res.status(200).send(user);
  } catch (e) {
    console.error(e);
    return res.status(400).send("잘못된 요청입니다.");
  }
};

export const editNickName = async (req, res, next) => {
  const {
    params: { id },
    body: { nickname },
  } = req;
  try {
    const user = await User.findByIdAndUpdate(id, { nickname });
    if(!user) {
      res.status(400).send("잘못된 접근입니다.")
    }
    user.save();
    // user send 할 경우 이전 유저 데이터가 response 됨
    res.status(200).send(req.body.nickname);
  } catch(e){
    console.error(e);
    return res.status(400).send("잘못된 요청입니다.");
  }
}