import { User } from "../Models/user.model.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const generateAccessRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave: false});

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error("Token generation failed");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  // Fetching the created user without sensitive information
  // such as password and refreshToken
  const createdUser = await User.findById(user._id).select("-password -refreshToken");



  if (!createdUser) {
    return res.status(500).json(
        {
           message: "User registration failed",
        }
    );
  }

  // Generating access and refresh tokens
  return res.status(201).json(
    new ApiResponse(
      200,
      createdUser,
      "User registered successfully"
    )
  );
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid password",
    });
  }

  const { accessToken, refreshToken } = await generateAccessRefreshToken(
    user._id
  );

  const loggedInUser = await User.findOne(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: false,
  };


  res
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .status(200)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken
        },
        "User logged in successfully"
      )
    );

    return;
});

const logoutUser = asyncHandler(async (req, res) => {
  // Clear the refresh token from the user document
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1
      },
    },
    {
      new: true,
    }
  );

  // Options for clearing cookies
  // Note: In production, set secure to true if using HTTPS
  const options = {
    httpOnly: true,
    secure: true,
  };

  // Clearing cookies
  res.clearCookie("refreshToken", options)
  res.clearCookie("accessToken", options)
  
  return res
  .status(200)
  .json({
    status: 200,
    message: "User logged out successfully",
  })

});

const refreshAccessToken = asyncHandler(async (req,res) => {
    
    const getRefreshToken = req.cookies.refreshToken;

    // If no refresh token is found, return an error
    if(!getRefreshToken){
    
        res
        .status(404)
        .json({
            "message" : "no refresh token generated"
        });

        return ;
    }

    try {
        //getting user id (stored when signed)
        const decodeToken = jwt.verify(
            getRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodeToken?._id)

        if(!user){
            res.status(401).json({
                "message" : "Invalid refresh token"
            })

            return;
        }

        //comparing with the stored refreshToken in DB
        if(getRefreshToken !== user.refreshToken){
            res.status(401).json({
                "message" : "Refresh token is expired or used" 
            })
            return;
        }

        const options = {
          httpOnly: true,
          secure: false, 
        }

        const {accessToken, newRefreshToken} = await generateAccessRefreshToken(user._id)


        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
          new ApiResponse(
            200,
            {
              accessToken, refreshToken : newRefreshToken
            },
            "Access token refreshed successfully"
          )
        )

    } catch (error) {
        res.status(500).json({
            "message" : "Internal server error",
            "error" : error.message
        });
    }

})

const getCurrentUser = asyncHandler(async (req,res) => {
  // If the user is not authenticated, return an error
    return res
    .status(200)
    .json(
        new ApiResponse(
          200,
          req.user,
          "Current user retrieved successfully"
        )
    );
})

export { registerUser, loginUser, logoutUser, generateAccessRefreshToken, refreshAccessToken, getCurrentUser };
