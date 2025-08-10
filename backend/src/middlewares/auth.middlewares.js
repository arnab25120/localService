import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    // Check for token in cookies or Authorization header
    const token = req.cookies?.token || 
                  req.cookies?.accessToken || 
                  req.header("Authorization")?.replace("Bearer ", "").trim();

    if (!token) {
      throw new ApiError(401, "Unauthorized access");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Access Token");
  }
});

// Middleware to verify if user is a provider
export const verifyProvider = asyncHandler(async (req, res, next) => {
  if (req.user?.role !== "provider") {
    throw new ApiError(403, "Access denied. Providers only.");
  }
  next();
});

// Middleware to verify if user is a consumer
export const verifyConsumer = asyncHandler(async (req, res, next) => {
  if (req.user?.role !== "consumer") {
    throw new ApiError(403, "Access denied. Consumers only.");
  }
  next();
});