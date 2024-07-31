import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/user.model.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
  //get user details from frontend
  //validation of user to check if there any field is not empty
  //to check if the user is exist or not exists
  //check avatar exists or not exists
  //now upload cloudinary
  //create user object - create entry in db
  //remove password and refresh token
  //check user creation
  //return response
  const { fullName, email, username, password } = req.body;
  if (
    [fullName, email, username, password].some((item) => item?.trim() === "")
  ) {
    throw new ApiError(400, "Input all fileds : ");
  }
  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });
  console.log(existedUser);
  if(!existedUser){
    throw new ApiError(409,"User with email or username already exists")
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if(!avatarLocalPath) {
    throw new ApiError(400,"Avatar file is required");
  }
  const avatar = await uploadCloudinary(avatarLocalPath);
  const coverImage = await uploadCloudinary(coverImageLocalPath);


  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage : coverImage?.url || "",
    email,
    password,
    username:username.toLowerCase()
  })
  const createdUser= await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if(!createdUser){
    throw new ApiError(500,"Something went wrong while regestering the user");
  }

  return res.status(201).json(
    new ApiResponse(200,createdUser,"User registered Successfully")
  );
});

export { registerUser };
