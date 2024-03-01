const User = require('../model/user')
const uuidValidate = require("uuid-validate");
const { createJWT } = require("../config/jwt");
const bcrypt = require("bcryptjs");
const { createRefreshJWT } = require("../config/refreshjwt");
const { StatusCodes } = require("http-status-codes");
const asyncHandler = require("express-async-handler");
const { comparePasswords } = require('../config/comparePassword')
const {
  ConflictError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
} = require("../error");

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log("Hashed Password:", hashedPassword);
}

const createUser = async (req, res) => {
  const { email } = req.body;
  const userAlreadyExists = await User.findOne({ where: { email } });
  if (!userAlreadyExists) {
    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json(user);
  } else {
    return res.status(StatusCodes.CONFLICT).json("Email already exists");
  }
};



const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: { email: email },
  });

  if (user && (await comparePasswords(password, user.password))) {
    const refreshToken = await createRefreshJWT(user.id);
    await User.update(
      { refreshToken: refreshToken },
      { where: { id: user.id } }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.status(StatusCodes.OK).json({
      _id: user.id,
      name: user.firstname + " " + user.lastname,
      email: user.email,
      mobile: user.mobile,
      token: createJWT(user.id, user.firstname + " " + user.lastname),
    });
  } else {
    throw new UnauthenticatedError("Invalid credentials");
  }
});

const profile = asyncHandler(async (req, res) => {
  const { id } = req.user; // Assuming the user ID is in req.user.id
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["dob", "password"] },
    });

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "User not found" });
    }

    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    console.error("Error retrieving user:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
});

const logout = asyncHandler(async(req, res) => {
  const cookie = req.cookies;
  if (!cookie || !cookie.refreshToken) {
    // If req.cookies is undefined or refreshToken is not present
    throw new UnauthenticatedError("No refreshToken Found");
  }
  if (!cookie.refreshToken)
    throw new UnauthenticatedError("No refreshToken Found");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({
    where: { refreshToken },
  });

  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204);
  }
  if (user) {
    await user.update({ refreshToken: "" });
  }
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  return res.sendStatus(204);
})

const updatePassword = asyncHandler(async(req, res) => {
  const {id} = req.user;
  const { password } = req.body;
  if (!password) {
    throw new BadRequestError("Fill in your password"); // Check if the password was provided
  }
  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).json({ status: "Error", message: "User not found" }); // User not found in the database
  }
  
  user.password = hashPassword(password);
  
  await user.save(); 
  res
    .status(StatusCodes.OK)
    .json({ status: "Success", message: "Your password has been updated" });

})


module.exports = {
    createUser,
    login,
    profile,
    updatePassword,
    logout,
    updatePassword
}