import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  fullName: String,
  orders: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order"}]
  },
  phone: String,
  shippingAddress: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

const Customer = mongoose.models.Customer || mongoose.model("Customer", customerSchema);

export default Customer;