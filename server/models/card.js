const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  cardNumber: { type: String, required: true, unique: true },
  expiryDate: { type: String, required: true },
  cvv: { type: String, required: true },
});

module.exports = mongoose.model("Card", CardSchema);
