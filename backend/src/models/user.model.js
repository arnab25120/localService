import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      lowercase: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // do not return password by default
    },
    role: {
      type: String,
      enum: ["consumer", "provider"],
      default: "consumer",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    location: {
      type: String,
      default: "",
    },
    contactNumber: {
      type: String,
      required: function() {
        return this.role === "provider";
      },
      validate: {
        validator: function(v) {
          // Only validate if role is provider and contactNumber is provided
          if (this.role === "provider" && v) {
            return /^[\d\s\-\+\(\)]+$/.test(v) && v.replace(/\D/g, '').length >= 10;
          }
          return true;
        },
        message: "Contact number must be valid and at least 10 digits for providers"
      }
    },
    // Additional provider-specific fields
    profileImage: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
      maxlength: [500, "Bio cannot exceed 500 characters"],
    },
    // Services provided by this user (if provider)
    services: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    }],
    isActive: {
      type: Boolean,
      default: true,
    },
    refreshToken: {
      type: String,
    },
    // Email verification
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// Indexes for better performance
userSchema.index({ role: 1, isActive: 1 });
userSchema.index({ location: 1 });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Custom methods
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// For backward compatibility with existing Auth controller
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
      role: this.role,
      isAdmin: this.isAdmin,
    },
    process.env.ACCESS_TOKEN_SECRET || "your-secret-key",
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1d",
    }
  );
};

// Access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
      role: this.role,
      isAdmin: this.isAdmin,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

// Refresh token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);