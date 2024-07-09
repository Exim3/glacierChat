import userModel from "../models/user.model.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ error: "Password and Confirm Password do not match" });
    }
    const user = await userModel.findOne({ username });
    if (user) {
      return res.status(400).json({
        error: "username is already exits",
      });
    }

    //HASHED PASSWORD HERE

    //https://avatar.iran.liara.run/

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlPrifilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new userModel({
      fullName,
      username,
      password,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlPrifilePic,
    });
  } catch (error) {
    console.log(error);
  }
  console.log("signup route");
};
export const login = (req, res) => {
  console.log("login route");
};
export const logout = (req, res) => {
  console.log("logout route");
};
