import mongoose from "mongoose";
const cartSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      default: false,
      unique: true,
      isRequired: true,
    },
    products: {
      type: Array,
      default: [],
      isRequired: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model.cart || mongoose.model("cart", cartSchema);
