import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    default: false,
    unique: true,
    isRequired: true,
  },
  firstname: {
    type: String,
    default: false,
    isRequired: true,
  },
  lastName: {
    type: String,
    default: "",
    isRequired: false,
  },
  avatar: {
    type: String,
    default: "",
    isRequired: false,
  },
  email: {
    type: String,
    default: false,
    isRequired: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
    isRequired: false,
  },
  updatedAt: {
    type: Date,
    default: new Date(),
    isRequired: false,
  },
});

export default mongoose.models.users || mongoose.model("users", userSchema);
