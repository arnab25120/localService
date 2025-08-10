import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Service title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Service description is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Plumber",
        "Electrician",
        "Mechanic",
        "Tutor",
        "Babysitter",
        "Cleaning",
        "Carpenter",
        "Other",
      ],
    },
    location: {
      type: String,
      required: [true, "Service location is required"],
    },
    price: {
      type: Number,
      required: [true, "Service price is required"],
      min: [0, "Price must be a positive number"],
    },
    imageUrl: {
      type: String,
      default: "",
    },
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Provider contact information (stored with service for easier access)
    providerContact: {
      name: {
        type: String,
        required: [true, "Provider name is required"],
        trim: true,
      },
      email: {
        type: String,
        required: [true, "Provider email is required"],
        lowercase: true,
      },
      contactNumber: {
        type: String,
        required: [true, "Provider contact number is required"],
        trim: true,
      },
    },
    isApproved: {
      type: Boolean,
      default: false, // Admin must approve by default
    },
    isActive: {
      type: Boolean,
      default: true, // For soft delete
    },
  },
  { timestamps: true }
);

// Index for better query performance
serviceSchema.index({ category: 1, location: 1, isApproved: 1, isActive: 1 });
serviceSchema.index({ provider: 1 });

export const Service = mongoose.model("Service", serviceSchema);